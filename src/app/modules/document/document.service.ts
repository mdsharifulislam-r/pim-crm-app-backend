import { JwtPayload } from "jsonwebtoken";
import { ACTIVITY_STATUS } from "../../../enums/activity";
import { USER_ROLES } from "../../../enums/user";
import { createActivity } from "../../../helpers/activityHelper";
import { cloudinaryHelper } from "../../../helpers/cloudinaryHelper";
import { dateHelper } from "../../../helpers/dateHelper";
import { caseNotification } from "../../../helpers/notifacationHelper";
import { paginationHelper } from "../../../helpers/paginationHelper";
import QueryBuilder from "../../query/QueryBuilder";
import { Case } from "../case/case.model";
import { Client } from "../contacts/contact.model";
import { User } from "../user/user.model";
import { IDocument } from "./document.interface";
import { Document } from "./document.model";

const createDocument = async (data:IDocument,files:string[]) => {
    const assignedByMember:any = await User.findById(data.assignedBy)
    if(!assignedByMember || ![USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS].includes(assignedByMember?.role)){
        throw new Error("You are not allowed to assign this task")
    }
    const uploadedFiles = await Promise.all(files?.map(async file=>{
        const items = await cloudinaryHelper.uploadFile(file);
        return items
    }))
    data.files=uploadedFiles as any
    const document = await Document.create(data)
    const caseData = await Case.findById(data.case_name)
    const client = await Client.findById(data.client)
    const authorizer = await User.findById(data.authorizer)

    //notification
    await caseNotification({
        title:`New Document Assigned on ${client?.name}s case`,
        text:`${authorizer?.firstName} ${authorizer?.lastName} add new a document`,
        link:`document`,
        type:"group",
    },data.case_name as any)


    //activity
    await createActivity({
        title:"Document Assigned",
        status:ACTIVITY_STATUS.SUCCESS,
        todos:[
            {
                title:`New Document Assigned on ${client?.name}s case`,
                status:ACTIVITY_STATUS.SUCCESS,
            },
            {
                title:`Assigned By ${assignedByMember?.firstName} ${assignedByMember?.lastName}`,
                status:ACTIVITY_STATUS.INFO,
            },
            {
                title:`Assigned To ${data.assignedTo}`,
                status:ACTIVITY_STATUS.INFO,
            }
        ],
        user:data.authorizer
    })
    return document
}

const getDocuments = async (query:Record<string,any>) => {
    const result = new QueryBuilder(Document.find({status:{$ne:'deleted'}}),query).sort()
    const documents = await result.modelQuery.populate([
        {
            path:'client',
            select:"name email phone"
        },
        {
            path:'authorizer',
            select:"firstName lastName"
        },
        {
            path:'assignedBy',
            select:"firstName lastName"
        },
        {
            path:'assignedTo',
            select:"firstName lastName"
        }
    ]).lean()
    const filterDocuments = documents.filter((doc:any)=>{
        const search = query?.searchTerm?.toLowerCase();
        const clientName = doc.client?.name?.toLowerCase();
        const assignedByName = doc.assignedBy?.firstName.toLowerCase()+" "+doc.assignedBy?.lastName?.toLowerCase();
        const assignedToName = doc.assignedTo?.firstName?.toLowerCase()+" "+doc.assignedTo?.lastName?.toLowerCase();
                
        return (!search || (
            doc.name.toLowerCase().includes(search) ||
            doc.category.includes(search) ||
            clientName.includes(search)||
            assignedByName.includes(search)||
            assignedToName.includes(search)
        )) && (
            (!query.category || doc.category === query.category) &&
            (!query.client || query.client.toString()===doc.client._id.toString()) 
        ) && (
            !query.dateFormat || (
                ( (query.dateFormat == 'today') && dateHelper.dateCompare(doc.createdAt,0)) ||
                ((query.dateFormat == 'week')) && dateHelper.dateCompare(doc.createdAt,7)) ||
                ((query.dateFormat == 'month') && dateHelper.dateCompare(doc.createdAt,31)) ||
                ((query.dateFormat == 'year') && dateHelper.dateCompare(doc.createdAt,365)
            )
        )
    })

    const paginationResult = paginationHelper.paginateArray(filterDocuments,query)
    return {
        data:paginationResult.data,
        pagination:paginationResult.pagination
    }
}

const deleteDocumentFromDB = async(id:string,user:JwtPayload) => {
    const updated = await Document.findByIdAndUpdate(
        id,
        { status:'deleted'}
    )
    if(!updated){
        throw new Error("Document not found")
    }
    updated.files.forEach(async (file:any)=>{
        await cloudinaryHelper.deleteFile(file.public_id)
    })
    const userData = await User.findById(user.id)
    await createActivity({
        title:"Document Deleted",
        status:ACTIVITY_STATUS.ERROR,
        todos:[
            {
                title:`Document Deleted by ${userData?.firstName} ${userData?.lastName}`,
                status:ACTIVITY_STATUS.ERROR,
            },
        ],
        user:user.id
    })
    return updated;
}

const getSingleDocumentFromDB = async (id:string)=>{
    const document = Document.findOne({_id:id,status:{$ne:'deleted'}}).populate([
        {
            path:'client',
            select:"name email phone"
        },
        {
            path:'authorizer',
            select:"firstName lastName"
        },
        {
            path:'assignedBy',
            select:"firstName lastName"
        },
        {
            path:'assignedTo',
            select:"firstName lastName"
        }
    ])
    return document;
}

export const DocumentService={
createDocument,
getDocuments,
deleteDocumentFromDB,
getSingleDocumentFromDB
}