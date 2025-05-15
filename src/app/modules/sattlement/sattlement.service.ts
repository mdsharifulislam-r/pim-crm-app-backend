import { JwtPayload } from "jsonwebtoken";
import { Expense } from "../documents/expenses/expense.model";
import { MedicalBill } from "../documents/providers/medical_bill/medical_bill.model";
import { ILegalFee } from "./legal_fee/legalfee.interface";
import { LegalFee } from "./legal_fee/legalfee.model";
import { IRecovery } from "./recovery/recovery.interface";
import { Recovery } from "./recovery/recovery.model";
import { caseAuthorized } from "../../../util/caseAuthorized";

const createRecoverytoDB = async (payload: IRecovery,user:JwtPayload): Promise<IRecovery | null> => {
    await caseAuthorized(payload.case,user.id);
    const result = await Recovery.create(payload);
    return result;
};

const createLegalFeeToDB = async (payload: ILegalFee,user:JwtPayload): Promise<ILegalFee | null> => {
    await caseAuthorized(payload.case,user.id);
    const result = await LegalFee.create(payload);
    return result;
};

const updateRecoveryToDB = async (id: string, payload: Partial<IRecovery>): Promise<IRecovery | null> => {
    const result = await Recovery.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
const updateLegalFeeToDB = async (id: string, payload: Partial<ILegalFee>): Promise<ILegalFee | null> => {
    const result = await LegalFee.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
const deleteRecoveryToDB = async (id: string): Promise<IRecovery | null> => {
    const result = await Recovery.findByIdAndDelete(id);
    return result;
};
const deleteLegalFeeToDB = async (id: string): Promise<ILegalFee | null> => {
    const result = await LegalFee.findByIdAndDelete(id);
    return result;
};

const getALlRecoverys = async (caseId:string) => {
    const recovery = await Recovery.find({case:caseId}).populate('source','name').lean()
    let totalRecovery = {source:{
        name:"total",
    },amount:0}
    recovery.forEach((item)=>{
        totalRecovery.amount += item.amount
    })

    recovery.push(totalRecovery as any)

    return recovery

};

const getAllLegalFees = async (caseId:string) => {
    const legalFee = await LegalFee.find({case:caseId}).populate('reciept','firstName lastName').lean()
    let totalLegalFee = {reciept:{
        firstName:"total",
        lastName:"",
    },total_amount:0,discount:0,net_amount:0}
    const newData = legalFee.map((item)=>{
        const totalAmount = item.orginal_amount+(item.orginal_amount*(item.rate/100))-item.discount
        totalLegalFee.total_amount += item.orginal_amount
        totalLegalFee.discount += item.discount
        totalLegalFee.net_amount += totalAmount
        return {
            ...item,
            net_amount:totalAmount
        }
    })

    newData.push(totalLegalFee as any)
    return newData
}

const getTotalExpensesAndMedicalBills = async (caseId:string) => {
    const expenses = await Expense.find({case:caseId},{type:1,amount:1}).lean()
    const medicalBill = await MedicalBill.find({case:caseId,fileType:"bill"},{authorizer:1,owed_amount:1,bill_amount:1,adjustment_amount:1}).populate('authorizer',"firstName lastName").lean()

    
    let totalExpenses = {
        type:"total",
        amount:0
    }

    let totalMedicalBill = {
        authorizer:{
            firstName:"total",
            lastName:"",
        },
        bill_amount:0,
        adjustment_amount:0,
        owed_amount:0,
        net_amount:0
    }

    expenses.map((item)=>{
        totalExpenses.amount += item.amount
    })
    expenses.push(totalExpenses as any)

   const modifiedData= medicalBill.map((item)=>{
        totalMedicalBill.bill_amount += item?.bill_amount!
        totalMedicalBill.owed_amount += item.owed_amount!
        totalMedicalBill.adjustment_amount += item.adjustment_amount!
        totalMedicalBill.net_amount += item.bill_amount! - item.adjustment_amount!

        return {
            ...item,
            net_amount:item.bill_amount! - item.adjustment_amount!
        }
    })
    modifiedData.push(totalMedicalBill as any)

    return {
        expenses,
        medicalBill:modifiedData
    }
}

const getOverViewAll = async (caseId:string) => {
    const totalRecovery = (await getALlRecoverys(caseId)).pop()
    const totalLegalFee = (await getAllLegalFees(caseId)).pop()
    const expenses = (await getTotalExpensesAndMedicalBills(caseId)).expenses.pop()
    const medicalBill = (await getTotalExpensesAndMedicalBills(caseId)).medicalBill.pop()

    const totalClientSuspensetion = totalLegalFee?.net_amount! + medicalBill?.net_amount!+ expenses?.amount!+totalRecovery?.amount!

    return {
        totalRecovery,
        totalLegalFee,
        expenses,
        medicalBill,
        totalClientSuspensetion
    }

}
export const SattlementService = {
    createRecoverytoDB,
    createLegalFeeToDB,
    updateRecoveryToDB,
    updateLegalFeeToDB,
    deleteRecoveryToDB,
    deleteLegalFeeToDB,
    getALlRecoverys,
    getAllLegalFees,
    getTotalExpensesAndMedicalBills,
    getOverViewAll
}

