import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './BoardView.scss';

import Task from './Task';
import Button from '../../core/components/button/Button';
import CreateEditBoardModal from './CreateEditBoardModal';
import BoardApi from './../../core/api/board.api';
import { refreshBoard } from './../../action/boardAction';

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

function BoardColumn({ column }) {
  return (
    <Droppable droppableId={column.name}>
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className='board-column'>
            <h4>{`${column.name} (${column?.tasks?.length || 0})`}</h4>
            {column?.tasks?.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {provided => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Task task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <Button className='column-add-new-task' theme='secondary'>
              + Add New Task
            </Button>
          </div>
        </div>
      )}
    </Droppable>
  );
}

function BoardView({ dispatch, boardState }) {
  const { selectedBoard } = boardState;
  const [columns, setColumns] = useState({});
  const [createEditBoardModalOpen, setCreateEditBoardModalOpen] = useState(false);

  useEffect(() => {
    sortTasks();
    function sortTasks(tasks) {
      const _columns = {};
      selectedBoard?.columns?.forEach(column => (_columns[column.name] = { name: column.name, tasks: [] }));
      (tasks || selectedBoard?.tasks)?.forEach(task => {
        _columns[task.status].tasks = [...(_columns[task.status]?.tasks || []), task];
      });
      setColumns(_columns);
    }
  }, [selectedBoard]);

  function isSelectedBoardEmpty() {
    return !selectedBoard?.columns || selectedBoard.columns?.length === 0;
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const _columns = { ...columns };
    let [reorderedItem] = _columns[result.source.droppableId].tasks.splice(result.source.index, 1);
    reorderedItem = { ...reorderedItem, status: result.destination.droppableId };
    _columns[result.destination.droppableId].tasks.splice(result.destination.index, 0, reorderedItem);
    setColumns(_columns);
    const board = { ...selectedBoard };
    let allTasks = [];
    Object.keys(_columns).forEach(key => {
      allTasks = [...allTasks, ..._columns[key].tasks];
    });
    board.tasks = allTasks;
    BoardApi.updateBoard(board).then(response => {
      dispatch(refreshBoard(response.data));
    });
  }

  return (
    <div className={`board-view${isSelectedBoardEmpty() ? ' empty-board' : ''}`}>
      {isSelectedBoardEmpty() && (
        <div className='empty-board-content'>
          <h2>This board is empty. Create a new column to get started.</h2>
          <Button
            className='board-view-add-new-column'
            variant='contained'
            rounded
            onClick={() => setCreateEditBoardModalOpen(true)}
          >
            + Add New Column
          </Button>
        </div>
      )}
      {!isSelectedBoardEmpty() && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {Object.keys(columns).map(key => {
            return <BoardColumn key={key} column={columns[key]} />;
          })}
          <div className='new-column' onClick={() => setCreateEditBoardModalOpen(true)}>
            <h1>+ New Column</h1>
          </div>
        </DragDropContext>
      )}

      <CreateEditBoardModal
        open={createEditBoardModalOpen}
        board={boardState.selectedBoard}
        onClose={() => setCreateEditBoardModalOpen(false)}
      />
    </div>
  );
}

const mapStateToProps = ({ board }) => ({
  boardState: board,
});

export default connect(mapStateToProps)(BoardView);
