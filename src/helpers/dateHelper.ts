const dateCompare = (date:any,delta:number)=>{
const date1:any = new Date();
const date2:any = new Date(date);

const diffTime = Math.abs(date2 - date1); // in milliseconds
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

return delta >0? diffDays <= delta: diffDays===delta;
}

export const dateHelper={
    dateCompare,
}