import { connect } from 'react-redux';
import Button from '../../core/components/button/Button';
import './BoardView.scss';
import Task from './Task';

// Components
export function EmptyBoardView() {
  return (
    <div className='board-view empty-board'>
      <div className='empty-board-content'>
        <h2>Please select a board to get started.</h2>
      </div>
    </div>
  );
}

function BoardColumn({ board, column }) {
  return (
    <div className='board-column'>
      <h4>{`${column.name} (${column.tasks?.length || 0})`}</h4>
      {board.tasks
        ?.filter(task => task.status === column.name)
        .map((task, index) => (
          <Task key={index} task={task} />
        ))}
      <Button className='column-add-new-task' theme='secondary'>
        + Add New Task
      </Button>
    </div>
  );
}

function BoardView({ boardState }) {
  const { selectedBoard } = boardState;

  function isSelectedBoardEmpty() {
    return !selectedBoard?.columns || selectedBoard.columns?.length === 0;
  }

  return (
    <div className={`board-view${isSelectedBoardEmpty() ? ' empty-board' : ''}`}>
      {isSelectedBoardEmpty() && (
        <div className='empty-board-content'>
          <h2>This board is empty. Create a new column to get started.</h2>
          {/* TODO -> BUTTON TO CREATE COLUMN */}
        </div>
      )}
      {!isSelectedBoardEmpty() && (
        <>
          {selectedBoard.columns.map(column => (
            <BoardColumn key={column.name} board={boardState.selectedBoard} column={column} />
          ))}
          <div className='new-column'>
            <h1>+ New Column</h1>
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = ({ board }) => ({
  boardState: board,
});

export default connect(mapStateToProps)(BoardView);
