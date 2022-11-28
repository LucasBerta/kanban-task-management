import './Textarea.scss';

function Textarea({
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
  rows,
}) {
  return (
    <div className={`app-textarea-wrapper ${fullWidth ? 'app-textarea-full-width' : ''} ${classNameContainer}`.trim()}>
      {label && <label className='app-textarea-label'>{label}</label>}
      <div className='app-textarea-container'>
        <textarea
          id={id}
          className={`app-textarea ${className}`.trim()}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          rows={rows}
        />
        {iconComponent}
      </div>
    </div>
  );
}

export default Textarea;
