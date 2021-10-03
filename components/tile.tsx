import React, { HTMLProps } from 'react';
import styles from '../styles/tile.module.css';

function Tile({
  className,
  active,
  children,
  ...props
}: HTMLProps<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      {...props}
      type="button"
      className={`${styles.tile} ${active ? styles.active : ''} ${
        className || ''
      }`}
    />
  );
}

export default Tile;
