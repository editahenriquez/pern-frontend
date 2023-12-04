import {BrowserRouter, Route, Routes} from 'react-router-dom'
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import { TaskContextProvider } from "./context/TaskProvider"
import { Container } from '@mui/material';

function App() {
  return (
    <div className="bg-zinc-900 min-h-screen">
      <BrowserRouter>
        <Navbar />
          <Container>
            <TaskContextProvider>
              <Routes>
                <Route path="/" element={<TaskList />} />
                <Route path="/tasks/new" element={<TaskForm />} />
                <Route path="/tasks/edit/:id" element={<TaskForm />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </TaskContextProvider>
          </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
