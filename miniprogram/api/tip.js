import {router} from "./request"

export const createTip =  (data)=>{
  return router("/tip/create",data);
}

export const getTip =  (pageNo,pageSize)=>{
  return router("/tip/get",{pageNo,pageSize});
}

export const countTip =  ()=>{
  return router("/tip/count");
}