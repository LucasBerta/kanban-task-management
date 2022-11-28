import * as ReactDOM from 'react-dom';
import './Modal.scss';

function Modal({ children, open, className = '', onClose = () => {} }) {
  if (!open) return <></>;

  return ReactDOM.createPortal(
    <div className={`modal ${className}`.trim()}>
      <div className='modal-container'>{children}</div>
      <div className='modal-backdrop' onClick={onClose}></div>
    </div>,
    document.getElementsByClassName('app')[0]
  );
}

export default Modal;
