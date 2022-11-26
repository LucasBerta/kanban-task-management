import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import Modal from './../../core/components/modal/Modal';
import Input from '../../core/components/input/Input';
import './CreateEditBoardModal.scss';
import Button from './../../core/components/button/Button';
import BoardApi from './../../core/api/board.api';
import appStore from '../../core/store/appStore';
import { showSnackbar } from './../../action/snackbarAction';
import { snackbarSeverities } from './../../core/components/snackbar/Snackbar';

function CreateEditBoardModal({ onClose = () => {}, className = '' }) {
  const [form, setForm] = useState({
    _id: null,
    name: '',
    columns: [],
  });

  // Handlers
  function handleAddNewColumn() {
    setForm({
      ...form,
      columns: [...form.columns, ''],
    });
  }

  function handleOnDeleteColumn(index) {
    setForm({
      ...form,
      columns: form.columns.filter((column, i) => i !== index),
    });
  }

  async function handleOnSave() {
    if (!form._id) {
      BoardApi.createBoard(form).then(() => {
        appStore.dispatch(showSnackbar(`Board "${form.name}" created successfully!`), snackbarSeverities.SUCCESS);
        onClose();
      });
    }
  }

  return (
    <Modal onClose={onClose} className={`create-edit-board-modal ${className}`.trim()}>
      <h2>{!form._id ? 'Add New Board' : 'Edit Board'}</h2>
      <form className='create-edit-board-modal-form' autoComplete='off' onSubmit={e => e.preventDefault()}>
        <Input placeholder='e.g. Web Design' label='Name' id='name' fullWidth value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
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
                <Button className='form-columns-container-add-column' variant='icon' onClick={() => handleOnDeleteColumn(index)}>
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
  );
}

export default CreateEditBoardModal;
