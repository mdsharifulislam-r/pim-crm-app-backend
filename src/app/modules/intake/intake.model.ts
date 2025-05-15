// intake.model.ts
import { Schema, model, Types, Model } from 'mongoose';
import {
  IIntake,
  IAccidentalInformation,
  IMedicalTreatment1,
  IMedicalTreatment2,
  IMedicalTreatment3,
  IVehicleInformation1,
  IInsuranceInformation,
  IAdverseVehicle1,
  IAdverseVehicle2,
  IHealthInsurance,
  IWorkerComp,
  IPreviosAttorney,
  IWork,
  IPersonalHistory,
  IInjury,
  IPersonalInformation,
  IntakeModel,
} from './intake.interface';

const AccidentalInformationSchema = new Schema<IAccidentalInformation>({
  accidentDate: String,
  location: String,
  driver: String,
  anyPassengers: Boolean,
  occurOnJob: Boolean,
  accidentDescription: String,
  pointOfImpact: String,
  contributingFactors: String,
  anythingAvoidAccident: String,
  pictureOrVideo: Boolean,
  anyWitness: Boolean,
  policeArrived: Boolean,
  citationsGiven: Boolean,
}, { _id: false });

const MedicalTreatment1Schema = new Schema<IMedicalTreatment1>({
  gender: String,
  photosOfInjuries: Boolean,
  erProcedure: Boolean,
  prescription: Boolean,
  receivedTreatment: Boolean,
  treatmentDate: Date,
  treatmentLocation: String,
  medicinePrescription: Boolean,
  recommendedTreatment: String,
}, { _id: false });

const MedicalTreatment2Schema = new Schema<IMedicalTreatment2>({
  hadPreviousInjuries: Boolean,
  previousInjuriesDescription: String,
  previousInjuriesDate: Date,
  treatmentKind: String,
  similarInjuries: String,
  preExistingConditions: Boolean,
  doctorName: String,
  doctorOfficeLocation: String,
  medications: String,
}, { _id: false });

const MedicalTreatment3Schema = new Schema<IMedicalTreatment3>({
  hasPrimaryCareDoctor: Boolean,
  primaryCareDoctor: String,
  lastVisitDate: Date,
  reasonForVisit: String,
  prescribedMedications: String,
}, { _id: false });

const VehicleInformationSchema = new Schema<IVehicleInformation1>({
  vehicleYear: String,
  vehicleMake: String,
  vehicleModel: String,
  vehicleColor: String,
  ownerName: String,
  ownerLiveWithYou: Boolean,
  otherVehicle: Boolean,
  relativeOwnAVehicle: Boolean,
  vehicleOnStorage: Boolean,
  licensePlateNumber: String,
}, { _id: false });

const InsuranceInformationSchema = new Schema<IInsuranceInformation>({
  insuredParty: String,
  policyNumber: String,
  claimNumber: String,
  reportedToCarrier: Boolean,
  gaveStatementToAdjuster: Boolean,
  coverageTypes: [String],
  hasUM: Boolean,
  hasCollision: Boolean,
  hasMedpay: Boolean,
  hasOutOfStatePIP: Boolean,
}, { _id: false });

const AdverseVehicle1Schema = new Schema<IAdverseVehicle1>({
  numberOfVehiclesInvolved: Number,
  make: String,
  model: String,
  color: String,
  licensePlateNumber: String,
  adverseInsurance: String,
  adversePolicyNumber: String,
  spokenToAdverseInsurance: Boolean,
  adverseClaimNumber: String,
  madeRecordedStatement: Boolean,
  adjusterName: String,
  adjusterPhoneNumber: String,
}, { _id: false });

const AdverseVehicle2Schema = new Schema<IAdverseVehicle2>({
  propertyDamagePaid: Boolean,
  hasCollisionCoverage: Boolean,
  obtainedRental: Boolean,
  settlementOfferMade: Boolean,
  signedRelease: Boolean,
  repairStatus: String,
  repairCost: String,
  offerAmount: Number,
}, { _id: false });

const HealthInsuranceSchema = new Schema<IHealthInsurance>({
  hasHealthInsurance: Boolean,
  healthInsuranceCarrier: String,
  groupNumber: String,
  contactPerson: String,
  contactNumber: String,
  hasMedicareOrMedicaid: Boolean,
  billsFiled: Boolean,
}, { _id: false });

const WorkerCompSchema = new Schema<IWorkerComp>({
  hasWorkersComp: Boolean,
  claimNumber: String,
  adjusterName: String,
  adjusterPhoneNumber: String,
  IsclaimField: Boolean,
}, { _id: false });

const PreviousAttorneySchema = new Schema<IPreviosAttorney>({
  attorneyName: String,
  attorneyPhoneNumber: String,
  attorneyEmail: String,
}, { _id: false });

const WorkSchema = new Schema<IWork>({
  work_location: String,
  missWorkedForAccident: Boolean,
  missedTime: Boolean,
  sallery: { type: String, enum: ['hourly', 'salary'] },
  jobInjuries: Boolean,
  compClaimFixed: Boolean,
  result: String,
}, { _id: false });

const PersonalHistorySchema = new Schema<IPersonalHistory>({
  piClaims: String,
  civilCaseHistory: Boolean,
  soWhat: String,
  when: Date,
  where: String,
  criminalCaseHistory: Boolean,
  soWhatCriminal: String,
  whenCriminal: Date,
  bankruptcy: Boolean,
  whenBankruptcy: Date,
}, { _id: false });

const InjurySchema = new Schema<IInjury>({
  howDailyLife: String,
  limitedAnyWay: String,
  anyThingElse: String,
}, { _id: false });

const PersonalInformationSchema = new Schema<IPersonalInformation>({
  address: String,
  residantLength: Number,
  alternativePhone: String,
  alternativeEmail: String,
  socialSecurityNumber: String,
  dateOfBirth: Date,
  maritalStatus: String,
  name: String,
}, { _id: false });

const IntakeSchema = new Schema<IIntake>({
  type: { type: String, enum: ['case', 'contact'], required: true },
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  case: { type: Schema.Types.ObjectId, ref: 'Case' },
  accidentInformation: AccidentalInformationSchema,
  medicalTreatment1: MedicalTreatment1Schema,
  medicalTreatment2: MedicalTreatment2Schema,
  medicalTreatment3: MedicalTreatment3Schema,
  vehicleInformation: VehicleInformationSchema,
  insuranceInformation: InsuranceInformationSchema,
  adverseVehicle1: AdverseVehicle1Schema,
  adverseVehicle2: AdverseVehicle2Schema,
  healthInsurance: HealthInsuranceSchema,
  workerComp: WorkerCompSchema,
  previosAttorney: PreviousAttorneySchema,
  work: WorkSchema,
  personalHistory: PersonalHistorySchema,
  injury: InjurySchema,
  personalInformation: PersonalInformationSchema,
}, { timestamps: true });

export const Intake= model<IIntake,IntakeModel>('Intake', IntakeSchema);
