import { Card, CardContent, Grid, TextField, Typography, Button, CircularProgress } from "@material-ui/core"
import React, { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskProvider';
import {useParams, useNavigate} from 'react-router-dom';

function TaskForm() {
  const {getTask,createTasks,updateTasks,openDialog}=useTasks();
  const [task, setTask] = useState({
    title: '',
    description: ''
  });
 const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetTask = async () => {
      if (params.id) {
        try {
          const fetchedTask = await getTask(params.id);
          //console.log(fetchedTask);
          setTask({
            title: fetchedTask.title,
            description: fetchedTask.description
          });
        }catch(err) {
          console.log(`Error fetching task: ${err}`);
          alert(err);
        }
      }
    };
    handleGetTask();
  }, [])
  
  const handleCreateTasks = async (fields) => {
    try {
      await createTasks(fields);
    }catch(err) {
      console.log(`Error inserting tasks: ${err}`);
      alert(err);
    }
  };

  const handleUpdateTasks = async (fields) => {
    try {
      await updateTasks(params.id,fields);
    }catch(err) {
      console.log(`Error updating tasks: ${err}`);
      alert(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title || !task.description){
      await openDialog('informative', 'Error', 'Title and description are required.');
      return;
    }
    
    setIsLoading(true)
    if (params.id){
      handleUpdateTasks(task)
    }else{
      handleCreateTasks(task)
    }
    setIsLoading(false)

    navigate('/');
    setTask({
      title: '',
      description: ''
    })
  };

  const handleChange = (e) => {
    setTask({...task,[e.target.name]:e.target.value})
  };
  
  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" >
      <Grid>
        <Card
          style={{background:'#1e272e',pading:'1rem'}}
        >
          <Typography
            variant='h6'
            style={{color: 'white', textAlign:'center'}}
          >
            {!params.id?'New Task':'Edit Task'}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-1">
              <TextField
                variant="filled"
                label='Title'
                inputProps={{style:{color:'white'}}}
                InputLabelProps={{style:{color:'white'}}}
                name="title"
                value={task.title}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label='Description'
                multiline
                minRows={4}
                inputProps={{style:{color:'white'}}}
                InputLabelProps={{style:{color:'white'}}}
                name="description"
                value={task.description}
                onChange={handleChange}
              />
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={!task.title || !task.description}
              >
              {isLoading?(<CircularProgress color="inherit" size={24}/>):('Save')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TaskForm
