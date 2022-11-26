import * as ReactDOM from 'react-dom';
import './Menu.scss';

function Menu({ anchor = '', position = '', open, onClose = () => {}, options = { label: '', onSelect: () => {} } }) {
  const anchorStyle = document.getElementById(anchor)?.getBoundingClientRect();

  function getTranslateByPosition() {
    if (position === 'left') return `translateX(-90%)`;
    if (position === 'right') return `translateX(10%)`;
    return `translateX(-40%)`;
  }

  if (!!anchor && !!anchorStyle) {
    const style = {
      position: 'fixed',
      top: anchorStyle.y,
      left: anchorStyle.x,
      transform: `translateY(${anchorStyle.height - 10}px) ${getTranslateByPosition()}`,
    };

    return ReactDOM.createPortal(
      <NoAnchorMenu anchor={anchor} open={open} onClose={onClose} options={options} style={style} />,
      document.getElementsByClassName('app')[0]
    );
  }

  return <NoAnchorMenu anchor={anchor} open={open} onClose={onClose} options={options} />;
}

function NoAnchorMenu({ anchor = '', open, onClose = () => {}, options = { label: '', onSelect: () => {} }, style = {} }) {
  return (
    <>
      {open && (
        <div className='menu-container'>
          <div className={`menu${open ? ' open' : ''}`} htmlFor={anchor} style={style}>
            <ul className='menu-options'>
              {options.map(option => (
                <li key={option.label} className='menu-option' onClick={option.onSelect}>
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
          <div className='menu-backdrop' onClick={onClose}></div>
        </div>
      )}
    </>
  );
}

export default Menu;
