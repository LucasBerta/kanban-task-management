import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Logo from '../logo/Logo';
import './Topbar.scss';
import Button from './../../core/components/button/Button';
import Menu from '../../core/components/menu/Menu';
import BoardApi from './../../core/api/board.api';
import CreateEditBoardModal from './../boardView/CreateEditBoardModal';
import ActionConfirmationModal from './../../core/components/actionConfirmationModal/ActionConfirmationModal';
import CreateEditTaskModal from '../boardView/CreateEditTaskModal';

function Topbar({ sidebarState, boardState }) {
  const navigate = useNavigate();
  const [boardActionsOpen, setBoardActionsOpen] = useState(false);
  const [editBoardModalOpen, setEditBoardModalOpen] = useState(false);
  const [deleteBoardModalOpen, setDeleteBoardModalOpen] = useState(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);

  const boardActionsOptions = [
    {
      label: 'Edit Board',
      onSelect: () => {
        setBoardActionsOpen(false);
        setEditBoardModalOpen(true);
      },
    },
    {
      label: 'Delete Board',
      onSelect: () => {
        setBoardActionsOpen(false);
        setDeleteBoardModalOpen(true);
      },
    },
  ];

  function handleDeleteBoard() {
    BoardApi.deleteBoard(boardState.selectedBoard._id).then(async () => {
      setDeleteBoardModalOpen(false);
      await BoardApi.fetchAllAndUpdateState();
      navigate('/');
    });
  }

  return (
    <div className={`topbar${sidebarState === 'closed' ? ' sidebar-closed' : ''}`}>
      <div className='logo-container'>
        <Logo />
      </div>
      <div className='topbar-content'>
        <h1 className='topbar-selected-board'>{boardState?.selectedBoard?.name}</h1>
        <div className='topbar-action-buttons'>
          <Button
            className='topbar-add-new-task'
            variant='contained'
            rounded
            disabled={boardState?.selectedBoard?.columns?.length === 0}
            onClick={() => setNewTaskModalOpen(true)}
          >
            + Add New Task
          </Button>
          <Button
            id='topbar-board-actions'
            className='topbar-board-actions'
            theme='secondary'
            variant='icon'
            onClick={() => {
              setBoardActionsOpen(true);
            }}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            anchor='topbar-board-actions'
            position='left'
            open={boardActionsOpen}
            options={boardActionsOptions}
            onClose={() => setBoardActionsOpen(false)}
          />

          <CreateEditTaskModal open={newTaskModalOpen} onClose={() => setNewTaskModalOpen(false)} />
          <CreateEditBoardModal
            open={editBoardModalOpen}
            board={boardState.selectedBoard}
            onClose={() => setEditBoardModalOpen(false)}
          />
          <ActionConfirmationModal
            open={deleteBoardModalOpen}
            title='Delete this board?'
            description='Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.'
            confirmButtonLabel='Delete'
            onCancel={() => setDeleteBoardModalOpen(false)}
            onConfirm={handleDeleteBoard}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ sidebar, board }) => ({
  sidebarState: sidebar,
  boardState: board,
});

export default connect(mapStateToProps)(Topbar);
