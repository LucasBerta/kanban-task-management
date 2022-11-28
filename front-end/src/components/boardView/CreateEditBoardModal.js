import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ClearIcon from '@mui/icons-material/Clear';

import './CreateEditBoardModal.scss';

import BoardApi from './../../core/api/board.api';
import Input from '../../core/components/input/Input';
import Modal from './../../core/components/modal/Modal';
import Button from './../../core/components/button/Button';
import { connect } from 'react-redux';
import { refreshSelectedBoard } from '../../action/boardAction';

function CreateEditBoardModal({ dispatch, open, board, onClose = () => {}, className = '' }) {
  const navigate = useNavigate();
  const initialFormState = { _id: null, name: '', columns: [] };
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (!!board) {
      setForm(board);
    }
  }, [board]);

  function isNew() {
    return !form._id;
  }

  // Handlers
  function handleAddNewColumn() {
    setForm({
      ...form,
      columns: [...form.columns, { name: '' }],
    });
  }

  function handleOnDeleteColumn(index) {
    setForm({
      ...form,
      columns: form.columns.filter((column, i) => i !== index),
    });
  }

  function handleOnSave() {
    if (isNew()) {
      createBoard();
    } else {
      updateBoard();
    }
  }

  async function createBoard() {
    BoardApi.createBoard(form).then(response => {
      onClose();
      BoardApi.fetchAllAndUpdateState().then(() => {
        navigate(`/board/${response.data?._id}`);
        setForm(initialFormState);
      });
    });
  }

  async function updateBoard() {
    BoardApi.updateBoard(form).then(() => {
      onClose();
      BoardApi.fetchAllAndUpdateState().then(() => {
        setForm(initialFormState);
        dispatch(refreshSelectedBoard());
      });
    });
  }

  return (
    <>
      <Modal open={open} onClose={onClose} className={`create-edit-board-modal ${className}`.trim()}>
        <h2>{!form._id ? 'Add New Board' : 'Edit Board'}</h2>
        <form className='create-edit-board-modal-form' autoComplete='off' onSubmit={e => e.preventDefault()}>
          <Input
            placeholder='e.g. Web Design'
            label='Name'
            id='name'
            fullWidth
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            autoFocus
          />
          <div className='form-columns-container'>
            {form.columns.map((column, index) => (
              <Input
                key={index}
                label={index === 0 ? 'Columns' : ''}
                value={column.name || ''}
                fullWidth
                onChange={e => {
                  setForm({
                    ...form,
                    columns: form.columns.map((column, i) => (index === i ? { ...column, name: e.target.value } : column)),
                  });
                }}
                iconComponent={
                  <Button
                    className='form-columns-container-delete-column-icon-button'
                    variant='icon'
                    onClick={() => handleOnDeleteColumn(index)}
                  >
                    <ClearIcon />
                  </Button>
                }
              />
            ))}
            <div className='create-edit-board-modal-form-actions'>
              <Button fullWidth theme='light' rounded onClick={handleAddNewColumn}>
                Add New Column
              </Button>
              <Button fullWidth variant='contained' theme='primary' type='submit' rounded onClick={handleOnSave}>
                {!form._id ? 'Create New Board' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default connect()(CreateEditBoardModal);
