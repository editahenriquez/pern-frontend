import { useEffect } from 'react'
import { useTasks } from '../context/TaskProvider'
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const {tasks, getTasks} = useTasks();
  const {toggleTasks, deleteTasks, openDialog} = useTasks();
  const navigate = useNavigate();

  const handleToggleTasks = async (task) => {
    try {
      await toggleTasks(task.id,{done:task.done === false ? true : false});
    }catch(err) {
      console.log(`Error updating tasks: ${err}`);
      alert(err);
    }
  };
  
  const handleDeleteTasks = async (task) => {
    try {
      const userChoice = await openDialog('confirmation', 'Confirmation', 'Are you sure to delete?');
      if (!userChoice) {
        return;
      }
    }catch(err){
      console.log(`Error deleting tasks: ${err}`);
      alert(err);
    }
    
    try {
      await deleteTasks(task.id);
    }catch(err) {
      console.log(`Error deleting tasks: ${err}`);
      alert(err);
    }
  };


  const handlegetTasks = async () => {
    try {
      await getTasks();
    }catch(err) {
      console.log(`Error fetching tasks: ${err}`);
      alert(err);
    }
  };

const dateFormat = (task) => {
  const dateObject = new Date(task.createdat);
  const fullDateTime  = dateObject.toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  return fullDateTime;
};

  useEffect(() => {
    handlegetTasks();
  }, [])

  return (
    <>
      {tasks.length === 0 
      ? (<h1 className='text-4xl text-white font-bold text-center'>No tasks yet</h1>)
      : (
        <>
         <h1 className='text-4xl text-white font-bold text-center'>Tasks</h1>
         <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
            {tasks.map((task)=>
            <Card
            key={task.id}
            style={{marginBottom:'.5rem', backgroundColor:'#1e272e', color:'white'}}
            >
              <CardContent>
                <header className='flex justify-between'>
                  <Typography variant='h6'>{task.title}</Typography>
                  <span style={{cursor: 'pointer'}} onClick={()=>handleToggleTasks(task)}>{task.done === true ? '✅️':'⬜'}</span>
                </header>
                <Typography>{task.description}</Typography>
                <Typography>{dateFormat(task)}</Typography>
                <div>
                  <Button variant='contained' color='inherit' style={{color:'#000'}} onClick={()=>navigate(`/tasks/edit/${task.id}`)}>Edit</Button>
                  <Button variant='contained' style={{marginLeft:'.5rem', backgroundColor:'orange', color:'#000'}} onClick={()=>handleDeleteTasks(task)}>Delete</Button>
                </div>
              </CardContent>
            </Card>)}
        </div>
        </>
        )
      }
    </>
  )
}

export default TaskList
