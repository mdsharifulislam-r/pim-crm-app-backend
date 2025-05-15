import { z } from "zod";
import { Types } from "mongoose";

const AccidentalInformationSchema = z.object({
  accidentDate: z.string().optional(),
  location: z.string().optional(),
  driver: z.string().optional(),
  anyPassengers: z.boolean().optional(),
  occurOnJob: z.boolean().optional(),
  accidentDescription: z.string().optional(),
  pointOfImpact: z.string().optional(),
  contributingFactors: z.string().optional(),
  anythingAvoidAccident: z.string().optional(),
  pictureOrVideo: z.boolean().optional(),
  anyWitness: z.boolean().optional(),
  policeArrived: z.boolean().optional(),
  citationsGiven: z.boolean().optional(),
});

const MedicalTreatment1Schema = z.object({
  gender: z.string().optional(),
  photosOfInjuries: z.boolean().optional(),
  erProcedure: z.boolean().optional(),
  prescription: z.boolean().optional(),
  receivedTreatment: z.boolean().optional(),
  treatmentDate: z.string().optional(),
  treatmentLocation: z.string().optional(),
  medicinePrescription: z.boolean().optional(),
  recommendedTreatment: z.string().optional(),
});

const MedicalTreatment2Schema = z.object({
  hadPreviousInjuries: z.boolean().optional(),
  previousInjuriesDescription: z.string().optional(),
  previousInjuriesDate: z.string().optional(),
  treatmentKind: z.string().optional(),
  similarInjuries: z.string().optional(),
  preExistingConditions: z.boolean().optional(),
  doctorName: z.string().optional(),
  doctorOfficeLocation: z.string().optional(),
  medications: z.string().optional(),
});

const MedicalTreatment3Schema = z.object({
  hasPrimaryCareDoctor: z.boolean().optional(),
  primaryCareDoctor: z.string().optional(),
  lastVisitDate: z.string().optional(),
  reasonForVisit: z.string().optional(),
  prescribedMedications: z.string().optional(),
});

const VehicleInformationSchema = z.object({
  vehicleYear: z.string().optional(),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleColor: z.string().optional(),
  ownerName: z.string().optional(),
  ownerLiveWithYou: z.boolean().optional(),
  otherVehicle: z.boolean().optional(),
  relativeOwnAVehicle: z.boolean().optional(),
  vehicleOnStorage: z.boolean().optional(),
  licensePlateNumber: z.string().optional(),
});

const InsuranceInformationSchema = z.object({
  insuredParty: z.string().optional(),
  policyNumber: z.string().optional(),
  claimNumber: z.string().optional(),
  reportedToCarrier: z.boolean().optional(),
  gaveStatementToAdjuster: z.boolean().optional(),
  coverageTypes: z.array(z.string()).optional(),
  hasUM: z.boolean().optional(),
  hasCollision: z.boolean().optional(),
  hasMedpay: z.boolean().optional(),
  hasOutOfStatePIP: z.boolean().optional(),
});

const AdverseVehicle1Schema = z.object({
  numberOfVehiclesInvolved: z.number().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  color: z.string().optional(),
  licensePlateNumber: z.string().optional(),
  adverseInsurance: z.string().optional(),
  adversePolicyNumber: z.string().optional(),
  spokenToAdverseInsurance: z.boolean().optional(),
  adverseClaimNumber: z.string().optional(),
  madeRecordedStatement: z.boolean().optional(),
  adjusterName: z.string().optional(),
  adjusterPhoneNumber: z.string().optional(),
});

const AdverseVehicle2Schema = z.object({
  propertyDamagePaid: z.boolean().optional(),
  hasCollisionCoverage: z.boolean().optional(),
  obtainedRental: z.boolean().optional(),
  settlementOfferMade: z.boolean().optional(),
  signedRelease: z.boolean().optional(),
  repairStatus: z.string().optional(),
  repairCost: z.string().optional(),
  offerAmount: z.number().optional(),
});

const HealthInsuranceSchema = z.object({
  hasHealthInsurance: z.boolean().optional(),
  healthInsuranceCarrier: z.string().optional(),
  groupNumber: z.string().optional(),
  contactPerson: z.string().optional(),
  contactNumber: z.string().optional(),
  hasMedicareOrMedicaid: z.boolean().optional(),
  billsFiled: z.boolean().optional(),
});

const WorkerCompSchema = z.object({
  hasWorkersComp: z.boolean().optional(),
  IsclaimField: z.boolean().optional(),
  claimNumber: z.string().optional(),
  adjusterName: z.string().optional(),
  adjusterPhoneNumber: z.string().optional(),
});

const PreviousAttorneySchema = z.object({
  attorneyName: z.string().optional(),
  attorneyPhoneNumber: z.string().optional(),
  attorneyEmail: z.string().optional(),
});

const WorkSchema = z.object({
  work_location: z.string().optional(),
  missWorkedForAccident: z.boolean().optional(),
  missedTime: z.boolean().optional(),
  sallery: z.enum(["hourly", "salary"]).optional(),
  jobInjuries: z.boolean().optional(),
  compClaimFixed: z.boolean().optional(),
  result: z.string().optional(),
});

const PersonalHistorySchema = z.object({
  piClaims: z.string().optional(),
  civilCaseHistory: z.boolean().optional(),
  soWhat: z.string().optional(),
  when: z.string().optional(),
  where: z.string().optional(),
  criminalCaseHistory: z.boolean().optional(),
  soWhatCriminal: z.string().optional(),
  whenCriminal: z.string().optional(),
  bankruptcy: z.boolean().optional(),
  whenBankruptcy: z.string().optional(),
});

const InjurySchema = z.object({
  howDailyLife: z.string().optional(),
  limitedAnyWay: z.string().optional(),
  anyThingElse: z.string().optional(),
});

const PersonalInformationSchema = z.object({
  address: z.string().optional(),
  residantLength: z.number().optional(),
  alternativePhone: z.string().optional(),
  alternativeEmail: z.string().optional(),
  socialSecurityNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  maritalStatus: z.string().optional(),
  name: z.string().optional(),
});

export const IntakeSchema = z.object({
  type: z.enum(["case", "contact"]),
  client: z.string(), // Types.ObjectId - can be string here
  case: z.string().optional(),
  accidentInformation: AccidentalInformationSchema.optional(),
  medicalTreatment1: MedicalTreatment1Schema.optional(),
  medicalTreatment2: MedicalTreatment2Schema.optional(),
  medicalTreatment3: MedicalTreatment3Schema.optional(),
  vehicleInformation: VehicleInformationSchema.optional(),
  insuranceInformation: InsuranceInformationSchema.optional(),
  adverseVehicle1: AdverseVehicle1Schema.optional(),
  adverseVehicle2: AdverseVehicle2Schema.optional(),
  healthInsurance: HealthInsuranceSchema.optional(),
  workerComp: WorkerCompSchema.optional(),
  previosAttorney: PreviousAttorneySchema.optional(),
  work: WorkSchema.optional(),
  personalHistory: PersonalHistorySchema.optional(),
  injury: InjurySchema.optional(),
  personalInformation: PersonalInformationSchema.optional(),
});

const createIntakeZodSchema = z.object({
    body:IntakeSchema
})

export const IntakeValidation = {
    createIntakeZodSchema
}