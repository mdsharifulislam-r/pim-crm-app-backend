import mongoose from "mongoose";
import { CaseModel, ICase } from "./case.interface";
import { CASE_LOCATION, MATTER_STAGE, PRACTICE_AREA } from "../../../enums/case";

const caseSchema = new mongoose.Schema<ICase,CaseModel>({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['open', 'closed'], required: true },
  responsible_attorney: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  origianing_attorney: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client_refference_number: { type: String },
  location: { type: String, enum: Object.values(CASE_LOCATION), required: true },
  practice_area: { type: String, enum: Object.values(PRACTICE_AREA), required: true },
  matter_stage: { type: String, enum: Object.values(MATTER_STAGE), required: false, default: MATTER_STAGE.INTAKE },
  matter_type: { type: String, enum: ['open', 'closed'], required: true },
  open_date: { type: Date, required: true },
  close_date: { type: Date },
  pending_date: { type: Date },
  limitaion_date: { type: Date },
  matter_permission: { type: String, enum: ['everyone', 'group'], required: true },
  group_user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  matter_notification_user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  block_user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  realeted_contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  realeted_contact_relation: { type: String },
  bill: { type: String, enum: ['recipient', 'other'], required: true },
  custom_fields: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  billing_method: { type: String, enum: ['hourly', 'contingency'], required: true },
  balance_notification: { type: Boolean, default: false },
  recipient: { type: String },
  billing_rate: { type: Number },
  deduct_expenses_first: { type: Boolean, default: false },
  task_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  folder_name: { type: String, required: true },
  folder_category: { type: String, required: true },
  originating_attorney_allocation: { type: Number, required: true },
  responsible_attorney_allocation: { type: Number, required: true },
  use_firm_settings: { type: Boolean, default: false },
  authorizer:{ type: mongoose.Schema.Types.ObjectId, ref: 'User',required:false},
  providers:[{type:String}]
},{
    timestamps:true
}
)

export const Case = mongoose.model<ICase, CaseModel>('Case', caseSchema);