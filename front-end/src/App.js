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

function App({ dispatch, theme }) {
  const navigate = useNavigate();
  const uriParams = useParams();
  const location = useLocation();

  useEffect(() => {
    setUp();

    async function setUp() {
      const boards = await BoardApi.fetchAllAndUpdateState();
      dispatch(setupTheme());
      if (!boards?.length) {
        navigate('/');
        return;
      }
      const requestedBoard = boards.find(board => board._id === uriParams.boardId);
      if (!!requestedBoard) {
        dispatch(setSelectedBoard(requestedBoard));
      } else {
        dispatch(setSelectedBoard(boards[0]));
        boards[0] && navigate(`/board/${boards[0]._id}`);
      }
    }
  }, [location, dispatch, navigate, uriParams]);

  return (
    <div className={`app ${theme}-theme`}>
      <Topbar />
      <Outlet />
      <Sidenav />
      <Snackbar />
    </div>
  );
}

const mapStateToProps = ({ theme }) => ({ theme });

export default connect(mapStateToProps)(App);
