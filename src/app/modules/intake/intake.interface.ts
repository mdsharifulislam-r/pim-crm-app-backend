import { Model, Types } from "mongoose";

export interface IAccidentalInformation {
    accidentDate?: string;
    location?: string;
    driver?: string;
    anyPassengers?: boolean;
    occurOnJob?: boolean;
    accidentDescription?: string;
    pointOfImpact?: string;
    contributingFactors?: string;
    anythingAvoidAccident?: string;
    pictureOrVideo?: boolean;
    anyWitness?: boolean;
    policeArrived?: boolean;
    citationsGiven?: boolean;
}

export interface IMedicalTreatment1 {
    gender?: string;
    photosOfInjuries?: boolean;
    erProcedure?: boolean;
    prescription?: boolean;
    receivedTreatment?: boolean;
    treatmentDate?: Date;
    treatmentLocation?: string;
    medicinePrescription?: boolean;
    recommendedTreatment?: string;
}

export interface IMedicalTreatment2 {
    hadPreviousInjuries?: boolean;
    previousInjuriesDescription?: string;
    previousInjuriesDate?: Date;
    treatmentKind?: string;
    similarInjuries?: string;
    preExistingConditions?: boolean;
    doctorName?: string;
    doctorOfficeLocation?: string;
    medications?: string;
}



export interface IVehicleInformation1 {
    vehicleYear?: string;
    vehicleMake?: string;
    vehicleModel?: string;
    vehicleColor?: string;
    ownerName?: string;
    ownerLiveWithYou?: boolean;
    otherVehicle?: boolean;
    relativeOwnAVehicle?: boolean;
    vehicleOnStorage?: boolean;
    licensePlateNumber?: string;
}

export interface IInsuranceInformation {
    insuredParty?: string;
    policyNumber?: string;
    claimNumber?: string;
    reportedToCarrier?: boolean;
    gaveStatementToAdjuster?: boolean;
    coverageTypes?: string[];
    hasUM?: boolean;
    hasCollision?: boolean;
    hasMedpay?: boolean;
    hasOutOfStatePIP?: boolean;
}

export interface IAdverseVehicle1 {
    numberOfVehiclesInvolved?: number;
    make?: string;
    model?: string;
    color?: string;
    licensePlateNumber?: string;
    adverseInsurance?: string;
    adversePolicyNumber?: string;
    spokenToAdverseInsurance?: boolean;
    adverseClaimNumber?: string;
    madeRecordedStatement?: boolean;
    adjusterName?: string;
    adjusterPhoneNumber?: string;
}

export interface IAdverseVehicle2 {
    propertyDamagePaid?: boolean;
    hasCollisionCoverage?: boolean;
    obtainedRental?: boolean;
    settlementOfferMade?: boolean;
    signedRelease?: boolean;
    repairStatus?: string;
    repairCost?: string;
    offerAmount?: number;
}

export interface IMedicalTreatment3 {
    hasPrimaryCareDoctor?: boolean;
    primaryCareDoctor?: string;
    lastVisitDate?: Date;
    reasonForVisit?: string;
    prescribedMedications?: string;
}

export interface IHealthInsurance {
    hasHealthInsurance?: boolean;
    healthInsuranceCarrier?: string;
    groupNumber?: string;
    contactPerson?: string;
    contactNumber?: string;
    hasMedicareOrMedicaid?: boolean;
    billsFiled?: boolean;
}

export interface IWorkerComp{
    hasWorkersComp?: boolean;
    IsclaimField?: boolean;
    claimNumber?: string;
    adjusterName?: string;
    adjusterPhoneNumber?: string;

}

export interface IPreviosAttorney {
    attorneyName?: string;
    attorneyPhoneNumber?: string;
    attorneyEmail?: string;
}

export interface IWork{
    work_location?: string;
    missWorkedForAccident?: boolean;
    missedTime?: boolean;
    sallery?:"hourly"|"salary";
    jobInjuries?: boolean;
    compClaimFixed?: boolean;
    result?:string;
}

export interface IPersonalHistory{
    piClaims?:string;
    civilCaseHistory?:boolean;
    soWhat?:string;
    when?:Date;
    where?:string;
    criminalCaseHistory?:boolean;
    soWhatCriminal?:string;
    whenCriminal?:Date;
    bankruptcy?:boolean;
    whenBankruptcy?:Date;
}

export interface IInjury{
    howDailyLife?:string;
    limitedAnyWay ?:string;
    anyThingElse?:string;

}

export interface IPersonalInformation{
    address?:string;
    residantLength?:number;
    alternativePhone?:string;
    alternativeEmail?:string;
    socialSecurityNumber?:string;
    dateOfBirth?:Date;
    maritalStatus?:string
    name?:string;
}
export type IIntake = {
    type: "case" | "contact";
    client: Types.ObjectId;
    case?: Types.ObjectId;
    accidentInformation?: IAccidentalInformation;
    medicalTreatment1?: IMedicalTreatment1;
    medicalTreatment2?: IMedicalTreatment2;
    medicalTreatment3?: IMedicalTreatment3;
    vehicleInformation?: IVehicleInformation1;
    insuranceInformation?: IInsuranceInformation;
    adverseVehicle1?: IAdverseVehicle1;
    adverseVehicle2?: IAdverseVehicle2;
    healthInsurance?: IHealthInsurance;
    workerComp?: IWorkerComp;
    previosAttorney?: IPreviosAttorney;
    work?: IWork;
    personalHistory?: IPersonalHistory;
    injury?: IInjury;
    personalInformation?: IPersonalInformation;
};

export type IntakeModel = Model<IIntake, Record<string, unknown>>;