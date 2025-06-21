# Document Data Extraction System

This is a comprehensive document data extraction system that can process JPG, PNG, and PDF files to extract personal, address, banking, and employment information.

## 🎯 **Key Features**

- **Real Data Extraction**: Extracts actual information from uploaded images using OCR
- **Smart Fallback**: Only generates random data for missing fields
- **SSN Generation**: Creates SSN from driver license number (last 4 digits)
- **File Upload**: Drag and drop or click to upload documents (JPG, PNG, PDF)
- **OCR Processing**: Uses OCR.space API to extract text from images
- **AI Data Extraction**: Uses OpenAI API to intelligently parse and structure data
- **Pattern Matching**: Advanced regex patterns for data extraction
- **Data Masking**: Sensitive data is masked by default for security
- **Export Functionality**: Download extracted data as JSON
- **Real-time Processing**: Shows processing time and status
- **Debug Mode**: Shows extracted text for verification

## 🔍 **How It Works**

### 1. **Real Data Extraction**

The system prioritizes extracting actual information from your uploaded image:

- **Names**: Extracts first and last names using multiple patterns
- **Addresses**: Finds street addresses, cities, and zip codes
- **Phone Numbers**: Detects phone numbers in various formats
- **Driver License**: Extracts driver license numbers
- **Birth Dates**: Parses birth dates in multiple formats
- **Emails**: Finds email addresses

### 2. **Smart SSN Generation**

- Uses the last 4 digits of the driver license number
- Format: `619-04-XXXX` (where XXXX = last 4 digits of DL)

### 3. **Random Data Only for Missing Fields**

- If information is found in the image → Uses real data
- If information is missing → Generates realistic random data
- No overwriting of extracted information

## 📋 **Extracted Data Fields**

### Personal Information

- **Name** ← Extracted from image
- **Birth Date** ← Extracted from image
- **Email** ← Extracted from image
- **Cell Phone** ← Extracted from image
- **Work Phone** ← Extracted from image
- **Social Number** ← Generated from DL number
- **Driver License Number** ← Extracted from image
- **Military Service** ← Random if not found

### Address Information

- **Street** ← Extracted from image
- **City** ← Extracted from image
- **Country** ← Extracted from image
- **Home Zip Code** ← Extracted from image
- **Years At Address** ← Random if not found
- **Residential Status** ← Random if not found

### Banking Information

- **Bank Name** ← Random if not found
- **Routing Number** ← Random if not found
- **Account Number** ← Random if not found
- **Mother's Maiden Name** ← Random if not found
- **Bank Years** ← Random if not found

### Employment Information

- **Employment Status** ← Random if not found
- **Job Title** ← Random if not found
- **Employer Name** ← Random if not found
- **Employment Length** ← Random if not found
- **Payment Type** ← Random if not found
- **Payment Frequency** ← Random if not found
- **Salary** ← Random if not found

## 🛠 **Setup Instructions**

### 1. Environment Variables

Create a `.env.local` file in your project root:

```env
# OCR.space API Key (free tier available)
NEXT_PUBLIC_OCR_API_KEY=your_ocr_api_key_here

# OpenAI API Key (for AI data extraction)
NEXT_PUBLIC_AI_API_KEY=your_openai_api_key_here
```

### 2. API Keys Setup

#### OCR.space API (Required for real extraction)

1. Go to [OCR.space](https://ocr.space/ocrapi)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier allows 500 requests per day

#### OpenAI API (Optional, enhances extraction)

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and add billing information
3. Generate an API key
4. Uses GPT-3.5-turbo for enhanced data extraction

### 3. Installation

```bash
npm install
npm run dev
```

## 🔧 **How It Works**

### 1. File Processing

- User uploads a document (JPG, PNG, PDF)
- File is converted to base64 format
- OCR API extracts text from the document

### 2. Data Extraction

- **Primary**: AI analyzes the text and extracts structured data
- **Fallback**: Advanced pattern matching with regex
- **Debug**: Shows extracted text in the interface

### 3. Data Enhancement

- **Real Data**: Preserves all extracted information
- **Missing Fields**: Fills with realistic random data
- **SSN Generation**: Creates from driver license number

### 4. Display

- Data is displayed in organized sections
- Sensitive data is masked by default
- Users can toggle to show/hide sensitive information
- Debug section shows extracted text

## 🎯 **Example Output**

When you upload an image with "Arlene Piedra" and "44998093" as driver license:

```
Name: Arlene Piedra ← Extracted from image
Birth Date: 1998-02-13 ← Extracted from image
Email: arlene13piedra@gmail.com ← Extracted from image
Cell Phone: +1 (214) 783-3423 ← Extracted from image
Work Phone: +1 (817) 694-6766 ← Extracted from image
Social Number: 619-04-9093 ← Generated from DL (last 4 digits)
Driver License Number: 44998093 ← Extracted from image
Military Service: No ← Random
Home Zip Code: 75241 ← Extracted from image
Street: 1638 E RED BIRD LANE ← Extracted from image
City: Dallas ← Extracted from image
Country: Dallas ← Extracted from image
Years At Address: 3 Years ← Random
Residential Status: Renter ← Random
Bank Name: BANK OF AMERICA ← Random
Routing Number: 111000025 ← Random
Account Number: 488129823845 ← Random
Mother Maiden Name: Tona ← Random
Bank Years: 7+ Years ← Random
Employment Status: ← Random
Job Title: Assistant ← Random
Employer Name: Stanton optical ← Random
Employment Status Length: 5+ Years ← Random
Payment Type: ← Random
How Often Get Paid: Bi-Weekly ← Random
Salary: 2500 ← Random
```

## 🔍 **Debug Features**

- **Extracted Text Display**: Shows the raw text extracted from the image
- **Console Logs**: Detailed extraction logs in browser console
- **Pattern Matching**: Shows which patterns found which data
- **Processing Time**: Shows how long extraction took

## 🛡 **Security Features**

- **Data Masking**: Sensitive information is masked by default
- **No Data Storage**: Files are processed in memory and not stored
- **API Key Protection**: API keys are stored in environment variables
- **Error Handling**: Graceful fallbacks when APIs fail

## 🚀 **Usage**

1. **Upload Document**: Drag and drop or click to upload
2. **Wait for Processing**: System extracts text and data
3. **Review Results**: Check extracted data and debug information
4. **Toggle Sensitive Data**: Show/hide sensitive information
5. **Download**: Export as JSON file

## 🔧 **Customization**

### Adding New Data Fields

1. Update the `ExtractedData` interface in `types.ts`
2. Add extraction logic in `DocumentProcessingService`
3. Update the display component

### Modifying Data Generation

- Edit the random data generation methods
- Update the data arrays (names, cities, banks, etc.)

### Changing API Providers

- Replace OCR.space with Google Vision API or Azure Computer Vision
- Replace OpenAI with other AI providers

## 🐛 **Troubleshooting**

### Common Issues

1. **OCR API Errors**

   - Check API key validity
   - Verify file format support
   - Check daily request limits

2. **No Data Extracted**

   - Check image quality (should be clear and readable)
   - Verify text is visible in the image
   - Check browser console for extraction logs

3. **File Upload Issues**
   - Verify file size limits
   - Check supported file types
   - Ensure proper file permissions

### Error Handling

The system includes comprehensive error handling:

- API failures fall back to pattern matching
- Pattern matching failures fall back to random generation
- All errors are logged to console for debugging

## 📊 **Performance**

- **Processing Time**: 2-5 seconds for typical documents
- **File Size Limit**: 10MB (configurable)
- **Concurrent Requests**: Limited by API rate limits
- **Caching**: No caching implemented (stateless processing)

## 📝 **License**

This project is for educational and demonstration purposes. Please ensure compliance with data protection regulations when using in production.
