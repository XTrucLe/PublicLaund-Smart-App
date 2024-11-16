import callAPI from "@/hooks/useCallAPI"
import { handleError } from "./ErrorExeption"

export  const personInfor={  
    owner: "Bagus Yuliono",  
    wallet_type: "Cá nhân",  
    balance: "500,376,200.00",  
    account_number: "9000032**171236",  
    created_date: "01 tháng 10 năm 2017",  
    updated_date: "08 tháng 10 năm 2017",  
    transactions: [  
      {  
        date: "01 tháng 10 năm 2017",  
        description: "Chi chuyển khoản cá nhân",  
        amount: "-1,500,000.00"  
      },  
      {  
        date: "01 tháng 10 năm 2017",  
        description: "Chi chuyển khoản cá nhân",  
        amount: "-300,000.00"  
      }  
    ],  
    
  }

const getWalletInfor=async ()=>{
  try {
    return await callAPI("",{},"GET")
  } catch (error) {
    handleError(error,"fail")
    return []
  }
}

const getTopUpQR=async()=>{
  try {
    return await callAPI("",{},"GET")
  } catch (error) {
    
  }
}

export {getWalletInfor}