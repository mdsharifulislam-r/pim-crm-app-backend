import { Types } from "mongoose";
import { Case } from "../app/modules/case/case.model";
import ApiError from "../errors/ApiErrors";

export async function caseAuthorized(caseId: Types.ObjectId, userId: any) {
  const caseData = await Case.findById(caseId);
  if (!caseData) throw new ApiError(404, "Case not found");
  if (caseData.matter_permission == "everyone") {
    return true;
  }
  if (caseData.group_user?.includes(userId)) {
    return true;
  } else {
    throw new ApiError(403, "You are not authorized to access this case");
  }
}
