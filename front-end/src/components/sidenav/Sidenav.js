import { connect } from 'react-redux';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './Sidenav.scss';

import IOSSwitch from '../../core/components/switch/Switch';
import { switchTheme } from '../../action/themeAction';
import { switchSidebar } from '../../action/sidebarAction';
import CreateEditBoardModal from '../boardView/CreateEditBoardModal';
import BoardApi from './../../core/api/board.api';
import { setBoards } from '../../action/boardAction';

function Sidenav({ dispatch, themeState, sidebarState, boardState }) {
  const [createBoardModalOpen, setCreateBoardModalOpen] = useState(false);
  const navigate = useNavigate();
  const { boards, selectedBoard } = boardState;

  function isDarkTheme() {
    return themeState === 'dark';
  }

  function onSelectBoard(board) {
    navigate(`/board/${board._id}`);
  }

  async function handleOnCloseCreateEditModal() {
    setCreateBoardModalOpen(false);
    const boards = await BoardApi.fetchAll();
    dispatch(setBoards(boards.data));
  }

  return (
    <>
      <nav className={`sidenav ${sidebarState}`}>
        <div className='sidenav-content'>
          <div className='boards-container'>
            <h4>All boards ({boards.length})</h4>
            <ul className='boards'>
              {boards.map((board) => (
                <li
                  key={board._id}
                  className={`board${
                    selectedBoard?._id === board._id ? ' selected' : ''
                  }`}
                  onClick={() => onSelectBoard(board)}
                >
                  <DashboardOutlinedIcon className='board-icon' />
                  <span className='board-name'>{board.name}</span>
                </li>
              ))}
              <li
                className='new-board'
                onClick={() => setCreateBoardModalOpen(true)}
              >
                <DashboardOutlinedIcon className='board-icon' />
                <span>+ Create New Board</span>
              </li>
            </ul>
          </div>
          <div className='actions'>
            <div className='theme-switcher-container'>
              <div className='theme-switcher'>
                <LightModeIcon />
                <IOSSwitch
                  checked={isDarkTheme()}
                  onChange={() => dispatch(switchTheme())}
                />
                <DarkModeIcon />
              </div>
            </div>
            <div className='toggle-sidebar-container'>
              <div
                className='toggle-sidebar'
                onClick={() => {
                  dispatch(switchSidebar());
                }}
              >
                <VisibilityOffIcon className='hide-sidebar-icon' />
                <span>Hide Sidebar</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {createBoardModalOpen && (
        <CreateEditBoardModal onClose={handleOnCloseCreateEditModal} />
      )}
      <div
        className='show-sidebar-icon'
        onClick={() => {
          dispatch(switchSidebar());
        }}
      >
        <VisibilityOffIcon className='hide-sidebar-icon' />
      </div>
    </>
  );
}

const mapStateToProps = ({ theme, sidebar, board }) => ({
  themeState: theme,
  sidebarState: sidebar,
  boardState: board,
});

export default connect(mapStateToProps)(Sidenav);
