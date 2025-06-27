/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { OpenAI } from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface LeadData {
  id: string;
  businessName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  hasWebsite: boolean;
  needsWebsite: boolean;
  industry: string;
  location: {
    lat: number;
    lng: number;
  };
  rating?: number;
  reviewCount?: number;
  description?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  contactPerson?: string;
  businessHours?: string;
  services?: string[];
  estimatedRevenue?: string;
  employeeCount?: string;
  foundedYear?: string;
  lastUpdated: Date;
}

export interface SearchFilters {
  location: string;
  industry?: string;
  radius?: number;
  minRating?: number;
  hasWebsite?: boolean;
  needsWebsite?: boolean;
  limit?: number;
}

class LeadFinderService {
  private googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  private yelpApiKey = process.env.NEXT_PUBLIC_YELP_API_KEY;

  // Search for businesses using Google Places API
  async searchBusinesses(filters: SearchFilters): Promise<LeadData[]> {
    try {
      const searchQuery = `${filters.industry || 'business'} in ${filters.location}`;
      
      // Use Google Places API to find businesses
      const placesResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json`,
        {
          params: {
            query: searchQuery,
            key: this.googleApiKey,
            radius: filters.radius || 5000,
            type: 'establishment',
          },
        }
      );

      const places = placesResponse.data.results || [];
      const leads: LeadData[] = [];

      // Process each place and enrich with additional data
      for (const place of places.slice(0, filters.limit || 50)) {
        const lead = await this.enrichBusinessData(place);
        if (lead) {
          leads.push(lead);
        }
      }

      return leads;
    } catch (error) {
      console.error('Error searching businesses:', error);
      throw new Error('Failed to search businesses');
    }
  }

  // Enrich business data with additional information
  private async enrichBusinessData(place: any): Promise<LeadData | null> {
    try {
      // Get detailed place information
      const detailsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: place.place_id,
            key: this.googleApiKey,
            fields: 'name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,opening_hours,types,geometry',
          },
        }
      );

      const details = detailsResponse.data.result;
      
      // Extract email and additional info using AI
      const enrichedData = await this.extractBusinessInfo(details);

      const lead: LeadData = {
        id: place.place_id,
        businessName: details.name || place.name,
        address: details.formatted_address || place.formatted_address,
        phone: details.formatted_phone_number || '',
        email: enrichedData.email || '',
        website: details.website || '',
        hasWebsite: !!details.website,
        needsWebsite: !details.website,
        industry: this.categorizeIndustry(details.types || place.types),
        location: {
          lat: details.geometry?.location?.lat || place.geometry?.location?.lat,
          lng: details.geometry?.location?.lng || place.geometry?.location?.lng,
        },
        rating: details.rating,
        reviewCount: details.user_ratings_total,
        description: enrichedData.description,
        socialMedia: enrichedData.socialMedia,
        contactPerson: enrichedData.contactPerson,
        businessHours: details.opening_hours?.weekday_text?.join(', '),
        services: enrichedData.services,
        estimatedRevenue: enrichedData.estimatedRevenue,
        employeeCount: enrichedData.employeeCount,
        foundedYear: enrichedData.foundedYear,
        lastUpdated: new Date(),
      };

      return lead;
    } catch (error) {
      console.error('Error enriching business data:', error);
      return null;
    }
  }

  // Use AI to extract additional business information
  private async extractBusinessInfo(businessData: any) {
    try {
      const prompt = `
        Analyze this business data and extract additional information:
        Business Name: ${businessData.name}
        Address: ${businessData.formatted_address}
        Phone: ${businessData.formatted_phone_number}
        Website: ${businessData.website}
        Types: ${businessData.types?.join(', ')}
        
        Please provide:
        1. Estimated email address (common patterns)
        2. Business description
        3. Contact person name
        4. Services offered
        5. Estimated revenue range
        6. Employee count range
        7. Founded year (if available)
        8. Social media profiles
        
        Return as JSON format.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a business intelligence expert. Extract and analyze business information accurately."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
      });

      const response = completion.choices[0]?.message?.content;
      if (response) {
        try {
          return JSON.parse(response);
        } catch {
          return this.parseAIResponse(response);
        }
      }

      return {};
    } catch (error) {
      console.error('Error extracting business info with AI:', error);
      return {};
    }
  }

  // Parse AI response if JSON parsing fails
  private parseAIResponse(response: string) {
    const result: any = {};
    
    // Extract email
    const emailMatch = response.match(/email[:\s]+([^\s\n]+@[^\s\n]+)/i);
    if (emailMatch) result.email = emailMatch[1];

    // Extract description
    const descMatch = response.match(/description[:\s]+([^.\n]+)/i);
    if (descMatch) result.description = descMatch[1];

    // Extract contact person
    const contactMatch = response.match(/contact person[:\s]+([^.\n]+)/i);
    if (contactMatch) result.contactPerson = contactMatch[1];

    return result;
  }

  // Categorize business by industry
  private categorizeIndustry(types: string[]): string {
    const industryMap: { [key: string]: string } = {
      'restaurant': 'Food & Beverage',
      'food': 'Food & Beverage',
      'retail': 'Retail',
      'store': 'Retail',
      'health': 'Healthcare',
      'hospital': 'Healthcare',
      'medical': 'Healthcare',
      'automotive': 'Automotive',
      'car': 'Automotive',
      'real_estate': 'Real Estate',
      'finance': 'Financial Services',
      'bank': 'Financial Services',
      'insurance': 'Insurance',
      'legal': 'Legal Services',
      'law': 'Legal Services',
      'education': 'Education',
      'school': 'Education',
      'technology': 'Technology',
      'software': 'Technology',
      'consulting': 'Consulting',
      'professional': 'Professional Services',
      'manufacturing': 'Manufacturing',
      'construction': 'Construction',
      'beauty': 'Beauty & Wellness',
      'spa': 'Beauty & Wellness',
      'fitness': 'Fitness & Health',
      'gym': 'Fitness & Health',
    };

    for (const type of types) {
      for (const [key, industry] of Object.entries(industryMap)) {
        if (type.toLowerCase().includes(key)) {
          return industry;
        }
      }
    }

    return 'Other';
  }

  // Analyze website quality and needs
  async analyzeWebsite(website: string): Promise<{
    needsRedesign: boolean;
    quality: 'poor' | 'fair' | 'good' | 'excellent';
    issues: string[];
    recommendations: string[];
  }> {
    try {
      const prompt = `
        Analyze this website: ${website}
        
        Please evaluate:
        1. Does it need a redesign? (yes/no)
        2. Quality rating: poor/fair/good/excellent
        3. List of issues found
        4. Recommendations for improvement
        
        Return as JSON format.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a web development expert. Analyze websites for quality and improvement opportunities."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
      });

      const response = completion.choices[0]?.message?.content;
      if (response) {
        try {
          return JSON.parse(response);
        } catch {
          return {
            needsRedesign: true,
            quality: 'poor' as const,
            issues: ['Unable to analyze'],
            recommendations: ['Contact for professional assessment']
          };
        }
      }

      return {
        needsRedesign: true,
        quality: 'poor' as const,
        issues: ['Analysis failed'],
        recommendations: ['Contact for professional assessment']
      };
    } catch (error) {
      console.error('Error analyzing website:', error);
      return {
        needsRedesign: true,
        quality: 'poor' as const,
        issues: ['Analysis failed'],
        recommendations: ['Contact for professional assessment']
      };
    }
  }

  // Generate lead score based on various factors
  calculateLeadScore(lead: LeadData): number {
    let score = 0;

    // No website = higher score (more likely to need services)
    if (!lead.hasWebsite) score += 30;
    if (lead.hasWebsite) score += 10;

    // Industry scoring
    const highValueIndustries = ['Technology', 'Healthcare', 'Financial Services', 'Legal Services'];
    if (highValueIndustries.includes(lead.industry)) score += 20;

    // Rating and reviews
    if (lead.rating && lead.rating >= 4.0) score += 15;
    if (lead.reviewCount && lead.reviewCount > 10) score += 10;

    // Contact information completeness
    if (lead.phone) score += 10;
    if (lead.email) score += 10;
    if (lead.address) score += 5;

    return Math.min(score, 100);
  }

  // Export leads to CSV
  exportToCSV(leads: LeadData[]): string {
    const headers = [
      'Business Name',
      'Address',
      'Phone',
      'Email',
      'Website',
      'Industry',
      'Rating',
      'Review Count',
      'Lead Score',
      'Needs Website',
      'Last Updated'
    ];

    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        `"${lead.businessName}"`,
        `"${lead.address}"`,
        `"${lead.phone}"`,
        `"${lead.email}"`,
        `"${lead.website}"`,
        `"${lead.industry}"`,
        lead.rating || '',
        lead.reviewCount || '',
        this.calculateLeadScore(lead),
        lead.needsWebsite ? 'Yes' : 'No',
        lead.lastUpdated.toISOString()
      ].join(','))
    ].join('\n');

    return csvContent;
  }
}

export const leadFinderService = new LeadFinderService(); 