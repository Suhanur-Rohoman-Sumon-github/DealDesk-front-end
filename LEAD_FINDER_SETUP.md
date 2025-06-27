# AI-Powered Lead Finder Setup Guide

## Overview

This AI-powered lead finder system helps web development agencies discover high-quality leads by:

- Searching businesses using Google Places API
- Analyzing websites with AI to identify redesign opportunities
- Extracting contact information and business details
- Scoring leads based on potential value
- Exporting results to CSV format

## Features

- 🔍 **AI-Powered Search**: Advanced algorithms find the best leads
- 🌐 **Website Analysis**: Detect businesses without websites or needing redesigns
- 📊 **Lead Scoring**: Intelligent ranking system
- 📍 **Location-Based Search**: Find leads in specific areas
- 🏭 **Industry Filtering**: Target specific business types
- 📈 **Analytics Dashboard**: View lead statistics and insights
- 📤 **CSV Export**: Download leads for CRM integration

## Required API Keys

### 1. OpenAI API Key

- Sign up at [OpenAI Platform](https://platform.openai.com/)
- Create an API key
- Add to your environment variables:

```env
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Google Places API Key

- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing
- Enable the following APIs:
  - Places API
  - Geocoding API
  - Maps JavaScript API
- Create credentials (API Key)
- Add to your environment variables:

```env
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
```

### 3. Optional: Yelp API Key

- Sign up at [Yelp Developers](https://www.yelp.com/developers)
- Create an app to get API key
- Add to your environment variables:

```env
NEXT_PUBLIC_YELP_API_KEY=your_yelp_api_key_here
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Add API keys to your `.env.local` file:

```env
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-openai-key
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your-google-key
NEXT_PUBLIC_YELP_API_KEY=your-yelp-key
```

3. Run the development server:

```bash
npm run dev
```

4. Navigate to the lead finder page:

```
http://localhost:3000/admin/dashboard/get-leads
```

## How It Works

### 1. Business Discovery

- Uses Google Places API to find businesses in specified locations
- Filters by industry, radius, and other criteria
- Retrieves basic business information

### 2. Data Enrichment

- AI analyzes business data to extract additional information
- Estimates email addresses using common patterns
- Identifies contact persons and business descriptions
- Categorizes businesses by industry

### 3. Website Analysis

- Checks if businesses have websites
- Uses AI to analyze website quality
- Identifies redesign opportunities
- Provides improvement recommendations

### 4. Lead Scoring

The system scores leads based on:

- **No Website** (+30 points): High priority for web development services
- **Industry Value** (+20 points): Technology, Healthcare, Financial Services, Legal Services
- **High Ratings** (+15 points): Businesses with 4+ star ratings
- **Review Count** (+10 points): Businesses with 10+ reviews
- **Contact Info** (+25 points): Complete contact information available

### 5. Results Presentation

- Beautiful table format with all lead information
- Color-coded lead scores
- Website status indicators
- Export functionality for CRM integration

## Usage

### Basic Search

1. Enter a location (city, state, or address)
2. Select industry (optional)
3. Choose search radius
4. Set result limit
5. Click "Find Leads"

### Advanced Filters

- **Only businesses without websites**: Focus on high-priority leads
- **Industry-specific**: Target specific business types
- **Location-based**: Find leads in your service area

### Results Management

- **View Details**: Click on any lead to see full information
- **Contact**: Direct contact buttons for phone/email
- **Save**: Save leads to your system
- **Export**: Download all results as CSV

## API Endpoints

### POST /api/leads/search

Search for leads based on filters.

**Request Body:**

```json
{
  "location": "New York, NY",
  "industry": "Technology",
  "radius": 5000,
  "limit": 50,
  "needsWebsite": true
}
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "place_id",
      "businessName": "Tech Startup Inc",
      "address": "123 Main St, New York, NY",
      "phone": "+1-555-0123",
      "email": "contact@techstartup.com",
      "website": "https://techstartup.com",
      "hasWebsite": true,
      "needsWebsite": false,
      "industry": "Technology",
      "leadScore": 85,
      "rating": 4.5,
      "reviewCount": 25
    }
  ],
  "total": 50,
  "filters": {...}
}
```

## Customization

### Adding New Industries

Edit the `industries` array in the lead finder service:

```typescript
const industries = [
  "Technology",
  "Healthcare",
  // Add your custom industries here
];
```

### Modifying Lead Scoring

Update the `calculateLeadScore` method in `src/services/leadFinder/index.ts`:

```typescript
calculateLeadScore(lead: LeadData): number {
  let score = 0;

  // Customize scoring logic here
  if (!lead.hasWebsite) score += 30;
  // Add more scoring rules...

  return Math.min(score, 100);
}
```

### Custom API Integration

Add new data sources by extending the `LeadFinderService` class:

```typescript
async searchAdditionalSources(filters: SearchFilters): Promise<LeadData[]> {
  // Implement custom API calls
  // Return enriched lead data
}
```

## Troubleshooting

### Common Issues

1. **API Key Errors**

   - Verify API keys are correctly set in environment variables
   - Check API key permissions and quotas
   - Ensure APIs are enabled in Google Cloud Console

2. **No Results Found**

   - Try a larger search radius
   - Use broader industry categories
   - Check if the location is valid

3. **Rate Limiting**
   - Implement request throttling
   - Use API key rotation
   - Monitor API usage quotas

### Performance Optimization

1. **Caching**

   - Implement Redis caching for API responses
   - Cache lead data to avoid repeated API calls
   - Use browser caching for static data

2. **Batch Processing**
   - Process leads in batches
   - Implement background job processing
   - Use webhooks for real-time updates

## Security Considerations

1. **API Key Protection**

   - Never expose API keys in client-side code
   - Use environment variables
   - Implement API key rotation

2. **Rate Limiting**

   - Implement request throttling
   - Monitor API usage
   - Set up alerts for quota limits

3. **Data Privacy**
   - Comply with GDPR and privacy regulations
   - Implement data retention policies
   - Secure data transmission

## Support

For technical support or feature requests:

- Check the documentation
- Review API documentation
- Contact the development team

## License

This project is licensed under the MIT License.
