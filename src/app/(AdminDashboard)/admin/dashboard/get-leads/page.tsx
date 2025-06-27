"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Building2,
  Globe,
  Phone,
  Mail,
  Star,
  Download,
  Target,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  leadFinderService,
  LeadData,
  SearchFilters,
} from "@/services/leadFinder";

interface EnrichedLeadData extends LeadData {
  leadScore: number;
}

const industries = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Legal Services",
  "Real Estate",
  "Food & Beverage",
  "Retail",
  "Automotive",
  "Education",
  "Manufacturing",
  "Construction",
  "Beauty & Wellness",
  "Fitness & Health",
  "Consulting",
  "Professional Services",
  "Insurance",
  "Other",
];

const LeadFinderPage = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: "",
    industry: "",
    radius: 5000,
    limit: 50,
  });

  const [leads, setLeads] = useState<EnrichedLeadData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async () => {
    if (!searchFilters.location.trim()) {
      setError("Please enter a location");
      return;
    }

    setLoading(true);
    setError(null);
    setSearchPerformed(true);

    try {
      const response = await fetch("/api/leads/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchFilters),
      });

      const result = await response.json();

      if (result.success) {
        setLeads(result.data);
      } else {
        setError(result.error || "Failed to search leads");
      }
    } catch {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const csvContent = leadFinderService.exportToCSV(leads);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${searchFilters.location}-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    if (score >= 40) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const getWebsiteStatus = (hasWebsite: boolean, needsWebsite: boolean) => {
    if (!hasWebsite)
      return { text: "No Website", color: "bg-red-100 text-red-800" };
    if (needsWebsite)
      return { text: "Needs Redesign", color: "bg-yellow-100 text-yellow-800" };
    return { text: "Has Website", color: "bg-green-100 text-green-800" };
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            AI-Powered Lead Finder
          </h1>
          <p className="text-gray-600 mt-2">
            Discover high-quality leads for your web development agency using
            advanced AI technology
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Target className="h-8 w-8 text-blue-600" />
          <span className="text-sm text-gray-500">Powered by AI</span>
        </div>
      </div>

      {/* Search Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Filters
          </CardTitle>
          <CardDescription>
            Configure your search parameters to find the perfect leads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="City, State or Address"
                  value={searchFilters.location}
                  onChange={(e) =>
                    setSearchFilters({
                      ...searchFilters,
                      location: e.target.value,
                    })
                  }
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <Select
                value={searchFilters.industry}
                onValueChange={(value) =>
                  setSearchFilters({ ...searchFilters, industry: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Search Radius</label>
              <Select
                value={searchFilters.radius?.toString()}
                onValueChange={(value) =>
                  setSearchFilters({
                    ...searchFilters,
                    radius: parseInt(value),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000">1 km</SelectItem>
                  <SelectItem value="5000">5 km</SelectItem>
                  <SelectItem value="10000">10 km</SelectItem>
                  <SelectItem value="25000">25 km</SelectItem>
                  <SelectItem value="50000">50 km</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Result Limit</label>
              <Select
                value={searchFilters.limit?.toString()}
                onValueChange={(value) =>
                  setSearchFilters({ ...searchFilters, limit: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 results</SelectItem>
                  <SelectItem value="25">25 results</SelectItem>
                  <SelectItem value="50">50 results</SelectItem>
                  <SelectItem value="100">100 results</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={searchFilters.needsWebsite}
                  onChange={(e) =>
                    setSearchFilters({
                      ...searchFilters,
                      needsWebsite: e.target.checked,
                    })
                  }
                  className="rounded"
                />
                <span className="text-sm">
                  Only businesses without websites
                </span>
              </label>
            </div>

            <Button onClick={handleSearch} disabled={loading} className="px-8">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Find Leads</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {searchPerformed && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Leads</p>
                    <p className="text-2xl font-bold">{leads.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">No Website</p>
                    <p className="text-2xl font-bold">
                      {leads.filter((lead) => !lead.hasWebsite).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">High Score Leads</p>
                    <p className="text-2xl font-bold">
                      {leads.filter((lead) => lead.leadScore >= 70).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Avg Lead Score</p>
                    <p className="text-2xl font-bold">
                      {leads.length > 0
                        ? Math.round(
                            leads.reduce(
                              (sum, lead) => sum + lead.leadScore,
                              0
                            ) / leads.length
                          )
                        : 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Search Results</CardTitle>
                  <CardDescription>
                    Found {leads.length} leads in {searchFilters.location}
                  </CardDescription>
                </div>
                {leads.length > 0 && (
                  <Button onClick={exportToCSV} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : leads.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Website</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Lead Score</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => {
                        const websiteStatus = getWebsiteStatus(
                          lead.hasWebsite,
                          lead.needsWebsite
                        );
                        return (
                          <TableRow key={lead.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {lead.businessName}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {lead.address}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {lead.phone && (
                                  <div className="flex items-center text-sm">
                                    <Phone className="h-3 w-3 mr-1" />
                                    {lead.phone}
                                  </div>
                                )}
                                {lead.email && (
                                  <div className="flex items-center text-sm">
                                    <Mail className="h-3 w-3 mr-1" />
                                    {lead.email}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Badge className={websiteStatus.color}>
                                  {websiteStatus.text}
                                </Badge>
                                {lead.website && (
                                  <a
                                    href={lead.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm"
                                  >
                                    Visit
                                  </a>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{lead.industry}</Badge>
                            </TableCell>
                            <TableCell>
                              {lead.rating ? (
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                  <span className="text-sm">{lead.rating}</span>
                                  {lead.reviewCount && (
                                    <span className="text-xs text-gray-500 ml-1">
                                      ({lead.reviewCount})
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">
                                  No rating
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={getLeadScoreColor(lead.leadScore)}
                              >
                                {lead.leadScore}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  Contact
                                </Button>
                                <Button size="sm" variant="outline">
                                  Save
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No leads found. Try adjusting your search filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Features Section */}
      {!searchPerformed && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-blue-600" />
                <CardTitle>AI-Powered Search</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Advanced AI algorithms analyze businesses to find the best leads
                for your web development agency.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-green-600" />
                <CardTitle>Website Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Automatically detect businesses without websites or those
                needing redesign services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-purple-600" />
                <CardTitle>Lead Scoring</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Intelligent scoring system ranks leads by potential value and
                likelihood to convert.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LeadFinderPage;
