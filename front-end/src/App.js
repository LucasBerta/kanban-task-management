import { connect } from 'react-redux';
import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';

import './App.scss';
import Sidenav from './components/sidenav/Sidenav';
import Topbar from './components/topbar/Topbar';

import { useEffect } from 'react';
import { setSelectedBoard } from './action/boardAction';
import { setupTheme } from './action/themeAction';
import BoardApi from './core/api/board.api';
import Snackbar from './core/components/snackbar/Snackbar';

function App({ dispatch, theme, boardState }) {
  const navigate = useNavigate();
  const uriParams = useParams();
  const location = useLocation();

  useEffect(() => {
    setUp();

    async function setUp() {
      const boards = boardState?.boards;
      dispatch(setupTheme());

      if (!boards?.length) {
        await BoardApi.fetchAllAndUpdateState().then(data => {
          if (!data.length) navigate('/');
        });
        return;
      }

      const requestedBoard = boards.find(board => board._id === uriParams.boardId);
      if (!requestedBoard) {
        dispatch(setSelectedBoard(boards[0]));
        navigate(`/board/${boards[0]._id}`);
      } else if (requestedBoard._id !== boardState?.selectedBoard?._id) {
        dispatch(setSelectedBoard(requestedBoard));
      }
    }
  }, [location, dispatch, navigate, uriParams, boardState]);

  return (
    <div className={`app ${theme}-theme`}>
      <Topbar />
      <Outlet />
      <Sidenav />
      <Snackbar />
    </div>
  );
}

const mapStateToProps = ({ theme, board }) => ({ theme, boardState: board });

export default connect(mapStateToProps)(App);
