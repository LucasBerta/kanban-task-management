import { connect } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

import './CreateEditTaskModal.scss';

import Input from '../../core/components/input/Input';
import Modal from './../../core/components/modal/Modal';
import Textarea from '../../core/components/textarea/Textarea';
import Button from '../../core/components/button/Button';
import { FormControl, MenuItem, Select } from '@mui/material';
import TaskApi from './../../core/api/task.api';
import { refreshBoard } from './../../action/boardAction';

function CreateEditTaskModal({ dispatch, boardState, task, open, className = '', onClose = () => {} }) {
  const initialStatus = boardState.selectedBoard?.columns[0]?.name;
  const initialFormState = useMemo(() => ({ title: '', description: '', status: '', subtasks: [] }), []);
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (!!task) setForm(task);
    if (!task && !!initialStatus) setForm({ ...initialFormState, status: initialStatus });
  }, [task, initialStatus, initialFormState]);

  function handleAddNewSubtask() {
    setForm({
      ...form,
      subtasks: [...form.subtasks, { title: '', isCompleted: false }],
    });
  }

  function handleOnDeleteSubtask(index) {
    setForm({
      ...form,
      subtasks: form.subtasks.filter((_s, i) => i !== index),
    });
  }

  function handleOnSaveTask() {
    if (isNew()) {
      createTask();
    } else {
    }
  }

  function createTask() {
    TaskApi.createTask(boardState.selectedBoard, form).then(response => {
      onClose();
      setForm(initialFormState);
      dispatch(refreshBoard({ ...boardState.selectedBoard, tasks: response.data }));
    });
  }

  function isNew() {
    return !form._id;
  }

  return (
    <Modal open={open} onClose={onClose} className={`create-edit-task-modal ${className}`}>
      <h2>{isNew() ? 'Add New Task' : 'Edit Task'}</h2>
      <form className='create-edit-task-modal-form' autoComplete='off' onSubmit={e => e.preventDefault()}>
        <Input
          placeholder='e.g. Design homepage'
          label='Title'
          id='title'
          fullWidth
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          autoFocus
        />
        <Textarea
          placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
          label='Description'
          fullWidth
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          rows={4}
        />
        <div className='subtasks-container'>
          {form.subtasks.map((subtask, index) => (
            <Input
              key={index}
              placeholder=''
              label={index === 0 ? 'Subtasks' : ''}
              fullWidth
              value={subtask.title}
              onChange={e =>
                setForm({
                  ...form,
                  subtasks: form.subtasks.map((_subtask, i) => ({
                    ..._subtask,
                    title: i === index ? e.target.value : _subtask.title,
                  })),
                })
              }
              autoFocus
              iconComponent={
                <Button className='delete-subtask-icon-button' variant='icon' onClick={() => handleOnDeleteSubtask(index)}>
                  <ClearIcon />
                </Button>
              }
            />
          ))}
        </div>
        <Button fullWidth className='add-new-subtask' theme='light' rounded onClick={handleAddNewSubtask}>
          Add New Subtask
        </Button>

        <div className='create-edit-task-modal-status-container'>
          <h5>Status</h5>
          <FormControl className='task-modal-status-form-control' fullWidth>
            <Select value={form.status} className='task-modal-status-select' fullWidth>
              {boardState?.selectedBoard?.columns?.map(column => (
                <MenuItem key={column.name} value={column.name} onClick={() => setForm({ ...form, status: column.name })}>
                  {column.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Button fullWidth className='save-subtask' theme='primary' variant='contained' rounded onClick={handleOnSaveTask}>
          {isNew() ? 'Add Task' : 'Save Task'}
        </Button>
      </form>
    </Modal>
  );
}

const mapStateToProps = ({ board }) => ({ boardState: board });

export default connect(mapStateToProps)(CreateEditTaskModal);
