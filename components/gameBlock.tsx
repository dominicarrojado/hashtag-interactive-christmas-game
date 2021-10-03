import React, { useState } from 'react';
import styles from '../styles/gameBlock.module.css';
import homeStyles from '../styles/home.module.css';
import GameStart from './gameStart';
import GameMain from './gameMain';

function GameBlock() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <section className={`${styles.gameBlock} ${homeStyles.block}`}>
      {!gameStarted ? (
        <GameStart btnOnClick={() => setGameStarted(true)} />
      ) : (
        <GameMain />
      )}
    </section>
  );
}

export default GameBlock;
