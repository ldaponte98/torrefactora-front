import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TableCustom from './components/TableCustom';
import NavBar from './components/NavBar';
import FormTask from './components/FormTask';
import { Button, CircularProgress, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import taskServices from './api/services/tasks/task-services';
import priorityServices from './api/services/priorities/priority-services';
import statusServices from './api/services/status/status-services';

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [priorities, setPriorities] = useState([{ id: 1, name: 'test' }]);
  const [status, setStatus] = useState([{ id: 1, name: 'test' }]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({open: false, message: ""});
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    findTask()
    findStatus()
    findPriorities()
  }, []);

  const findTask = async () => {
    setLoading(true)
    let response = await taskServices.findAll()
    if(!response.success){
      setSnackbar({open: true, message: response.message})
      return;
    }
    setTasks(response.data)
    setLoading(false)
  }

  const findPriorities = async () => {
    let response = await priorityServices.findAll()
    if(!response.success){
      setSnackbar({open: true, message: response.message})
      return;
    }
    setPriorities(response.data)
  }

  const findStatus = async () => {
    let response = await statusServices.findAll()
    if(!response.success){
      setSnackbar({open: true, message: response.message})
      return;
    }
    setStatus(response.data)
  }

  const handleClickOpenNew = () => {
    setTask(null)
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const onSave = async (data) => {
    setLoading(true)
    let response = task == null ? await taskServices.create(data) : await taskServices.update(task.id, data)
    setTask(null)
    setSnackbar({open: true, message: response.message})
    await findTask()
  }

  const onEdit = (data) => {
    setTask(data)
    setOpenForm(true);
  }

  return (
    <>
      <NavBar />
      <div className='main-container'>
        <Button variant="contained" onClick={handleClickOpenNew}>+ Nueva</Button>
        <FormTask
          open={openForm}
          task={task}
          onCloseHandler={handleClose}
          priorities={priorities}
          status={status}
          onSubmitHandler={onSave}
        />
        <div className='table-content'>
          {loading ? <CircularProgress /> : 
          <TableCustom 
          list={tasks}
          onEdit={(data) => { onEdit(data) }} />}
        </div>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={8000}
          onClose={() => { setSnackbar({ open: false, message: ""}) }}
          message={snackbar.message}
        />
      </div>
    </>
  )
}

export default App
