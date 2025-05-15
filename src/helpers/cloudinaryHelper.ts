import cloudinary from 'cloudinary';
import config from '../config';
import path from 'path';
import { unlinkSync } from 'fs';
import { Case } from '../app/modules/case/case.model';
export const uploader = cloudinary.v2;
uploader.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
})


const uploadFile = async (filePath:string)=>{
    const extName = path.extname(filePath);
    let fileType = ''
    if(['.png','.jpg','.webp','.gif'].includes(extName)){
        fileType='image'
    }else if(['.mp4','.mov','.avi','wmv'].includes(extName)){
        fileType='video'
    }
    else if(['.pdf','.docx','.xlsx'].includes(extName)){
        fileType='document'
    }
    const data = await uploader.uploader.upload(filePath,{folder:`${fileType}`})

    unlinkSync(filePath)
    
    return {
        url:data.url,
        public_id:data.public_id
    }
}

const caseUploadFile = async (filePath:string,caseId:any)=>{
 
        const caseData = await Case.findById(caseId)
        let folderName = caseData?.folder_name
        if(!caseData || !caseData.folder_name){
            folderName = 'unknown-case'
        }
        const extName = path.extname(filePath);
        let fileType = ''
        if(['.png','.jpg','.webp','.gif'].includes(extName)){
            fileType='image'
        }else if(['.mp4','.mov','.avi','wmv'].includes(extName)){
            fileType='video'
        }
        else if(['.pdf','.docx','.xlsx'].includes(extName)){
            fileType='document'
        }
        else{
            fileType = 'unknown'
        }
        const data = await uploader.uploader.upload(filePath,{folder:`cases/${folderName?.toLowerCase()?.split(" ").join('-')}/${fileType}`,resource_type:"auto"})
        unlinkSync(filePath)
      
        return {
            url:data.url,
            public_id:data.public_id
        }
  
}


export const deleteFile = async(public_id:string) => {
    return await uploader.uploader.destroy(public_id)
}

export const cloudinaryHelper = {
    uploadFile,
    deleteFile,
    caseUploadFile
}