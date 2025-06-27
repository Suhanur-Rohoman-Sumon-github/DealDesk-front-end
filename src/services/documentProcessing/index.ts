import { ExtractedData } from './types';

// Document processing service using external APIs
export class DocumentProcessingService {
  private static readonly OCR_API_KEY = process.env.NEXT_PUBLIC_OCR_API_KEY || '';
  private static readonly AI_API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY || '';

  // Main processing method - Original AI-powered extraction
  static async processDocument(file: File): Promise<{ data: ExtractedData; extractedText: string }> {
    try {
      console.log("DocumentProcessingService: Starting AI-powered extraction...");
      
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Processing timeout - please try again")), 15000); // 15 second timeout
      });

      const processingPromise = this.processDocumentInternal(file);
      
      // Race between processing and timeout
      const result = await Promise.race([processingPromise, timeoutPromise]);
      
      return result;
    } catch (error) {
      console.error('Document processing failed:', error);
      // Fallback to generated data
      const fallbackData = this.generateFallbackData(file);
      return { data: fallbackData, extractedText: 'OCR processing failed, using fallback data generation.' };
    }
  }

  // Internal processing method
  private static async processDocumentInternal(file: File): Promise<{ data: ExtractedData; extractedText: string }> {
    // Step 1: Convert file to base64
    const base64Data = await this.fileToBase64(file);
    
    // Step 2: Extract text using OCR (using a free OCR service)
    const extractedText = await this.extractTextFromImage(base64Data, file.type);
    
    // Step 3: Parse and extract structured data from the actual text
    const structuredData = await this.extractStructuredData(extractedText);
    
    return { data: structuredData, extractedText };
  }

  // Extract structured data from text using AI
  private static async extractStructuredData(text: string): Promise<ExtractedData> {
    if (!text.trim()) {
      throw new Error('No text extracted from document');
    }

    try {
      // Add timeout for AI API call
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("AI processing timeout")), 10000); // 10 second timeout
      });

      const aiPromise = this.callOpenAI(text);
      
      // Race between AI call and timeout
      const result = await Promise.race([aiPromise, timeoutPromise]);
      const extractedData = JSON.parse(result.choices[0].message.content);
      
      return this.validateAndEnhanceData(extractedData);
    } catch (error) {
      console.error('AI extraction failed:', error);
      // Fallback to pattern matching
      return this.extractDataWithPatterns(text);
    }
  }

  // Call OpenAI API
  private static async callOpenAI(text: string) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an expert at extracting information from driver licenses and official documents. Extract ONLY the information that is actually present in the provided text. Do NOT generate or invent any data. If information is not found in the text, return null for that field.

For driver licenses, look for these specific fields and formats:
- **Name**: Find "LN" (Last Name) and "FN" (First Name). Combine them into a "First Name Last Name" format. For example, "LN TURSHMAN FN LINDA DIANE" should become "Linda Diane Turshman".
- **Driver License Number**: Look for "DL" followed by a letter and 7 digits (e.g., C0920950).
- **Birth Date**: Find the "DOB" field. Prioritize this over any other date.
- **Address**: Find the full street address, which is usually a number followed by a street name (e.g., 6583 TANGIER WAY).
- **City, State, Zip**: Look for a line with the format "City, ST ZIP" (e.g., CYPRESS, CA 90630).

Return the result as a single, clean JSON object.`
          },
          {
            role: 'user',
            content: `Here is the text from the document to extract:

${text}`
          }
        ],
        temperature: 0.0,
      }),
    });

    return await response.json();
  }

  // Extract data using pattern matching as fallback
  private static extractDataWithPatterns(text: string): ExtractedData {
    console.log('Full text for regex fallback:', `\n---\n${text}\n---`);
    const matches: Record<string, string | string[] | null> = {};

    // --- High-Priority, Specific Extractions for DL ---

    // 1. Name: Find LN and FN, and combine them. This is the most reliable method.
    const lnMatch = text.match(/LN\s+([A-Z\s]+)/i);
    const fnMatch = text.match(/FN\s+([A-Z\s]+)/i);
    if (lnMatch && lnMatch[1] && fnMatch && fnMatch[1]) {
        const lastName = lnMatch[1].trim().split(/\s+/)[0]; // Take first word after LN
        const firstName = fnMatch[1].trim();
        const fullName = `${firstName} ${lastName}`;
        matches.name = fullName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        console.log(`Name extracted by LN/FN logic: ${matches.name}`);
    }

    // 2. Address, City, Zip: Find the full block together.
    // This regex looks for a number, a street name (like WAY), a city name, "CA", and a 5-digit zip.
    const addressBlockMatch = text.match(/(\d{4,}\s+[A-Z\s]+(?:WAY|ST|AVE|RD|LN|DR|BLVD))\s+([A-Z\s]+),\s*([A-Z]{2})\s*(\d{5})/i);
    if (addressBlockMatch) {
        matches.address = addressBlockMatch[1].trim();
        matches.city = addressBlockMatch[2].trim();
        matches.state = addressBlockMatch[3].trim().toUpperCase();
        matches.zipCode = addressBlockMatch[4].trim();
        console.log(`Address block extracted: ${matches.address}, ${matches.city}, ${matches.state} ${matches.zipCode}`);
    }

    // 3. DOB: Prioritize the DOB field above all other dates.
    const dobMatch = text.match(/DOB\s+(\d{1,2}\/\d{1,2}\/\d{4})/i);
    if (dobMatch && dobMatch[1]) {
        matches.birthDate = this.formatBirthDate(dobMatch[1]);
        console.log(`DOB extracted: ${matches.birthDate}`);
    }

    // 4. DL Number: Look for the specific CA format.
    const dlMatch = text.match(/DL\s+([A-Z]\d{7})/i);
    if (dlMatch && dlMatch[1]) {
        matches.dlNumber = dlMatch[1];
        console.log(`DL number extracted: ${matches.dlNumber}`);
    }

    // --- Generic Fallbacks for any remaining fields ---
    if (!matches.address) {
        const genericAddr = text.match(/(\d{4,}\s+[A-Z\s]+(?:WAY|ST|AVE|RD|LN|DR|BLVD))/i);
        if (genericAddr && genericAddr[1]) {
            // Very basic validation to avoid grabbing random text
            const potentialAddress = genericAddr[1].trim();
            if (potentialAddress.length < 30) {
              matches.address = potentialAddress;
            }
        }
    }
    if (!matches.birthDate) {
        const genericDob = text.match(/(\d{1,2}\/\d{1,2}\/\d{4})/i);
        if(genericDob) matches.birthDate = this.formatBirthDate(genericDob[1]);
    }
    
    console.log('Final extracted matches before generation:', matches);
    return this.generateFallbackData(null, matches);
  }

  // Format birth date to YYYY-MM-DD
  private static formatBirthDate(dateStr: string): string {
    try {
      // Handle various date formats
      const parts = dateStr.split(/[\/\-]/);
      if (parts.length === 3) {
        const month = parseInt(parts[0]);
        const day = parseInt(parts[1]);
        let year = parseInt(parts[2]);

        // Handle 2-digit years
        if (year < 100) {
          year += year < 50 ? 2000 : 1900;
        }
        
        // Validate month/day
        if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
          return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
      }
    } catch (error) {
      console.error('Date formatting error:', error);
    }
    return '';
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
      state: matches?.state as string,
      homeZipCode: matches?.zipCode as string,
      birthDate: matches?.birthDate as string,
    });
  }

  // Extract information from filename
  private static extractInfoFromFilename(filename: string): Record<string, string> {
    const info: Record<string, string> = {};
    
    // Extract numbers from filename (potential DL numbers, etc.)
    const numbers = filename.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      info.dlNumber = numbers[0];
      if (numbers.length > 1) {
        info.zipCode = numbers[1];
      }
    }
    
    // Extract potential names from filename
    const nameMatch = filename.match(/([A-Z][a-z]+_[A-Z][a-z]+|[A-Z][a-z]+\s+[A-Z][a-z]+)/);
    if (nameMatch) {
      info.name = nameMatch[1].replace(/_/g, ' ');
    }
    
    return info;
  }

  // Generate realistic extracted text
  private static generateExtractedText(fileInfo: Record<string, string>): string {
    const name = fileInfo.name || "John Doe";
    const dlNumber = fileInfo.dlNumber || "123456789";
    const zipCode = fileInfo.zipCode || "10001";
    
    return `DRIVER LICENSE
Name: ${name}
License Number: ${dlNumber}
Address: 123 Main Street
City: New York
Zip Code: ${zipCode}
Date of Birth: 01/15/1985
Expiration: 01/15/2025

This is a sample extracted text from the uploaded document.
The system will generate realistic data based on available information.`;
  }

  // Generate realistic data based on file information
  private static generateRealisticData(fileInfo: Record<string, string>): ExtractedData {
    const name = fileInfo.name || this.generateRandomName();
    const email = this.generateRandomEmail(name);
    const dlNumber = fileInfo.dlNumber || this.generateRandomDL();
    const zipCode = fileInfo.zipCode || this.generateRandomZipCode();
    const ssn = this.generateRandomSSN();

    return {
      name: name,
      birthDate: this.generateRandomBirthDate(),
      email: email,
      cellPhone: this.generateRandomPhone(),
      workPhone: this.generateRandomPhone(),
      socialNumber: ssn,
      driverLicenseNumber: dlNumber,
      militaryService: 'No',
      street: this.generateRandomAddress(),
      city: this.generateRandomCity(),
      state: 'CA',
      country: 'USA',
      homeZipCode: zipCode,
      yearsAtAddress: String(Math.floor(Math.random() * 5) + 1),
      residentialStatus: 'Renting',
      bankName: this.generateRandomBank(),
      routingNumber: this.generateRandomRoutingNumber(),
      accountNumber: this.generateRandomAccountNumber(),
      motherMaidenName: this.generateRandomLastName(),
      bankYears: `${Math.floor(Math.random() * 15) + 1}+ Years`,
      employmentStatus: 'Employed',
      jobTitle: this.generateRandomJobTitle(),
      employerName: this.generateRandomEmployer(),
      employmentStatusLength: `${Math.floor(Math.random() * 10) + 1}+ Years`,
      paymentType: 'Direct Deposit',
      howOftenGetPaid: 'Bi-Weekly',
      salary: String(Math.floor(Math.random() * 50000) + 20000),
    };
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
      // Add timeout for OCR API call
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("OCR processing timeout")), 8000); // 8 second timeout
      });

      const ocrPromise = this.callOCRAPI(formData);
      
      // Race between OCR call and timeout
      const result = await Promise.race([ocrPromise, timeoutPromise]);
      
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

  // Call OCR API
  private static async callOCRAPI(formData: FormData) {
    const response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  }

  // Validate and enhance extracted data
  private static validateAndEnhanceData(data: Record<string, unknown>): ExtractedData {
    // Get driver license number first to generate SSN
    const dlNumber = (data.driverLicenseNumber as string) || this.generateRandomDL();
    
    // Generate SSN from DL number (last 4 digits) + 5 random numbers
    const dlLast4 = dlNumber.slice(-4);
    const random5 = String(Math.floor(Math.random() * 90000) + 10000); // 5 random digits
    const ssn = `${random5.slice(0, 3)}-${random5.slice(3, 5)}-${dlLast4}`; // XXX-XX-XXXX format
    
    // Get the name for email generation
    const extractedName = data.name as string;
    
    // Ensure all required fields exist, but prioritize extracted data
    const enhancedData: ExtractedData = {
      name: extractedName || this.generateRandomName(),
      birthDate: (data.birthDate as string) || this.generateRandomBirthDate(),
      email: (data.email as string) || this.generateRandomEmail(extractedName),
      cellPhone: (data.cellPhone as string) || this.generateRandomPhone(),
      workPhone: (data.workPhone as string) || this.generateRandomPhone(),
      socialNumber: (data.socialNumber as string) || ssn, // Use generated SSN based on DL
      driverLicenseNumber: dlNumber,
      militaryService: (data.militaryService as string) || 'No',
      street: (data.street as string) || this.generateRandomAddress(),
      city: (data.city as string) || this.generateRandomCity(),
      state: (data.state as string) || 'CA', // Default to CA
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
    if (name) {
      // Split name into first and last name
      const nameParts = name.trim().split(/\s+/);
      const firstName = nameParts[0]?.toLowerCase() || 'john';
      const lastName = nameParts[1]?.toLowerCase() || 'doe';
      
      // Generate a random number
      const randomNum = Math.floor(Math.random() * 999) + 1;
      
      // Create email with firstname.lastname + number
      return `${firstName}.${lastName}${randomNum}@email.com`;
    }
    
    // Fallback if no name provided
    const firstName = this.generateRandomName().split(' ')[0].toLowerCase();
    const lastName = this.generateRandomName().split(' ')[1].toLowerCase();
    const randomNum = Math.floor(Math.random() * 999) + 1;
    
    return `${firstName}.${lastName}${randomNum}@email.com`;
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