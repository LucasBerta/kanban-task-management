import Button from '../button/Button';
import Modal from '../modal/Modal';
import './ActionConfirmationModal.scss';

function ActionConfirmationModal({
  open,
  title = '',
  description = '',
  confirmButtonLabel = '',
  onConfirm = () => {},
  onCancel = () => {},
}) {
  return (
    <>
      <Modal open={open} onClose={onCancel} className='action-confirmation-modal'>
        <h2 className='action-confirmation-modal-title'>{title}</h2>
        <p className='action-confirmation-modal-description'>{description}</p>
        <div className='action-buttons-container'>
          <Button onClick={onConfirm} variant='contained' theme='accent' rounded fullWidth>
            {confirmButtonLabel}
          </Button>
          <Button
            className='action-confirmation-modal-cancel'
            onClick={onCancel}
            theme='light'
            variant='contained'
            rounded
            fullWidth
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ActionConfirmationModal;
