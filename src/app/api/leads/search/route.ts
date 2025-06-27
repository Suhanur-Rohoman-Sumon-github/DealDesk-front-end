import { NextRequest, NextResponse } from 'next/server';
import { leadFinderService, SearchFilters } from '@/services/leadFinder';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const filters: SearchFilters = body;

    // Validate required fields
    if (!filters.location) {
      return NextResponse.json(
        { error: 'Location is required' },
        { status: 400 }
      );
    }

    // Set default values
    const searchFilters: SearchFilters = {
      location: filters.location,
      industry: filters.industry || undefined,
      radius: filters.radius || 5000,
      minRating: filters.minRating || 0,
      hasWebsite: filters.hasWebsite,
      needsWebsite: filters.needsWebsite,
      limit: filters.limit || 50,
    };

    // Search for leads
    const leads = await leadFinderService.searchBusinesses(searchFilters);

    // Calculate lead scores
    const enrichedLeads = leads.map(lead => ({
      ...lead,
      leadScore: leadFinderService.calculateLeadScore(lead),
    }));

    // Sort by lead score (highest first)
    enrichedLeads.sort((a, b) => (b.leadScore || 0) - (a.leadScore || 0));

    return NextResponse.json({
      success: true,
      data: enrichedLeads,
      total: enrichedLeads.length,
      filters: searchFilters,
    });

  } catch (error) {
    console.error('Error in lead search API:', error);
    return NextResponse.json(
      { error: 'Failed to search leads' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to search leads' },
    { status: 405 }
  );
} 