import React from 'react';
import styles from '../styles/gameMain.module.css';
import Tile from './tile';

function GameMain() {
  const rowOne = [0, 1, 2];
  const rowTwo = [3, 4, 5];
  const rowThree = [6, 7, 8];

  return (
    <div className={styles.gameMain}>
      <div className={styles.gameStatus}>
        Wrong! <button className={styles.gameRetry}>Play again?</button>
      </div>
      <div className={styles.gameTiles}>
        <div className={styles.gameRow}>
          {rowOne.map((tile) => (
            <Tile
              key={tile}
              className={tile === 2 ? styles.tileSpecial : undefined}
            />
          ))}
        </div>
        <div className={styles.gameRow}>
          {rowTwo.map((tile) => (
            <Tile key={tile} />
          ))}
        </div>
        <div className={styles.gameRow}>
          {rowThree.map((tile) => (
            <Tile key={tile} />
          ))}
        </div>
      </div>
      <div className={styles.gameScore}>
        <div>Score</div>
        <div className={styles.gameScoreValue}>0</div>
      </div>
    </div>
  );
}

export default GameMain;
