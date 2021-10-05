import React, { useState } from 'react';
import GameStart from './gameStart';
import GameMain from './gameMain';
import { BUTTON_CLICK_DELAY } from '../lib/constants';
import styles from '../styles/gameBlock.module.css';
import homeStyles from '../styles/home.module.css';

function GameBlock() {
  const [gameStarted, setGameStarted] = useState(false);
  const btnOnClick = () => {
    window.setTimeout(() => {
      setGameStarted(true);
    }, BUTTON_CLICK_DELAY);
  };

  return (
    <section className={`${styles.gameBlock} ${homeStyles.block}`}>
      {!gameStarted ? <GameStart btnOnClick={btnOnClick} /> : <GameMain />}
    </section>
  );
}

export default GameBlock;
