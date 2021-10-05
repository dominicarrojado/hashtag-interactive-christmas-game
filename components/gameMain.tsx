import React, { useEffect, useRef, useState } from 'react';
import { getRefValue } from '../lib/hooks';
import { getRandomNumber } from '../lib/random';
import Tile from './tile';
import {
  COUNTDOWN_SPEED,
  PATTERNS_DISPLAY_SPEED,
  SUCCESS_TEXTS,
  SUCCESS_TEXTS_COUNT,
} from '../lib/constants';
import styles from '../styles/gameMain.module.css';

function GameMain() {
  const tiles = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  const intervalRef = useRef(0);
  const timeoutRef = useRef(0);
  const patternsRef = useRef<Array<number>>([]);
  const playerIdxRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const [isPlayersTurn, setIsPlayersTurn] = useState(false);
  const [info, setInfo] = useState('...');
  const [score, setScore] = useState(0);
  const [activeTile, setActiveTile] = useState(-1);
  const [isGameOver, setIsGameOver] = useState(false);
  const showPatterns = (idx: number, patterns: Array<number>) => {
    timeoutRef.current = window.setTimeout(() => {
      if (idx === patterns.length) {
        playerIdxRef.current = 0;
        setIsPlayersTurn(true);
        setInfo('Your turn...');
        return;
      }

      setActiveTile(patterns[idx]);

      timeoutRef.current = window.setTimeout(() => {
        setActiveTile(-1);
        showPatterns(idx + 1, patterns);
      }, PATTERNS_DISPLAY_SPEED);
    }, PATTERNS_DISPLAY_SPEED);
  };
  const updatePatternsAndShow = () => {
    const randomNumber = getRandomNumber(0, 8);
    let patterns = getRefValue(patternsRef);
    patterns = [...patterns, randomNumber];
    patternsRef.current = patterns;

    isTransitioningRef.current = false;

    setIsPlayersTurn(false);
    setInfo('...');
    showPatterns(0, patterns);
  };
  const startCountdown = () => {
    let count = 3;
    const updateInfo = () => {
      setInfo(`Game starting in ${count}...`);
    };

    updateInfo();

    intervalRef.current = window.setInterval(() => {
      count -= 1;

      updateInfo();

      if (count === -1) {
        clearInterval(intervalRef.current);
        updatePatternsAndShow();
      }
    }, COUNTDOWN_SPEED);
  };
  const restartGame = () => {
    patternsRef.current = [];
    setActiveTile(-1);
    setIsGameOver(false);
    setScore(0);
    startCountdown();

    // scroll down to bottom for mobile
    window.scrollTo(0, document.body.scrollHeight);
  };
  const updateSuccessText = () => {
    const successIdx = getRandomNumber(0, SUCCESS_TEXTS_COUNT - 1);

    setInfo(SUCCESS_TEXTS[successIdx]);
  };
  const tileOnClick = (tile: number) => {
    const isTransitioning = getRefValue(isTransitioningRef);

    if (isTransitioning) {
      return;
    }

    const patterns = getRefValue(patternsRef);
    const playerIdx = getRefValue(playerIdxRef);

    if (patterns[playerIdx] === tile) {
      updateSuccessText();
      setScore((value) => value + 10);

      if (playerIdx === patterns.length - 1) {
        isTransitioningRef.current = true;
        timeoutRef.current = window.setTimeout(
          updatePatternsAndShow,
          PATTERNS_DISPLAY_SPEED
        );
      } else {
        playerIdxRef.current = playerIdx + 1;
      }
    } else {
      setActiveTile(patterns[playerIdx]);
      setIsGameOver(true);
      setIsPlayersTurn(false);
      setInfo('Wrong!');
    }
  };

  useEffect(() => {
    restartGame();

    return () => {
      window.clearInterval(getRefValue(intervalRef));
      window.clearTimeout(getRefValue(timeoutRef));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.gameMain}>
      <div className={styles.gameStatus}>
        <span data-testid="info">{info}</span>
        {isGameOver && (
          <>
            {' '}
            <button
              type="button"
              className={styles.gameRetry}
              onClick={restartGame}
            >
              Play again?
            </button>
          </>
        )}
      </div>
      <div className={styles.gameTiles}>
        {tiles.map((tileRow, idx) => (
          <div key={`row-${idx}`} className={styles.gameRow}>
            {tileRow.map((tile) => (
              <Tile
                key={`tile-${tile}`}
                active={tile === activeTile}
                disabled={!isPlayersTurn}
                className={tile === 2 ? styles.tileSpecial : undefined}
                onClick={() => tileOnClick(tile)}
                data-testid="tile"
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.gameScore}>
        <div>Score</div>
        <div className={styles.gameScoreValue} data-testid="score">
          {score}
        </div>
      </div>
    </div>
  );
}

export default GameMain;
