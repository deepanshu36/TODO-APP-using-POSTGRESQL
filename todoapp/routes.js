const {Router}=require('express');
const { resourceLimits } = require('worker_threads');
const {checkAuth}=require('./authenticate')

const router=Router()

const {signupuser,loginuser, gettasks, gettasksbyid, addtask, deletetask, updatetask,filter}=require('./controller')

// router.get('/tasks',checkAuth,gettasks);

router.get('/tasks/:id',checkAuth,gettasksbyid);

router.post('/tasks/addtasks',checkAuth,addtask);

router.delete('/tasks/delete',checkAuth,deletetask);

router.put('/tasks/update',checkAuth,updatetask);

// ////////////////////////////////////////

router.post('/signup',signupuser);
router.post('/login',loginuser);
router.get('/filter',filter);

module.exports=router;




