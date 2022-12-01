import { useState } from 'react';
import { connect } from 'react-redux';
import { Checkbox, FormControl, MenuItem, Select } from '@mui/material';

import './Task.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import TaskApi from './../../core/api/task.api';
import appStore from '../../core/store/appStore';
import BoardApi from './../../core/api/board.api';
import Menu from '../../core/components/menu/Menu';
import Modal from '../../core/components/modal/Modal';
import Button from '../../core/components/button/Button';
import { showSnackbar } from '../../action/snackbarAction';
import { refreshSelectedBoard } from '../../action/boardAction';
import { snackbarSeverities } from '../../core/components/snackbar/Snackbar';
import ActionConfirmationModal from './../../core/components/actionConfirmationModal/ActionConfirmationModal';
import CreateEditTaskModal from './CreateEditTaskModal';

// Helpers
function getCompletedSubtasksCount(subtasks = []) {
  return subtasks.filter(task => !!task.isCompleted).length;
}

// Components
const mapStateToPropsTaskModalHeader = ({ board }) => ({ boardState: board });

const TaskModalheader = connect(mapStateToPropsTaskModalHeader)(({ dispatch, boardState, task, onClose = () => {} }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const options = [
    {
      label: 'Edit Task',
      onSelect: () => {
        setMenuOpen(false);
        setEditModalOpen(true);
      },
    },
    {
      label: 'Delete Task',
      onSelect: () => {
        setMenuOpen(false);
        setDeleteModalOpen(true);
      },
    },
  ];

  async function deleteTask() {
    TaskApi.deleteTask(boardState.selectedBoard, task).then(async response => {
      appStore.dispatch(showSnackbar(`Task deleted successfully!`), snackbarSeverities.SUCCESS);
      await BoardApi.fetchAllAndUpdateState();
      dispatch(refreshSelectedBoard());
      onClose();
    });
  }

  return (
    <div className='task-modal-header'>
      <h2 className='task-modal-title'>{task.title}</h2>
      <div>
        <Button
          id='task-view-modal-options'
          className='task-modal-options'
          theme='secondary'
          variant='icon'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MoreVertIcon />
        </Button>
        <Menu anchor='task-view-modal-options' open={menuOpen} options={options} onClose={() => setMenuOpen(false)} />
        <CreateEditTaskModal open={editModalOpen} onClose={() => setEditModalOpen(false)} task={task} />
        <ActionConfirmationModal
          open={deleteModalOpen}
          title='Delete this task?'
          description={`Are you sure you want to delete the ${task.title} board? This action will remove all columns and tasks and cannot be reversed.`}
          confirmButtonLabel='Delete'
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={deleteTask}
        />
      </div>
    </div>
  );
});

const mapStateToPropsSubtasks = ({ board }) => ({ boardState: board });

const Subtasks = connect(mapStateToPropsSubtasks)(({ dispatch, boardState, subtasks = [], onUpdateSubtasks = () => {} }) => {
  async function handleToggleCompletedTask(subtask, index) {
    const updatedSubtasks = subtasks.map((_subtask, _index) =>
      _subtask.title === subtask.title && _index === index ? { ..._subtask, isCompleted: !_subtask.isCompleted } : _subtask
    );
    onUpdateSubtasks(updatedSubtasks);
  }

  return (
    <div className='task-modal-subtasks-container'>
      <h5 className='task-modal-subtasks-count'>
        {`Subtasks (${getCompletedSubtasksCount(subtasks)} of ${subtasks.length})`}
      </h5>
      <div className='task-modal-subtasks'>
        {subtasks.map((subtask, index) => (
          <div key={index} className={`task-modal-subtask${subtask.isCompleted ? ' completed' : ''}`}>
            <Checkbox
              checked={subtask.isCompleted}
              className='task-modal-subtask-completed-checkbox'
              onClick={() => handleToggleCompletedTask(subtask, index)}
            />
            <span className='task-modal-subtask-title' onClick={() => handleToggleCompletedTask(subtask, index)}>
              {subtask.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

const mapStateToPropsTaskModalStatus = ({ board }) => ({ boardState: board });

const TaskModalStatus = connect(mapStateToPropsTaskModalStatus)(({ boardState, status, onChangeStatus = () => {} }) => {
  return (
    <div className='task-modal-status-container'>
      <h5>Current Status</h5>
      <FormControl className='task-modal-status-form-control' fullWidth>
        <Select value={status} className='task-modal-status-select' fullWidth>
          {boardState.selectedBoard.columns.map(column => (
            <MenuItem key={column.name} value={column.name} onClick={() => onChangeStatus(column.name)}>
              {column.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
});

const mapStateToPropsTaskViewModal = ({ board }) => ({ boardState: board });

const TaskViewModal = connect(mapStateToPropsTaskViewModal)(({ boardState, task, open, onClose }) => {
  const [_task, _setTask] = useState(task);

  function handleOnUpdateSubtasks(subtasks) {
    const updatedTask = { ..._task, subtasks: subtasks };
    _setTask(updatedTask);
    TaskApi.updateTask(boardState.selectedBoard, updatedTask).then(null, () => {
      _setTask(updatedTask);
    });
  }

  function handleOnUpdateStatus(status) {
    const updatedTask = { ..._task, status };
    _setTask(updatedTask);
    TaskApi.updateTask(boardState.selectedBoard, updatedTask);
  }

  return (
    <Modal open={open} onClose={onClose}>
      <TaskModalheader task={task} onClose={onClose} />
      <div className='task-modal-body'>
        {task.description && <p className='task-modal-description body-l'>{task.description}</p>}
        <Subtasks subtasks={_task.subtasks} onUpdateSubtasks={handleOnUpdateSubtasks} />
        <TaskModalStatus status={_task.status} onChangeStatus={handleOnUpdateStatus} />
      </div>
    </Modal>
  );
});

function Task({ dispatch, task }) {
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  async function handleOnCloseModal() {
    setTaskModalOpen(false);
    await BoardApi.fetchAllAndUpdateState();
    dispatch(refreshSelectedBoard());
  }

  return (
    <>
      <div className='task' onClick={() => setTaskModalOpen(true)}>
        <h3 className='task-title'>{task.title}</h3>
        <span className='subtask-count'>
          {`${getCompletedSubtasksCount(task.subtasks)} of ${task.subtasks?.length || 0} subtasks`}
        </span>
      </div>
      <TaskViewModal task={task} open={taskModalOpen} onClose={handleOnCloseModal} />
    </>
  );
}

const mapStateToPropsTask = () => ({});

export default connect(mapStateToPropsTask)(Task);
