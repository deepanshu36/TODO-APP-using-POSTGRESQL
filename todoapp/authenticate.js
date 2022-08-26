const  JWT  = require("jsonwebtoken");

module.exports.checkAuth=async(req,res,next)=>
{
    const token=req.header('key');

    if(!token)
    {

       res.status(400).json([{
         error:"no token found"
       }])

    }
     
    try
    {
        
    let user=await JWT.verify(token,"askca12mc12e3m3412321n42")
        next()
        

    }
    catch{
        res.status(400).json([{
            error:"unathorised user"

          }])
    }

}