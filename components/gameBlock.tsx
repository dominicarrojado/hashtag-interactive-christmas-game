import React, { useState } from 'react';
import { trackEvent } from '../lib/google-analytics';
import GameStart from './gameStart';
import GameMain from './gameMain';
import { GoogleAnalyticsEvents } from '../lib/types';
import { BUTTON_CLICK_DELAY, PROJECT_TITLE } from '../lib/constants';
import styles from '../styles/gameBlock.module.css';
import layoutStyles from '../styles/layout.module.css';

function GameBlock() {
  const [gameStarted, setGameStarted] = useState(false);
  const btnOnClick = () => {
    window.setTimeout(() => {
      setGameStarted(true);
    }, BUTTON_CLICK_DELAY);

    trackEvent({
      event: GoogleAnalyticsEvents.GAME_START,
      projectTitle: PROJECT_TITLE,
    });
  };

  return (
    <section className={`${styles.gameBlock} ${layoutStyles.block}`}>
      {!gameStarted ? <GameStart btnOnClick={btnOnClick} /> : <GameMain />}
    </section>
  );
}

export default GameBlock;
