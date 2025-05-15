import { IIntake } from "./intake.interface";
import { Intake } from "./intake.model";

const createIntakeWithId = async (payload: IIntake) => {
    const isExist = await Intake.findOne({ client: payload.client });
    
    if (isExist && !payload.case) {
       const data= await Intake.findByIdAndUpdate(isExist._id, payload,{ new: true });
        return data;
    }
    if ((payload.client && payload.case) && !isExist) {
        const data= await Intake.findOneAndUpdate({client:payload.client,case:payload.case}, payload,{ new: true });
        return data;
    }
    const result = await Intake.create(payload);
  return result;
};

const getIntakes = async (client: string,caseId?:string) => {
    const result = await Intake.findOne({case: caseId }).populate('client case');
    if(!result){
        const result2 = await Intake.findOne({ client }).populate('client');
        return result2;
    }
  return result;
}

export const IntakeService = {
    createIntakeWithId,
    getIntakes,
};
