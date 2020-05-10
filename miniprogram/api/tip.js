import {router} from "./request"

export const createTip =  (data)=>{
  return router("/tip/create",data);
}