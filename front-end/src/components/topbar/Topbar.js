import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { switchSidebar } from '../../action/sidebarAction';
import Menu from '../../core/components/menu/Menu';
import CreateEditTaskModal from '../boardView/CreateEditTaskModal';
import Logo from '../logo/Logo';
import BoardApi from './../../core/api/board.api';
import ActionConfirmationModal from './../../core/components/actionConfirmationModal/ActionConfirmationModal';
import Button from './../../core/components/button/Button';
import CreateEditBoardModal from './../boardView/CreateEditBoardModal';
import './Topbar.scss';

function Topbar({ dispatch, sidebarState, boardState }) {
  const navigate = useNavigate();
  const [boardActionsOpen, setBoardActionsOpen] = useState(false);
  const [editBoardModalOpen, setEditBoardModalOpen] = useState(false);
  const [deleteBoardModalOpen, setDeleteBoardModalOpen] = useState(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleScreenResize() {
      if ((screenWidth >= 768 && window.innerWidth < 768) || (screenWidth < 768 && window.innerWidth >= 768)) {
        setScreenWidth(window.innerWidth);
      }
    }

    window.addEventListener('resize', handleScreenResize);

    return () => window.removeEventListener('resize', handleScreenResize);
  }, [screenWidth]);

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

  function switchSidenav() {
    dispatch(switchSidebar());
  }

  return (
    <div className={`topbar${sidebarState === 'closed' ? ' sidebar-closed' : ''}`}>
      <div className='logo-container'>
        <Logo />
      </div>
      <div className='topbar-content'>
        <div className='topbar-selected-board-container'>
          <h1 className='topbar-selected-board' onClick={switchSidenav}>
            {boardState?.selectedBoard?.name}
          </h1>
          <KeyboardArrowDownIcon className='topbar-arrow-down-icon' onClick={switchSidenav} />
        </div>
        <div className='topbar-action-buttons'>
          <Button
            className='topbar-add-new-task'
            variant='contained'
            rounded
            disabled={boardState?.selectedBoard?.columns?.length === 0}
            onClick={() => setNewTaskModalOpen(true)}
          >
            {`+${screenWidth > 767 ? 'Add New Task' : ''}`}
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
