import React from 'react';
import './Button.css';

/**
 * Reusable Button Component
 * @param {string} variant - 'primary' | 'secondary' | 'ghost'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} as - Component type ('button' | 'a')
 * @param {string} href - URL if rendered as anchor
 * @param {function} onClick - Click handler
 * @param {string} className - Additional classes
 * @param {object} children - Button content
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  onClick,
  className = '',
  children,
  ...props
}) => {
  const Component = as === 'a' ? 'a' : 'button';
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  const buttonProps = {
    className: classes,
    onClick,
    ...props,
  };

  if (Component === 'a' && href) {
    buttonProps.href = href;
  }

  return <Component {...buttonProps}>{children}</Component>;
};

export default Button;
