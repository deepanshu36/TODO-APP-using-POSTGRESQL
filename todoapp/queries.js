const query='select * from tasks';

const querybyid='select userid,tasks,start_date,end_date,status,priority from tasks where userid=$1 ';

const checktasks='select * from tasks where userid=$1 and tasks=$2';

const addingtasks='insert into tasks (userid,tasks,start_date,end_date,status,priority) values ($1,$2,$3,$4,$5,$6)';

const deleteusertasks='delete from tasks where userid=$1 and task=$2';

const updatetasks='update tasks set tasks=$2 where userid=$1';


/////data queries

const signup='insert into users (id,email,password,dob,name) values ($1,$2,$3,$4,$5)';

const findemail='select * from users where email=$1';

/////////

const checkuser='select * from data where email=$1 and password=$2';

const getpassword='select password from data where email=$1';


// const addqueries='insert into person (name,email,country) values ($ishaan,$india,$india@gmail.com)'

module.exports={query,querybyid,checktasks,addingtasks,deleteusertasks,updatetasks,signup,findemail,checkuser,getpassword};
