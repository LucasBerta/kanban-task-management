import './Input.scss';
import { useState } from 'react';

export default function Input({
  id = '',
  className = '',
  classNameContainer = '',
  value,
  onChange = () => {},
  placeholder = '',
  label = '',
  fullWidth = false,
  iconComponent,
  autoFocus,
  required,
}) {
  const [touched, setTouched] = useState(false);

  return (
    <div
      className={`app-input-wrapper ${fullWidth ? 'app-input-full-width' : ''} ${classNameContainer} ${
        requiredError(required, value, touched) ? 'app-input-error' : ''
      }`.trim()}
    >
      {label && <label className='app-input-label'>{label}</label>}
      <div className='app-input-main-container'>
        <div className='app-input-container'>
          <input
            id={id}
            className={`app-input ${className}`.trim()}
            value={value}
            onChange={e => onChange(e, requiredError(required, e.target.value, touched))}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onBlur={e => {
              setTouched(true);
              onChange({ target: { value } }, requiredError(required, e.target.value, true));
            }}
          />
          {requiredError(required, value, touched) && <span role='alert'>Can't be empty</span>}
        </div>
        {iconComponent}
      </div>
    </div>
  );
}

function requiredError(required, value, touched) {
  return required && touched && !value;
}
