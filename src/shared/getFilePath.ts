type IFolderName = 'image' | 'media' | 'doc';

//single file
export const getSingleFilePath = (files: any,fileName?:string) => {
    const fileField = files && files[fileName||'file'];
    if (fileField && Array.isArray(fileField) && fileField.length > 0) {
        return fileField[0].path
    }

    return undefined;
};

//multiple files
export const getMultipleFilesPath = (files: any, folderName?: IFolderName) => {
    const folderFiles = files && files[folderName||"file"];
    if (folderFiles) {
        if (Array.isArray(folderFiles)) {
            return folderFiles.map((file: any) => file.path);
        }
    }

    return undefined;
};