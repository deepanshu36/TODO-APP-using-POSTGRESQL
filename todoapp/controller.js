const pool=require('./db')

const {query, querybyid,checktasks,addingtasks,deleteusertasks,updatestud,signup,findemail,checkuser,getpassword, deletetasks, updatetasks}=require('./queries')

const router=require("express").Router();

const {check,validationResult}=require("express-validator");

// const {data}=require("../data");np

const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken')

// const gettasks=(req,res)=>
// {
   
//     pool.query( query,(err,results)=>{
//         if(err)throw err;
//         res.status(200).send(results.rows)
//     })

// }

const gettasksbyid=(req,res)=>
{
    const id=parseInt(req.params.id);
    pool.query(querybyid,[id],(err,results)=>
    {
        if(err)throw err;
        res.status(200).send(results.rows)

    })


}




const addtask=(req,res)=>
{
  const {userid,tasks,start_date,end_date,status,priority}=req.body

    pool.query(checktasks,[userid,tasks],(err,results)=>
    {
        if(results.rows.length)
        {
          return res.send('this task is allready created by you');

        }
        else
        pool.query(addingtasks,[userid,tasks,start_date,end_date,status,priority],(err,results)=>{
            if(err)
            throw err;
            res.json('user added');
         })
    })  

}


const deletetask=(req,res)=>
{
  const {userid,tasks}=req.body;

//   console.log(userid,tasks);


pool.query('select * from tasks where userid=$1',userid,(err,res)=>{
    if(err)
    throw err;
    if(!res.rows)
    {
        return res.send('tasks does not exist');
    }
    
})

      pool.query('delete from tasks where userid=$1 and tasks=$2',[userid,tasks],(err,response)=>
      {
           if(err)
             throw err;

             if(!response.rows.length)
             {
                 return res.status(400).send('task does not exist'); 
             }
             else
             res.status(200).send('tasks deleted');

      })
     
}

const updatetask=(req,res)=>
{
const {userid,tasks}=req.body;

pool.query('select * from tasks where userid=$1',userid,(err,res)=>{
    if(err)
    throw err;
    if(!res.rows)
    {
        return res.send('userid tasks does not exist');
    }

})

pool.query(updatetasks,[userid,tasks] ,(err,response)=>
  {      
     if(err)
     throw err
     res.status(200).send('user updated');

 })
 
}



const signupuser=async(req,res)=>
{
  const {id,email,password,dob,name}=req.body

  pool.query('select * from users where email=$1',[email],(err,results)=>{
   
    if(err)
    throw err;

     if(results.rows.length)
     {
        return res.send('username allready exists');
     }

  })

const hash=await bcrypt.hash(password,10)

pool.query(signup,[id,email,hash,dob,name],(err,results)=>
{
        if(err)
        throw err;      

        const token=jwt.sign( {email}  ,"askca12mc12e3m3412321n42",{
            expiresIn:3600000
         })
          res.json(token)

})

}


const loginuser=async(req,res)=>
{
    const {email,password}=req.body;

    try
    {
        const count=await pool.query(findemail,[email]);
        const userid=count.rows[0].id;

        if(count.rowCount===0) 
        res.send('not found') ;
        else
        {
             if(await bcrypt.compare(password,results.rows[0].password))
             {
                


             }
             else
             {
                res.send('incorrect password');

             }

        } 


    }

    catch(err)
    {   
        res.status(400);

        res.send('user not found')

    }

res.send();



//     await pool.query(findemail,[email],(err,results)=>
//     {
//         // console.log(results.rows.length);

//       if(err)
//       throw err
//       console.log(results.rows[0].password);


//   const details= await pool.query('select id from users where email=$1',[email]);   

//       console.log(details);


//       if(results.rows.length)
//       {
//            await bcrypt.compare(password,results.rows[0].password,(err,result)=>{

//             if(err)
//             throw(err);

//             // console.log(result);
            
//             if(!result)
//             {
//               return res.send('wrong password');

//             }

//             const token= jwt.sign( {email}  ,"askca12mc12e3m3412321n42",{
//                 expiresIn:3600000
//              })

//           return res.json(token)

//            });

//      }

//      else
//            return  res.send('user not found');

//     })



}



const filter=(req,res)=>
{

const {userid}=req.body;

pool.query('select * from tasks where userid=$1 and status=$2 ',[userid,'completed'],(err,results)=>{
           
    if(err)
   throw err;

   res.send(results.rows); 

})

}


module.exports={gettasksbyid,addtask,deletetask ,updatetask,signupuser,loginuser,filter}
