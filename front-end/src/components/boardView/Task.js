import { useState } from 'react';
import { connect } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '../../core/components/button/Button';
import './Task.scss';
import Menu from '../../core/components/menu/Menu';
import { Checkbox, FormControl, MenuItem, Select } from '@mui/material';
import Modal from '../../core/components/modal/Modal';
import TaskApi from './../../core/api/task.api';
import appStore from '../../core/store/appStore';
import { showSnackbar } from '../../action/snackbarAction';
import { snackbarSeverities } from '../../core/components/snackbar/Snackbar';
import BoardApi from './../../core/api/board.api';
import { refreshSelectedBoard } from '../../action/boardAction';
import ActionConfirmationModal from './../../core/components/actionConfirmationModal/ActionConfirmationModal';

// Helpers
function getCompletedSubtasksCount(subtasks = []) {
  return subtasks.filter(task => !!task.isCompleted).length;
}

// Components
const mapStateToPropsTaskModalHeader = ({ board }) => ({ boardState: board });

const TaskModalheader = connect(mapStateToPropsTaskModalHeader)(({ dispatch, boardState, task, onClose = () => {} }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const options = [
    { label: 'Edit Task', onSelect: () => {} },
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
        {deleteModalOpen && (
          <ActionConfirmationModal
            title='Delete this task?'
            description={`Are you sure you want to delete the ${task.title} board? This action will remove all columns and tasks and cannot be reversed.`}
            confirmButtonLabel='Delete'
            onCancel={() => setDeleteModalOpen(false)}
            onConfirm={deleteTask}
          />
        )}
      </div>
    </div>
  );
});

const mapStateToPropsSubtasks = ({ board }) => ({ boardState: board });

const Subtasks = connect(mapStateToPropsSubtasks)(({ boardState, task = {} }) => {
  const [subtasks, setSubtasks] = useState(task.subtasks);

  async function handleToggleCompletedTask(subtask, index) {
    const updatedSubtasks = subtasks.map((_subtask, _index) =>
      _subtask.title === subtask.title && _index === index ? { ..._subtask, isCompleted: !_subtask.isCompleted } : _subtask
    );
    const _task = { ...task, subtasks: updatedSubtasks };
    setSubtasks(updatedSubtasks);

    TaskApi.updateTask(boardState.selectedBoard, _task).then(null, () => {
      setSubtasks(task.subtasks);
    });
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

const TaskModalStatus = connect(mapStateToPropsTaskModalStatus)(({ boardState, task }) => {
  const [_task, _setTask] = useState(task);

  function handleOnChangeStatus(columnName) {
    const newTask = { ...task, status: columnName };
    TaskApi.updateTask(boardState.selectedBoard, newTask).then(response => {
      _setTask(response.data);
    });
  }

  return (
    <div className='task-modal-status-container'>
      <h5>Current Status</h5>
      <FormControl className='task-modal-status-form-control' fullWidth>
        <Select value={_task.status} className='task-modal-status-select' fullWidth>
          {boardState.selectedBoard.columns.map(column => (
            <MenuItem key={column.name} value={column.name} onClick={() => handleOnChangeStatus(column.name)}>
              {column.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
});

function TaskViewModal({ task, open, onClose }) {
  if (!open) return;
  return (
    <Modal onClose={onClose}>
      <TaskModalheader task={task} onClose={onClose} />
      <div className='task-modal-body'>
        {task.description && <p className='task-modal-description body-l'>{task.description}</p>}
        <Subtasks task={task} />
        <TaskModalStatus task={task} />
      </div>
    </Modal>
  );
}

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
