import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Logo from '../logo/Logo';
import './Topbar.scss';
import Button from './../../core/components/button/Button';
import Menu from '../../core/components/menu/Menu';
import BoardApi from './../../core/api/board.api';

function Topbar({ sidebarState, boardState }) {
  const navigate = useNavigate();
  const [boardActionsOpen, SetBoardActionsOpen] = useState(false);

  const boardActionsOptions = [
    { label: 'Edit Board', onSelect: () => {} },
    {
      label: 'Delete Board',
      onSelect: handleDeleteBoard,
    },
  ];

  function handleDeleteBoard() {
    BoardApi.deleteBoard(boardState.selectedBoard._id).then(() => {
      SetBoardActionsOpen(false);
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
          >
            + Add New Task
          </Button>
          <Button
            id='topbar-board-actions'
            className='topbar-board-actions'
            theme='secondary'
            variant='icon'
            onClick={() => {
              SetBoardActionsOpen(true);
            }}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            anchor='topbar-board-actions'
            position='left'
            open={boardActionsOpen}
            options={boardActionsOptions}
            onClose={() => SetBoardActionsOpen(false)}
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
