import './Input.scss';

function Input({
  id = '',
  className = '',
  classNameContainer = '',
  value,
  onChange = () => {},
  placeholder = '',
  label = '',
  fullWidth = false,
  iconComponent,
}) {
  return (
    <div
      className={`app-input-wrapper ${
        fullWidth ? 'app-input-full-width' : ''
      } ${classNameContainer}`.trim()}
    >
      {label && <label className='app-input-label'>{label}</label>}
      <div className='app-input-container'>
        <input
          id={id}
          className={`app-input ${className}`.trim()}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {iconComponent}
      </div>
    </div>
  );
}

export default Input;
