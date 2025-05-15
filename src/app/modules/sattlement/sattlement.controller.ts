import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SattlementService } from "./sattlement.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createRecovery = catchAsync(async (req: Request, res: Response) => {
    const user  = req.user;
  const recovery = await SattlementService.createRecoverytoDB({ ...req.body },user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Recovery created successfully",
    data: recovery,
  });
});

const createLegalFee = catchAsync(async (req: Request, res: Response) => {
    const user  = req.user;
  const legalFee = await SattlementService.createLegalFeeToDB({ ...req.body },user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Legal fee created successfully",
    data: legalFee,
  });
});
const updateRecovery = catchAsync(async (req: Request, res: Response) => {
  const recovery = await SattlementService.updateRecoveryToDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Recovery updated successfully",
    data: recovery,
  });
});
const updateLegalFee = catchAsync(async (req: Request, res: Response) => {
  const legalFee = await SattlementService.updateLegalFeeToDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Legal fee updated successfully",
    data: legalFee,
  });
});
const deleteRecovery = catchAsync(async (req: Request, res: Response) => {
  const recovery = await SattlementService.deleteRecoveryToDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Recovery deleted successfully",
    data: recovery,
  });
});
const deleteLegalFee = catchAsync(async (req: Request, res: Response) => {
  const legalFee = await SattlementService.deleteLegalFeeToDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Legal fee deleted successfully",
    data: legalFee,
  });
});

const getAllRecoverys = catchAsync(async (req: Request, res: Response) => {
  const recovery = await SattlementService.getALlRecoverys(req.query.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Recovery retrieved successfully",
    data: recovery,
  });
});

const getAllLegalFees = catchAsync(async (req: Request, res: Response) => {
  const legalFee = await SattlementService.getAllLegalFees(req.query.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Legal fee retrieved successfully",
    data: legalFee,
  });
});

const getTotalExpensesAndMedicalBills = catchAsync(async (req: Request, res: Response) => {
    const result = await SattlementService.getTotalExpensesAndMedicalBills(req.query.id as string);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Total expenses and medical bills retrieved successfully",
        data: result,
    });
})

const overview = catchAsync(async (req: Request, res: Response) => {
  const result = await SattlementService.getOverViewAll(req.query.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Overview retrieved successfully",
    data: result,
  });
});

export const SattlementController = {
  createRecovery,
  createLegalFee,
  updateRecovery,
  updateLegalFee,
  deleteRecovery,
  deleteLegalFee,
  getAllRecoverys,
  getAllLegalFees,
  getTotalExpensesAndMedicalBills,
  overview,
};
