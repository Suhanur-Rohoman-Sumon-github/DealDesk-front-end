export interface ExtractedData {
  name: string;
  birthDate: string;
  email: string;
  cellPhone: string;
  workPhone: string;
  socialNumber: string;
  driverLicenseNumber: string;
  militaryService: string;
  street: string;
  city: string;
  country: string;
  homeZipCode: string;
  yearsAtAddress: string;
  residentialStatus: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  motherMaidenName: string;
  bankYears: string;
  employmentStatus: string;
  jobTitle: string;
  employerName: string;
  employmentStatusLength: string;
  paymentType: string;
  howOftenGetPaid: string;
  salary: string;
}

export interface ProcessingResult {
  success: boolean;
  data?: ExtractedData;
  error?: string;
  processingTime: number;
} 