import { isValidObjectId, ObjectId } from "mongoose";
import { INotification } from "../app/modules/notification/notification.interface";
import { Notification } from "../app/modules/notification/notification.model";
import { Case } from "../app/modules/case/case.model";
import { User } from "../app/modules/user/user.model";

export const sendNotifations =async (data:INotification,users?:any[])=>{
    data.receivers =users?.length? users?.map(user=>isValidObjectId(user)?user.toString():user):(await User.find()).map(user=>user._id.toString())
    const notification = await Notification.create(data)
    //@ts-ignore
    const io = global.io

    data?.receivers?.forEach(user=>{
        io.emit(`getNotification::${user}`,notification)
    })
}


export const caseNotification = async (data:INotification,caseId:ObjectId)=>{
    const caseData = await Case.findById(caseId)

    if(caseData?.matter_permission=="everyone"){
        const users = (await User.find({},{_id:1}))?.map(user=>user._id.toString())
        await sendNotifations(data,users)
        return
    }
    
    const all_user = caseData?.group_user

    const authoRizeUsers = all_user?.filter(user=>!caseData?.block_user?.includes(user))

    await sendNotifations(data,authoRizeUsers!)

}