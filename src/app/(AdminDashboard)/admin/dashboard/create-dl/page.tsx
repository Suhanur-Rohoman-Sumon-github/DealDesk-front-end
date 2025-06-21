"use client";

import { useCallback, useState } from "react";
import {
  Upload,
  X,
  FileText,
  Loader2,
  Download,
  Eye,
  EyeOff,
  ChevronDown,
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

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const FileUploader = ({ onFileSelect, disabled }: FileUploaderProps) => {
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

interface ExtractedDataDisplayProps {
  data: ExtractedData;
  maskData: (value: string) => string;
}

export const ExtractedDataDisplay = ({
  data,
  maskData,
}: ExtractedDataDisplayProps) => {
  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Name", value: data.name },
        { label: "Birth Date", value: data.birthDate },
        { label: "Email", value: data.email },
        { label: "Cell Phone", value: data.cellPhone },
        { label: "Work Phone", value: data.workPhone },
        { label: "Social Number", value: data.socialNumber },
        { label: "Driver License Number", value: data.driverLicenseNumber },
        { label: "Military Service", value: data.militaryService },
      ],
    },
    {
      title: "Address Information",
      fields: [
        { label: "Street", value: data.street },
        { label: "City", value: data.city },
        { label: "Country", value: data.country },
        { label: "Home Zip Code", value: data.homeZipCode },
        { label: "Years At Address", value: data.yearsAtAddress },
        { label: "Residential Status", value: data.residentialStatus },
      ],
    },
    {
      title: "Banking Information",
      fields: [
        { label: "Bank Name", value: data.bankName },
        { label: "Routing Number", value: data.routingNumber },
        { label: "Account Number", value: data.accountNumber },
        { label: "Mother Maiden Name", value: data.motherMaidenName },
        { label: "Bank Years", value: data.bankYears },
      ],
    },
    {
      title: "Employment Information",
      fields: [
        { label: "Employment Status", value: data.employmentStatus },
        { label: "Job Title", value: data.jobTitle },
        { label: "Employer Name", value: data.employerName },
        {
          label: "Employment Status Length",
          value: data.employmentStatusLength,
        },
        { label: "Payment Type", value: data.paymentType },
        { label: "How Often Get Paid", value: data.howOftenGetPaid },
        { label: "Salary", value: data.salary },
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
            <div className="space-y-2">
              {section.fields.map((field) => (
                <div
                  key={field.label}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-sm font-medium text-gray-600">
                    {field.label}:
                  </span>
                  <span className="text-sm text-gray-900 font-mono">
                    {maskData(field.value) || (
                      <Badge variant="secondary" className="text-xs">
                        Not found
                      </Badge>
                    )}
                  </span>
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
  const [showSensitiveData, setShowSensitiveData] = useState(false);
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
      console.log("Starting document processing...");

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Processing timeout - please try again")),
          30000
        );
      });

      const result = (await Promise.race([
        DocumentProcessingService.processDocument(file),
        timeoutPromise,
      ])) as { data: ExtractedData; extractedText: string };

      console.log("Document processing completed successfully");
      setExtractedData(result.data);
      setExtractedText(result.extractedText);
      setProcessingTime(Date.now() - startTime);
    } catch (err) {
      console.error("Document processing error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to process document. Please try again.";
      setError(errorMessage);

      if (errorMessage.includes("timeout") || errorMessage.includes("API")) {
        setError(
          `${errorMessage} Please check your internet connection and try again.`
        );
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setExtractedData(null);
    setError(null);
    setProcessingTime(0);
    setExtractedText("");
    setDownloadSuccess("");
  };

  const toggleSensitiveData = () => {
    setShowSensitiveData(!showSensitiveData);
  };

  const maskSensitiveData = (value: string): string => {
    if (!showSensitiveData) {
      if (value.includes("@")) {
        // Mask email
        const [local, domain] = value.split("@");
        return `${local.slice(0, 2)}***@${domain}`;
      } else if (value.includes("-")) {
        // Mask phone numbers and SSN
        return value.replace(/\d/g, "*");
      } else if (value.length > 4) {
        // Mask other sensitive data
        return (
          value.slice(0, 2) + "*".repeat(value.length - 4) + value.slice(-2)
        );
      }
    }
    return value;
  };

  const showDownloadSuccess = (format: string) => {
    setDownloadSuccess(`${format} file downloaded successfully!`);
    setTimeout(() => setDownloadSuccess(""), 3000);
  };

  const downloadJSON = () => {
    if (!extractedData) return;

    const dataStr = JSON.stringify(extractedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;

    // Create filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    const filename = `extracted_data_${timestamp}.json`;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showDownloadSuccess("JSON");
  };

  const downloadCSV = () => {
    if (!extractedData) return;

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
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    const filename = `extracted_data_${timestamp}.csv`;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showDownloadSuccess("CSV");
  };

  const downloadTXT = () => {
    if (!extractedData) return;

    // Convert data to readable text format
    const textContent = `EXTRACTED DATA REPORT
Generated on: ${new Date().toLocaleString()}

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

---
Note: This data was extracted using AI-powered document processing.
Some fields may have been generated automatically for missing information.`;

    const textBlob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(textBlob);
    const link = document.createElement("a");
    link.href = url;

    // Create filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    const filename = `extracted_data_${timestamp}.txt`;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showDownloadSuccess("Text");
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Document Data Extraction
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload a document (JPG, PNG, or PDF) to extract personal, address,
          banking, and employment information. Our advanced AI system will
          analyze the document and generate comprehensive data profiles.
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

        {/* Debug: Extracted Text */}
        {extractedText && !isProcessing && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Extracted Text (Debug)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {extractedText}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Check browser console for detailed extraction logs and
                  patterns found.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Extracted Data Display */}
        {extractedData && !isProcessing && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Extracted Data
                </h2>
                {processingTime > 0 && (
                  <Badge variant="outline" className="text-xs">
                    Processed in {(processingTime / 1000).toFixed(1)}s
                  </Badge>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={toggleSensitiveData}
                  variant="outline"
                  size="sm"
                >
                  {showSensitiveData ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide Sensitive Data
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Show Sensitive Data
                    </>
                  )}
                </Button>
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

            {/* SSN Highlight Section */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">
                  Social Security Number Generated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-2xl font-mono font-bold text-blue-900">
                      {maskSensitiveData(extractedData.socialNumber)}
                    </span>
                  </div>
                  <div className="text-sm text-blue-700">
                    <p>
                      <strong>Generated from DL:</strong>{" "}
                      {extractedData.driverLicenseNumber}
                    </p>
                    <p>
                      <strong>Last 4 digits used:</strong>{" "}
                      {extractedData.driverLicenseNumber.slice(-4)}
                    </p>
                    <p>
                      <strong>Format:</strong> XXX-XX-XXXX (5 random + 4 from
                      DL)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ExtractedDataDisplay
              data={extractedData}
              maskData={maskSensitiveData}
            />

            {/* Data Source Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Source Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">
                      ✅ Extracted from Image
                    </h4>
                    <ul className="text-sm space-y-1">
                      {extractedData.name &&
                        extractedData.name !== "Arlene Piedra" &&
                        extractedData.name !== "John Doe" && (
                          <li>• Name: {extractedData.name}</li>
                        )}
                      {extractedData.birthDate &&
                        extractedData.birthDate !== "01/15/1985" && (
                          <li>• Birth Date: {extractedData.birthDate}</li>
                        )}
                      {extractedData.email &&
                        extractedData.email !== "john.doe@email.com" && (
                          <li>• Email: {extractedData.email}</li>
                        )}
                      {extractedData.cellPhone &&
                        extractedData.cellPhone !== "(555) 123-4567" && (
                          <li>• Cell Phone: {extractedData.cellPhone}</li>
                        )}
                      {extractedData.workPhone &&
                        extractedData.workPhone !== "(555) 987-6543" && (
                          <li>• Work Phone: {extractedData.workPhone}</li>
                        )}
                      {extractedData.street &&
                        extractedData.street !== "123 Main Street" && (
                          <li>• Street: {extractedData.street}</li>
                        )}
                      {extractedData.city &&
                        extractedData.city !== "New York" && (
                          <li>• City: {extractedData.city}</li>
                        )}
                      {extractedData.homeZipCode &&
                        extractedData.homeZipCode !== "10001" && (
                          <li>• Zip Code: {extractedData.homeZipCode}</li>
                        )}
                      {extractedData.driverLicenseNumber &&
                        extractedData.driverLicenseNumber !== "DL123456789" && (
                          <li>
                            • Driver License:{" "}
                            {extractedData.driverLicenseNumber}
                          </li>
                        )}
                      {extractedData.country &&
                        extractedData.country !== "USA" && (
                          <li>• Country: {extractedData.country}</li>
                        )}
                      {extractedData.bankName &&
                        extractedData.bankName !== "Chase Bank" && (
                          <li>• Bank Name: {extractedData.bankName}</li>
                        )}
                      {extractedData.routingNumber &&
                        extractedData.routingNumber !== "021000021" && (
                          <li>
                            • Routing Number: {extractedData.routingNumber}
                          </li>
                        )}
                      {extractedData.accountNumber &&
                        extractedData.accountNumber !== "1234567890" && (
                          <li>
                            • Account Number: {extractedData.accountNumber}
                          </li>
                        )}
                      {extractedData.employerName &&
                        extractedData.employerName !== "Tech Corp" && (
                          <li>• Employer: {extractedData.employerName}</li>
                        )}
                      {extractedData.jobTitle &&
                        extractedData.jobTitle !== "Software Engineer" && (
                          <li>• Job Title: {extractedData.jobTitle}</li>
                        )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">
                      🎲 Generated Data
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>
                        • SSN: {extractedData.socialNumber} (from DL + random)
                      </li>
                      <li>
                        • Military Service: {extractedData.militaryService}
                      </li>
                      <li>
                        • Years at Address: {extractedData.yearsAtAddress}
                      </li>
                      <li>
                        • Residential Status: {extractedData.residentialStatus}
                      </li>
                      <li>
                        • Mother Maiden Name: {extractedData.motherMaidenName}
                      </li>
                      <li>• Bank Years: {extractedData.bankYears}</li>
                      <li>
                        • Employment Status: {extractedData.employmentStatus}
                      </li>
                      <li>
                        • Employment Length:{" "}
                        {extractedData.employmentStatusLength}
                      </li>
                      <li>• Payment Type: {extractedData.paymentType}</li>
                      <li>
                        • Payment Frequency: {extractedData.howOftenGetPaid}
                      </li>
                      <li>• Salary: {extractedData.salary}</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">
                    <strong>Note:</strong> The system extracts real data from
                    your document and generates realistic data for missing
                    fields. The SSN is created using the last 4 digits of the
                    driver license number plus 5 random digits in the format
                    XXX-XX-XXXX.
                  </p>
                </div>
              </CardContent>
            </Card>
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
