import React from 'react';
import styles from '../styles/gameStart.module.css';
import Button from './button';

function GameStart({ btnOnClick }: { btnOnClick: () => void }) {
  return (
    <div className={styles.gameStart}>
      <Button onClick={btnOnClick}>Start the game</Button>
    </div>
  );
}

export default GameStart;
