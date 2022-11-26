import { connect } from 'react-redux';

import Logo from '../logo/Logo';
import './Topbar.scss';
import Button from './../../core/components/button/Button';

function Topbar({ sidebarState, boardState }) {
  return (
    <div className={`topbar${sidebarState === 'closed' ? ' sidebar-closed' : ''}`}>
      <div className='logo-container'>
        <Logo />
      </div>
      <div className='topbar-content'>
        <h1 className='topbar-selected-board'>{boardState?.selectedBoard?.name}</h1>
        <Button
          className='topbar-add-new-task'
          variant='contained'
          rounded
          disabled={boardState?.selectedBoard?.columns?.length === 0}
        >
          + Add New Task
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = ({ sidebar, board }) => ({
  sidebarState: sidebar,
  boardState: board,
});

export default connect(mapStateToProps)(Topbar);
