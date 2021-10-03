import React, { HTMLProps } from 'react';
import styles from '../styles/button.module.css';

function Button({
  className,
  children,
  ...props
}: HTMLProps<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type="button"
      className={`${styles.btn} ${className || ''}`}
    >
      {children}
    </button>
  );
}

export default Button;
