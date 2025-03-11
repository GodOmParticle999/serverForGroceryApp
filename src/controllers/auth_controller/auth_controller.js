import {Customer,DeliveryPartner} from "../../models/modelModule.js"
import jwt from "jsonwebtoken"

const generateTokens = async (user) => {
    const accessToken = jwt.sign({id:user._id,role:user.role},process.env.ACCESS_TOKEN_SECRET ,{expiresIn:"1d"})
    const refreshToken = jwt.sign({id:user._id,role:user.role},process.env.REFRESH_TOKEN_SECRET ,{expiresIn:"7d"})
    return {accessToken,refreshToken}
}

// customer login

export const customerLogin = async (req,reply) => {
    try {
      const {phone} = req.body
      if(!phone){
          return reply.status(400).json({message:"Please fill all the fields"})
      }
    let customer = await Customer.findOne({phone})
    if(!customer){
       customer=new Customer({
         phone,
         role:"Customer",
         isActivated:true
       })
       await customer.save()
    }
    const {accessToken,refreshToken} = await generateTokens(customer)
    return reply.status(200).json({message:"Login successful",accessToken,refreshToken,customer})
  } catch (error) {
   return reply.status(501).send({
message:"An error occurred",error
   })
  }
  
}