import './Button.scss';

function getThemeClassname(theme) {
  if (theme === 'secondary') return 'theme-secondary';
  if (theme === 'light') return 'theme-light';
  if (theme === 'accent') return 'theme-accent';
  return 'theme-primary';
}

function getVariantClassname(variant) {
  if (variant === 'icon') return 'variant-icon';
  if (variant === 'contained') return 'variant-contained';
  return 'variant-standard';
}

function Button({
  children,
  id = '',
  className = '',
  type = '',
  theme,
  variant,
  fullWidth,
  rounded = false,
  disabled,
  onClick = () => {},
  onSubmit = () => {},
}) {
  return (
    <button
      id={id}
      className={`app-button ${fullWidth ? 'app-button-full-width' : ''} ${
        rounded ? 'app-button-rounded' : ''
      } ${getThemeClassname(theme)} ${getVariantClassname(variant)} ${className}`.trim()}
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
