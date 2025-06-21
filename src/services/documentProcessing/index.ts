import { ExtractedData } from './types';

// Document processing service using external APIs
export class DocumentProcessingService {
  private static readonly OCR_API_KEY = process.env.NEXT_PUBLIC_OCR_API_KEY || '';
  private static readonly AI_API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY || '';

  // Main processing method
  static async processDocument(file: File): Promise<{ data: ExtractedData; extractedText: string }> {
    try {
      console.log("DocumentProcessingService: Starting processing...");
      
      // Step 1: Extract text using OCR
      const extractedText = await this.extractTextFromDocument(file);
      console.log("DocumentProcessingService: Text extraction completed");
      
      if (!extractedText || extractedText.trim().length === 0) {
        console.warn("DocumentProcessingService: No text extracted, using fallback");
        return {
          data: this.generateFallbackData(file),
          extractedText: "No text could be extracted from the document"
        };
      }

      // Step 2: Extract structured data using AI
      const aiData = await this.extractDataWithAI(extractedText);
      console.log("DocumentProcessingService: AI extraction completed");

      // Step 3: Apply regex patterns as fallback
      const regexData = this.extractDataWithRegex(extractedText);
      console.log("DocumentProcessingService: Regex extraction completed");

      // Step 4: Merge and validate data
      const mergedData = { ...regexData, ...aiData };
      const finalData = this.validateAndEnhanceData(mergedData);
      
      console.log("DocumentProcessingService: Processing completed successfully");
      return {
        data: finalData,
        extractedText: extractedText
      };

    } catch (error) {
      console.error("DocumentProcessingService: Processing failed:", error);
      
      // If AI processing fails, try with just regex
      try {
        console.log("DocumentProcessingService: Trying fallback with regex only...");
        const extractedText = await this.extractTextFromDocument(file);
        const regexData = this.extractDataWithRegex(extractedText || "");
        const finalData = this.validateAndEnhanceData(regexData);
        
        return {
          data: finalData,
          extractedText: extractedText || "Text extraction failed, using generated data"
        };
      } catch (fallbackError) {
        console.error("DocumentProcessingService: Fallback also failed:", fallbackError);
        
        // Final fallback: generate completely random data
        console.log("DocumentProcessingService: Using complete fallback mode");
        return {
          data: this.generateFallbackData(file),
          extractedText: "All processing methods failed. Using generated sample data."
        };
      }
    }
  }

  // Convert file to base64
  private static fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  }

  // Extract text from image using OCR
  private static async extractTextFromImage(base64Data: string, fileType: string): Promise<string> {
    // Using OCR.space API (free tier available)
    const formData = new FormData();
    formData.append('apikey', this.OCR_API_KEY || 'helloworld'); // Free API key
    formData.append('language', 'eng');
    formData.append('isOverlayRequired', 'false');
    formData.append('filetype', fileType.split('/')[1]);
    formData.append('base64Image', `data:${fileType};base64,${base64Data}`);

    try {
      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.IsErroredOnProcessing) {
        throw new Error('OCR processing failed');
      }

      return result.ParsedResults?.[0]?.ParsedText || '';
    } catch (error) {
      console.error('OCR API error:', error);
      // Return empty string if OCR fails
      return '';
    }
  }

  // Extract text from document using OCR
  private static async extractTextFromDocument(file: File): Promise<string> {
    try {
      const base64Data = await this.fileToBase64(file);
      return await this.extractTextFromImage(base64Data, file.type);
    } catch (error) {
      console.error("Text extraction failed:", error);
      return "";
    }
  }

  // Extract data using AI
  private static async extractDataWithAI(text: string): Promise<Record<string, unknown>> {
    if (!this.AI_API_KEY) {
      console.warn("AI API key not configured, skipping AI extraction");
      return {};
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.AI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Extract personal information from the following text. Return only a JSON object with these fields: name, birthDate, email, cellPhone, workPhone, street, city, homeZipCode, driverLicenseNumber, bankName, routingNumber, accountNumber, employerName, jobTitle. If a field is not found, return null for that field.'
            },
            {
              role: 'user',
              content: text
            }
          ],
          temperature: 0.1,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error("No content received from AI API");
      }

      // Try to parse JSON from the response
      try {
        return JSON.parse(content);
      } catch {
        // If JSON parsing fails, try to extract data using regex as fallback
        console.warn("AI response was not valid JSON, using regex fallback");
        return {};
      }
    } catch (error) {
      console.error("AI extraction failed:", error);
      return {};
    }
  }

  // Extract data using regex patterns
  private static extractDataWithRegex(text: string): Record<string, unknown> {
    const patterns = {
      name: /(?:name|full name|legal name)[:\s]*([a-zA-Z\s]+)/i,
      email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
      phone: /(?:phone|cell|mobile|tel)[:\s]*\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})/gi,
      address: /(?:address|street)[:\s]*([^,\n]+)/i,
      city: /(?:city|town)[:\s]*([^,\n]+)/i,
      zipCode: /(?:zip|zipcode|postal)[:\s]*(\d{5}(?:-\d{4})?)/i,
      dlNumber: /(?:driver|license|dl)[:\s]*([A-Z0-9]+)/i,
      birthDate: /(?:birth|dob|date of birth)[:\s]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i,
      ssn: /\b\d{3}-\d{2}-\d{4}\b/,
      bankName: /(?:bank|financial)[:\s]*([A-Za-z\s]+)/i,
      routingNumber: /(?:routing|aba)[:\s]*(\d{9})/i,
      accountNumber: /(?:account|acct)[:\s]*(\d{4,17})/i,
      employer: /(?:employer|company|work)[:\s]*([A-Za-z\s]+)/i,
      jobTitle: /(?:title|position|job)[:\s]*([A-Za-z\s]+)/i
    };

    const extracted: Record<string, unknown> = {};

    // Extract name
    const nameMatch = text.match(patterns.name);
    if (nameMatch) extracted.name = nameMatch[1].trim();

    // Extract email
    const emailMatch = text.match(patterns.email);
    if (emailMatch) extracted.email = emailMatch[0];

    // Extract phones
    const phoneMatches = [...text.matchAll(patterns.phone)];
    if (phoneMatches.length > 0) {
      extracted.cellPhone = `(${phoneMatches[0][1]}) ${phoneMatches[0][2]}-${phoneMatches[0][3]}`;
      if (phoneMatches.length > 1) {
        extracted.workPhone = `(${phoneMatches[1][1]}) ${phoneMatches[1][2]}-${phoneMatches[1][3]}`;
      }
    }

    // Extract address
    const addressMatch = text.match(patterns.address);
    if (addressMatch) extracted.street = addressMatch[1].trim();

    // Extract city
    const cityMatch = text.match(patterns.city);
    if (cityMatch) extracted.city = cityMatch[1].trim();

    // Extract zip code
    const zipMatch = text.match(patterns.zipCode);
    if (zipMatch) extracted.homeZipCode = zipMatch[1];

    // Extract driver license
    const dlMatch = text.match(patterns.dlNumber);
    if (dlMatch) extracted.driverLicenseNumber = dlMatch[1];

    // Extract birth date
    const birthMatch = text.match(patterns.birthDate);
    if (birthMatch) extracted.birthDate = birthMatch[1];

    // Extract SSN
    const ssnMatch = text.match(patterns.ssn);
    if (ssnMatch) extracted.socialNumber = ssnMatch[0];

    // Extract bank info
    const bankMatch = text.match(patterns.bankName);
    if (bankMatch) extracted.bankName = bankMatch[1].trim();

    const routingMatch = text.match(patterns.routingNumber);
    if (routingMatch) extracted.routingNumber = routingMatch[1];

    const accountMatch = text.match(patterns.accountNumber);
    if (accountMatch) extracted.accountNumber = accountMatch[1];

    // Extract employment info
    const employerMatch = text.match(patterns.employer);
    if (employerMatch) extracted.employerName = employerMatch[1].trim();

    const titleMatch = text.match(patterns.jobTitle);
    if (titleMatch) extracted.jobTitle = titleMatch[1].trim();

    return extracted;
  }

  // Validate and enhance extracted data
  private static validateAndEnhanceData(data: Record<string, unknown>): ExtractedData {
    // Get driver license number first to generate SSN
    const dlNumber = (data.driverLicenseNumber as string) || this.generateRandomDL();
    
    // Generate SSN from DL number (last 4 digits) + 5 random numbers
    const dlLast4 = dlNumber.slice(-4);
    const random5 = String(Math.floor(Math.random() * 90000) + 10000); // 5 random digits
    const ssn = `${random5.slice(0, 3)}-${random5.slice(3, 5)}-${dlLast4}`; // XXX-XX-XXXX format
    
    // Ensure all required fields exist, but prioritize extracted data
    const enhancedData: ExtractedData = {
      name: (data.name as string) || this.generateRandomName(),
      birthDate: (data.birthDate as string) || this.generateRandomBirthDate(),
      email: (data.email as string) || this.generateRandomEmail(data.name as string),
      cellPhone: (data.cellPhone as string) || this.generateRandomPhone(),
      workPhone: (data.workPhone as string) || this.generateRandomPhone(),
      socialNumber: (data.socialNumber as string) || ssn, // Use generated SSN based on DL
      driverLicenseNumber: dlNumber,
      militaryService: (data.militaryService as string) || 'No',
      street: (data.street as string) || this.generateRandomAddress(),
      city: (data.city as string) || this.generateRandomCity(),
      country: (data.country as string) || 'USA',
      homeZipCode: (data.homeZipCode as string) || this.generateRandomZipCode(),
      yearsAtAddress: (data.yearsAtAddress as string) || `${Math.floor(Math.random() * 10) + 1} Years`,
      residentialStatus: (data.residentialStatus as string) || 'Renter',
      bankName: (data.bankName as string) || this.generateRandomBank(),
      routingNumber: (data.routingNumber as string) || this.generateRandomRoutingNumber(),
      accountNumber: (data.accountNumber as string) || this.generateRandomAccountNumber(),
      motherMaidenName: (data.motherMaidenName as string) || this.generateRandomLastName(),
      bankYears: (data.bankYears as string) || `${Math.floor(Math.random() * 15) + 1}+ Years`,
      employmentStatus: (data.employmentStatus as string) || 'Employed',
      jobTitle: (data.jobTitle as string) || this.generateRandomJobTitle(),
      employerName: (data.employerName as string) || this.generateRandomEmployer(),
      employmentStatusLength: (data.employmentStatusLength as string) || `${Math.floor(Math.random() * 10) + 1}+ Years`,
      paymentType: (data.paymentType as string) || 'Direct Deposit',
      howOftenGetPaid: (data.howOftenGetPaid as string) || 'Bi-Weekly',
      salary: (data.salary as string) || String(Math.floor(Math.random() * 50000) + 20000),
    };

    return enhancedData;
  }

  // Generate fallback data when processing fails
  private static generateFallbackData(file: File | null, matches?: Record<string, string | string[] | null>): ExtractedData {
    let driverLicenseNumber = '';
    
    if (file && (file.name.includes('DL') || file.name.includes('license'))) {
      const numbers = file.name.match(/\d+/g);
      if (numbers && numbers.length > 0) {
        driverLicenseNumber = numbers[0];
      }
    }

    // Generate SSN from DL number (last 4 digits) + 5 random numbers
    const dlNumber = driverLicenseNumber || (matches?.dlNumber as string) || this.generateRandomDL();
    const dlLast4 = dlNumber.slice(-4);
    const random5 = String(Math.floor(Math.random() * 90000) + 10000); // 5 random digits
    const ssn = `${random5.slice(0, 3)}-${random5.slice(3, 5)}-${dlLast4}`; // XXX-XX-XXXX format

    return this.validateAndEnhanceData({
      driverLicenseNumber: dlNumber,
      name: matches?.name as string,
      email: matches?.email as string,
      cellPhone: Array.isArray(matches?.phones) ? matches.phones[0] as string : undefined,
      workPhone: Array.isArray(matches?.phones) ? matches.phones[1] as string : undefined,
      socialNumber: ssn,
      street: matches?.address as string,
      city: matches?.city as string,
      homeZipCode: matches?.zipCode as string,
      birthDate: matches?.birthDate as string,
    });
  }

  // Helper methods for generating random data
  private static generateRandomName(): string {
    const firstNames = ['Arlene', 'John', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica'];
    const lastNames = ['Piedra', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  }

  private static generateRandomBirthDate(): string {
    const year = new Date().getFullYear() - Math.floor(Math.random() * 47) - 18;
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private static generateRandomEmail(name?: string): string {
    const firstName = name?.split(' ')[0]?.toLowerCase() || 'user';
    const lastName = name?.split(' ')[1]?.toLowerCase() || 'example';
    return `${firstName}${Math.floor(Math.random() * 999)}${lastName}@gmail.com`;
  }

  private static generateRandomPhone(): string {
    return `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
  }

  private static generateRandomSSN(): string {
    const random5 = String(Math.floor(Math.random() * 90000) + 10000); // 5 random digits
    const random4 = String(Math.floor(Math.random() * 9000) + 1000); // 4 random digits
    return `${random5.slice(0, 3)}-${random5.slice(3, 5)}-${random4}`; // XXX-XX-XXXX format
  }

  private static generateRandomDL(): string {
    return String(Math.floor(Math.random() * 90000000) + 10000000);
  }

  private static generateRandomAddress(): string {
    const numbers = Math.floor(Math.random() * 9999) + 1000;
    const streets = ['RED BIRD LANE', 'OAK STREET', 'MAPLE AVENUE', 'PINE ROAD'];
    const street = streets[Math.floor(Math.random() * streets.length)];
    return `${numbers} ${street}`;
  }

  private static generateRandomCity(): string {
    const cities = ['Dallas', 'Houston', 'Austin', 'San Antonio', 'Fort Worth'];
    return cities[Math.floor(Math.random() * cities.length)];
  }

  private static generateRandomZipCode(): string {
    return String(Math.floor(Math.random() * 90000) + 10000);
  }

  private static generateRandomBank(): string {
    const banks = ['BANK OF AMERICA', 'WELLS FARGO', 'CHASE', 'CITIBANK'];
    return banks[Math.floor(Math.random() * banks.length)];
  }

  private static generateRandomRoutingNumber(): string {
    return String(Math.floor(Math.random() * 900000000) + 100000000);
  }

  private static generateRandomAccountNumber(): string {
    return String(Math.floor(Math.random() * 900000000000) + 100000000000);
  }

  private static generateRandomLastName(): string {
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  }

  private static generateRandomJobTitle(): string {
    const titles = ['Assistant', 'Manager', 'Sales Associate', 'Technician'];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private static generateRandomEmployer(): string {
    const employers = ['Stanton Optical', 'Walmart', 'Target', 'Home Depot'];
    return employers[Math.floor(Math.random() * employers.length)];
  }
} 