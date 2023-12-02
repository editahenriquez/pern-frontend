import { AppBar, Box, Button, Container, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  return (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position='static' color='transparent'>
      <Container>
        <Toolbar className='flex justify-center gap-x-2 lg:justify-between lg:px-20 py-4'>
          <Typography variant='h6'>
            <Link to='/' style={{color:'#eee'}}>MERN POSTGRES</Link>
          </Typography>
          <Button variant='contained' color='primary' onClick={()=>navigate('/tasks/new')}>New Task</Button>
        </Toolbar>
      </Container>
    </AppBar>
  </Box>
  )
}

export default Navbar