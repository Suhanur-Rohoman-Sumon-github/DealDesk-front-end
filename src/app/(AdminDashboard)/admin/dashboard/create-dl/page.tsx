"use client";

import { useCallback, useState } from "react";
import {
  Upload,
  X,
  FileText,
  Loader2,
  Download,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentProcessingService } from "@/services/documentProcessing";
import type { ExtractedData } from "@/services/documentProcessing/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

 const FileUploader = ({ onFileSelect, disabled }: FileUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        const file = files[0];
        if (isValidFileType(file)) {
          setSelectedFile(file);
          onFileSelect(file);
        }
      }
    },
    [onFileSelect, disabled]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (isValidFileType(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const isValidFileType = (file: File) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    return validTypes.includes(file.type);
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="space-y-4">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() =>
          !disabled && document.getElementById("file-input")?.click()
        }
      >
        <input
          id="file-input"
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileInput}
          disabled={disabled}
        />

        <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium mb-2">
          Drop your document here or click to browse
        </p>
        <p className="text-sm text-gray-500">
          Supports JPG, PNG, and PDF files
        </p>
      </div>

      {selectedFile && (
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-sm">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFile}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

const usStates = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

interface ExtractedDataDisplayProps {
  data: ExtractedData;
  onDataChange: (field: keyof ExtractedData, value: string) => void;
}

// Address autocomplete service
class AddressAutocompleteService {
  static async geocodeAddress(address: string): Promise<{
    city: string;
    state: string;
    zipCode: string;
  } | null> {
    try {
      // Using Nominatim (OpenStreetMap) - free geocoding service
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}&countrycodes=us&limit=1`
      );

      if (!response.ok) {
        throw new Error("Geocoding service unavailable");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const addressParts = result.display_name.split(", ");

        // Extract city, state, and zip from the address parts
        let city = "";
        let state = "";
        let zipCode = "";

        // Look for state and zip pattern (e.g., "CA 90210")
        const stateZipMatch = addressParts.find((part: string) =>
          /^[A-Z]{2}\s+\d{5}/.test(part)
        );
        if (stateZipMatch) {
          const [stateCode, zip] = stateZipMatch.split(" ");
          state = stateCode;
          zipCode = zip;
        }

        // Find city (usually the part before state)
        const stateIndex = addressParts.findIndex((part: string) =>
          /^[A-Z]{2}/.test(part)
        );
        if (stateIndex > 0) {
          city = addressParts[stateIndex - 1];
        }

        return { city, state, zipCode };
      }

      return null;
    } catch (error) {
      console.error("Address geocoding failed:", error);
      return null;
    }
  }
}

 const ExtractedDataDisplay = ({
  data,
  onDataChange,
}: ExtractedDataDisplayProps) => {
  const [isGeocoding, setIsGeocoding] = useState(false);

  const handleAddressChange = async (value: string) => {
    onDataChange("street", value);

    // Auto-geocode if address is pasted or typed
    if (value.length > 10) {
      setIsGeocoding(true);
      try {
        const geocoded = await AddressAutocompleteService.geocodeAddress(value);
        if (geocoded) {
          onDataChange("city", geocoded.city);
          onDataChange("state", geocoded.state);
          onDataChange("homeZipCode", geocoded.zipCode);
        }
      } catch (error) {
        console.error("Auto-geocoding failed:", error);
      } finally {
        setIsGeocoding(false);
      }
    }
  };

  const handleManualGeocode = async () => {
    if (!data.street) return;

    setIsGeocoding(true);
    try {
      const geocoded = await AddressAutocompleteService.geocodeAddress(
        data.street
      );
      if (geocoded) {
        onDataChange("city", geocoded.city);
        onDataChange("state", geocoded.state);
        onDataChange("homeZipCode", geocoded.zipCode);
      }
    } catch (error) {
      console.error("Manual geocoding failed:", error);
    } finally {
      setIsGeocoding(false);
    }
  };

  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Name", key: "name", value: data.name },
        {
          label: "Birth Date",
          key: "birthDate",
          value: data.birthDate,
          type: "date",
        },
        { label: "Email", key: "email", value: data.email, type: "email" },
        {
          label: "Cell Phone",
          key: "cellPhone",
          value: data.cellPhone,
          type: "tel",
        },
        {
          label: "Work Phone",
          key: "workPhone",
          value: data.workPhone,
          type: "tel",
        },
        {
          label: "Social Number",
          key: "socialNumber",
          value: data.socialNumber,
        },
        {
          label: "Driver License Number",
          key: "driverLicenseNumber",
          value: data.driverLicenseNumber,
        },
        {
          label: "Military Service",
          key: "militaryService",
          value: data.militaryService,
        },
      ],
    },
    {
      title: "Address Information",
      fields: [
        {
          label: "Street",
          key: "street",
          value: data.street,
          special: "address", // Mark for special handling
        },
        { label: "City", key: "city", value: data.city },
        { label: "State", key: "state", value: data.state, type: "text" },
        { label: "Country", key: "country", value: data.country },
        { label: "Home Zip Code", key: "homeZipCode", value: data.homeZipCode },
        {
          label: "Years At Address",
          key: "yearsAtAddress",
          value: data.yearsAtAddress,
        },
        {
          label: "Residential Status",
          key: "residentialStatus",
          value: data.residentialStatus,
        },
      ],
    },
    {
      title: "Banking Information",
      fields: [
        { label: "Bank Name", key: "bankName", value: data.bankName },
        {
          label: "Routing Number",
          key: "routingNumber",
          value: data.routingNumber,
        },
        {
          label: "Account Number",
          key: "accountNumber",
          value: data.accountNumber,
        },
        {
          label: "Mother Maiden Name",
          key: "motherMaidenName",
          value: data.motherMaidenName,
        },
        { label: "Bank Years", key: "bankYears", value: data.bankYears },
      ],
    },
    {
      title: "Employment Information",
      fields: [
        {
          label: "Employment Status",
          key: "employmentStatus",
          value: data.employmentStatus,
        },
        { label: "Job Title", key: "jobTitle", value: data.jobTitle },
        {
          label: "Employer Name",
          key: "employerName",
          value: data.employerName,
        },
        {
          label: "Employment Status Length",
          key: "employmentStatusLength",
          value: data.employmentStatusLength,
        },
        { label: "Payment Type", key: "paymentType", value: data.paymentType },
        {
          label: "How Often Get Paid",
          key: "howOftenGetPaid",
          value: data.howOftenGetPaid,
        },
        { label: "Salary", key: "salary", value: data.salary },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle className="text-lg">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div
                  key={field.label}
                  className="grid grid-cols-1 md:grid-cols-3 items-center gap-2"
                >
                  <label
                    htmlFor={field.key}
                    className="text-sm font-medium text-gray-600"
                  >
                    {field.label}:
                  </label>
                  <div className="md:col-span-2 flex items-center gap-2">
                    {field.key === "state" ? (
                      <Select
                        value={field.value}
                        onValueChange={(value) =>
                          onDataChange(field.key as keyof ExtractedData, value)
                        }
                      >
                        <SelectTrigger className="font-mono text-sm">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {usStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.special === "address" ? (
                      <div className="flex-1 flex items-center gap-2">
                        <Input
                          id={field.key}
                          type={field.type || "text"}
                          className="font-mono text-sm"
                          value={field.value}
                          onChange={(e) => handleAddressChange(e.target.value)}
                          placeholder={`Enter ${field.label}`}
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleManualGeocode}
                                disabled={isGeocoding || !field.value}
                                className="px-2"
                              >
                                {isGeocoding ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <MapPin className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Auto-fill city, state, and zip from address</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ) : (
                      <Input
                        id={field.key}
                        type={field.type || "text"}
                        className="font-mono text-sm"
                        value={field.value}
                        onChange={(e) =>
                          onDataChange(
                            field.key as keyof ExtractedData,
                            e.target.value
                          )
                        }
                        placeholder={`Enter ${field.label}`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Main page component
export default function CreateDLPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingTime, setProcessingTime] = useState<number>(0);
  const [extractedText, setExtractedText] = useState<string>("");
  const [downloadSuccess, setDownloadSuccess] = useState<string>("");

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setError(null);
    setDownloadSuccess("");
    setIsProcessing(true);
    setExtractedData(null);
    setExtractedText("");
    setProcessingTime(0);
    const startTime = Date.now();

    try {
      const result = await DocumentProcessingService.processDocument(file);
      setExtractedData(result.data);
      setExtractedText(result.extractedText);
      setProcessingTime(Date.now() - startTime);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to process document. Please try again.";
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDataChange = (field: keyof ExtractedData, value: string) => {
    setExtractedData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        [field]: value,
      };
    });
  };

  const clearFile = () => {
    setSelectedFile(null);
    setExtractedData(null);
    setError(null);
    setProcessingTime(0);
    setExtractedText("");
    setDownloadSuccess("");
  };

  const showDownloadSuccess = (format: string) => {
    setDownloadSuccess(`${format} file downloaded successfully!`);
    setTimeout(() => setDownloadSuccess(""), 3000);
  };

  const downloadJSON = () => {
    if (!extractedData) {
      console.error("No extracted data available for download");
      return;
    }

    try {
      // Export only the clean data object
      const dataStr = JSON.stringify(extractedData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;

      // Create filename with timestamp
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");
      const filename = `extracted_data_${timestamp}.json`;
      link.download = filename;

      // Add link to DOM, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log("JSON download completed successfully");
      showDownloadSuccess("JSON");
    } catch (error) {
      console.error("JSON download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  const downloadCSV = () => {
    if (!extractedData) {
      console.error("No extracted data available for download");
      return;
    }

    try {
      // Convert data to CSV format
      const csvData = [
        ["Field", "Value"],
        ["Name", extractedData.name],
        ["Birth Date", extractedData.birthDate],
        ["Email", extractedData.email],
        ["Cell Phone", extractedData.cellPhone],
        ["Work Phone", extractedData.workPhone],
        ["Social Number", extractedData.socialNumber],
        ["Driver License Number", extractedData.driverLicenseNumber],
        ["Military Service", extractedData.militaryService],
        ["Street", extractedData.street],
        ["City", extractedData.city],
        ["Country", extractedData.country],
        ["Home Zip Code", extractedData.homeZipCode],
        ["Years At Address", extractedData.yearsAtAddress],
        ["Residential Status", extractedData.residentialStatus],
        ["Bank Name", extractedData.bankName],
        ["Routing Number", extractedData.routingNumber],
        ["Account Number", extractedData.accountNumber],
        ["Mother Maiden Name", extractedData.motherMaidenName],
        ["Bank Years", extractedData.bankYears],
        ["Employment Status", extractedData.employmentStatus],
        ["Job Title", extractedData.jobTitle],
        ["Employer Name", extractedData.employerName],
        ["Employment Status Length", extractedData.employmentStatusLength],
        ["Payment Type", extractedData.paymentType],
        ["How Often Get Paid", extractedData.howOftenGetPaid],
        ["Salary", extractedData.salary],
      ];

      const csvContent = csvData
        .map((row) => row.map((field) => `"${field}"`).join(","))
        .join("\n");
      const csvBlob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(csvBlob);
      const link = document.createElement("a");
      link.href = url;

      // Create filename with timestamp
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");
      const filename = `extracted_data_${timestamp}.csv`;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log("CSV download completed successfully");
      showDownloadSuccess("CSV");
    } catch (error) {
      console.error("CSV download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  const downloadTXT = () => {
    if (!extractedData) {
      console.error("No extracted data available for download");
      return;
    }

    try {
      // Convert data to readable text format
      const textContent = `EXTRACTED DATA REPORT
Generated on: ${new Date().toLocaleString()}

EXTRACTION INFO:
File Name: ${selectedFile?.name || "Unknown"}
Processing Time: ${processingTime}ms
Extracted Text Length: ${extractedText.length} characters

PERSONAL INFORMATION:
Name: ${extractedData.name}
Birth Date: ${extractedData.birthDate}
Email: ${extractedData.email}
Cell Phone: ${extractedData.cellPhone}
Work Phone: ${extractedData.workPhone}
Social Number: ${extractedData.socialNumber}
Driver License Number: ${extractedData.driverLicenseNumber}
Military Service: ${extractedData.militaryService}

ADDRESS INFORMATION:
Street: ${extractedData.street}
City: ${extractedData.city}
Country: ${extractedData.country}
Home Zip Code: ${extractedData.homeZipCode}
Years At Address: ${extractedData.yearsAtAddress}
Residential Status: ${extractedData.residentialStatus}

BANKING INFORMATION:
Bank Name: ${extractedData.bankName}
Routing Number: ${extractedData.routingNumber}
Account Number: ${extractedData.accountNumber}
Mother Maiden Name: ${extractedData.motherMaidenName}
Bank Years: ${extractedData.bankYears}

EMPLOYMENT INFORMATION:
Employment Status: ${extractedData.employmentStatus}
Job Title: ${extractedData.jobTitle}
Employer Name: ${extractedData.employerName}
Employment Status Length: ${extractedData.employmentStatusLength}
Payment Type: ${extractedData.paymentType}
How Often Get Paid: ${extractedData.howOftenGetPaid}
Salary: ${extractedData.salary}

RAW EXTRACTED TEXT:
${extractedText}

---
Note: This data was extracted using AI-powered document processing.
Some fields may have been generated automatically for missing information.`;

      const textBlob = new Blob([textContent], { type: "text/plain" });
      const url = URL.createObjectURL(textBlob);
      const link = document.createElement("a");
      link.href = url;

      // Create filename with timestamp
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");
      const filename = `extracted_data_${timestamp}.txt`;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log("TXT download completed successfully");
      showDownloadSuccess("Text");
    } catch (error) {
      console.error("TXT download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Document Data Extraction
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload a document (JPG, PNG, or PDF) to extract real personal,
          address, banking, and employment information using OCR and AI. The
          system will extract actual data from your documents and generate
          realistic data for missing fields.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* File Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploader
              onFileSelect={handleFileSelect}
              disabled={isProcessing}
            />
          </CardContent>
        </Card>

        {/* Processing State */}
        {isProcessing && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-3">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <span className="text-lg font-medium">
                  Processing document...
                </span>
              </div>
              <p className="text-center text-gray-500 mt-2">
                Analyzing document with OCR and AI extraction. This may take a
                few moments.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-medium">Processing Error</p>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
                <div className="flex justify-center space-x-3">
                  <Button
                    onClick={() =>
                      selectedFile && handleFileSelect(selectedFile)
                    }
                    variant="outline"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      "Retry Processing"
                    )}
                  </Button>
                  <Button
                    onClick={clearFile}
                    variant="ghost"
                    disabled={isProcessing}
                  >
                    Upload New File
                  </Button>
                </div>
                <div className="text-xs text-gray-500">
                  <p>Common solutions:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Check your internet connection</li>
                    <li>Try a different image or document</li>
                    <li>Ensure the document is clear and readable</li>
                    <li>Wait a few minutes and try again (API rate limits)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success State */}
        {downloadSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">{downloadSuccess}</p>
          </div>
        )}

        {/* Extracted Data Display */}
        {extractedData && !isProcessing && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Review and Edit Extracted Data
                </h2>
                {processingTime > 0 && (
                  <Badge variant="outline" className="text-xs">
                    Processed in {(processingTime / 1000).toFixed(1)}s
                  </Badge>
                )}
              </div>
              <div className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Data
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={downloadJSON}>
                      <Download className="h-4 w-4 mr-2" />
                      Download as JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={downloadCSV}>
                      <Download className="h-4 w-4 mr-2" />
                      Download as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={downloadTXT}>
                      <Download className="h-4 w-4 mr-2" />
                      Download as TXT
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              The OCR has made its best attempt to extract the data. Please
              review the fields below and correct any errors before downloading.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-start">
              {/* Form on the left */}
              <ExtractedDataDisplay
                data={extractedData}
                onDataChange={handleDataChange}
              />

              {/* Live JSON Preview on the right */}
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Live JSON Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-white p-4 rounded-lg">
                      <pre className="text-xs whitespace-pre-wrap max-h-[70vh] overflow-auto">
                        {JSON.stringify(extractedData, null, 2)}
                      </pre>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      This panel shows the real-time state of your data object
                      as you edit it.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Clear Button */}
        {selectedFile && (
          <div className="flex justify-center">
            <Button onClick={clearFile} variant="outline">
              Upload New Document
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
