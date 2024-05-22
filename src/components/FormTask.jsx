import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import dayjs from 'dayjs';

export default function FormTask({ 
  open = false, 
  task = null,
  onCloseHandler = null, 
  onSubmitHandler = null,
  priorities = [],
  status = [] 
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onCloseHandler}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            onSubmitHandler(formJson)
            onCloseHandler();
          },
        }}
      >
        <DialogTitle>Actividad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor digita los campos obligatorios marcados con <b>*</b>.
          </DialogContentText>
          <div className='form-container' >

          
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nombre"
            type="text"
            fullWidth
            defaultValue={task && task.name}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Descripción"
            type="text"
            fullWidth
            defaultValue={task && task.description}
          />

          <DateTimePicker
          autoFocus
          required
          margin="dense"
          id="beginDate"
          name="beginDate"
          label="Inicio"
          format="YYYY-MM-DD hh:mm:ss"
          fullWidth
          defaultValue={task && dayjs(task.beginDate)}
          slotProps={{
            textField: {
              required: true,
            },
          }}
          />

        <DateTimePicker
          autoFocus
          required
          margin="dense"
          id="endDate"
          name="endDate"
          label="Finalización"
          format="YYYY-MM-DD hh:mm:ss"
          fullWidth
          defaultValue={task && dayjs(task.endDate)}
          slotProps={{
            textField: {
              required: true,
            },
          }}
          />

          <FormControl fullWidth>
            <InputLabel id="priority-label">Prioridad</InputLabel>
            <Select
              labelId="priority-label"
              id="priority_id"
              name="priority_id"
              defaultValue={task && task.priority.id}
              label="Prioridad"
            >
              { priorities.map(priority => <MenuItem value={priority.id}>{priority.name}</MenuItem> ) }
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="status-label">Estado</InputLabel>
            <Select
              labelId="status-label"
              id="status_id"
              name="status_id"
              defaultValue={task && task.status.id}
              label="Estado"
            >
              { status.map(state => <MenuItem value={state.id}>{state.name}</MenuItem> ) }
            </Select>
          </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler}>Cancelar</Button>
          <Button type="submit">Guardar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}