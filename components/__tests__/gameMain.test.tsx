import { fireEvent, act, render, screen } from '@testing-library/react';
import { getFakeNumber, setReadOnlyProperty } from '../../lib/test-helpers';
import { GoogleAnalyticsEvents } from '../../lib/types';
import {
  COUNTDOWN_SPEED,
  PATTERNS_DISPLAY_SPEED,
  POINTS_PER_TILE,
  PROJECT_TITLE,
} from '../../lib/constants';
import * as random from '../../lib/random';
import * as ga from '../../lib/google-analytics';
import GameMain from '../gameMain';

jest.useFakeTimers();

describe('<GameMain />', () => {
  const skipCountdown = () => {
    act(() => {
      jest.advanceTimersByTime(COUNTDOWN_SPEED); // 3
      jest.advanceTimersByTime(COUNTDOWN_SPEED); // 2
      jest.advanceTimersByTime(COUNTDOWN_SPEED); // 1
      jest.advanceTimersByTime(COUNTDOWN_SPEED); // 0
    });
  };
  const skipPatternsDisplay = (numOfPatterns: number) => {
    act(() => {
      // transitioning
      if (numOfPatterns !== 1) {
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
      }

      // showing pattern "i"
      for (let i = 0; i < numOfPatterns; i++) {
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
      }

      // transitioning
      jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
    });
  };

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('scroll', () => {
    const scrollHeightOrig = document.body.scrollHeight;

    afterEach(() => {
      setReadOnlyProperty(document.body, 'scrollHeight', scrollHeightOrig);
    });

    it('should scroll to bottom on mount (for mobile)', () => {
      const scrollHeightMock = getFakeNumber({ min: 1 });
      const scrollToMock = jest.spyOn(window, 'scrollTo');

      setReadOnlyProperty(document.body, 'scrollHeight', scrollHeightMock);

      render(<GameMain />);

      expect(scrollToMock).toBeCalledTimes(1);
      expect(scrollToMock).toBeCalledWith(0, scrollHeightMock);
    });
  });

  describe('countdown', () => {
    beforeEach(() => {
      render(<GameMain />);
    });

    it('should display countdown from 3 - 0', () => {
      const infoEl = screen.queryByTestId('info');

      expect(infoEl).toHaveTextContent('Game starting in 3...');

      act(() => {
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
      });

      expect(infoEl).toHaveTextContent('Game starting in 2...');

      act(() => {
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
      });

      expect(infoEl).toHaveTextContent('Game starting in 1...');

      act(() => {
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
      });

      expect(infoEl).toHaveTextContent('Game starting in 0...');
    });

    it('should NOT allow tile clicks', () => {
      const tiles = screen.queryAllByTestId('tile');

      expect(tiles).toHaveLength(9);

      tiles.forEach((tileEl) => {
        expect(tileEl).toBeDisabled();
        expect(tileEl).toHaveAttribute('data-active', '0');
      });
    });

    it('should have a score of zero', () => {
      const score = screen.queryByTestId('score');

      expect(score).toHaveTextContent('0');
    });
  });

  describe('patterns', () => {
    it('should display dots', () => {
      render(<GameMain />);

      skipCountdown();

      const infoEl = screen.queryByTestId('info');

      expect(infoEl).toHaveTextContent('...');
    });

    it('should highlight preview', () => {
      const randomIdx = getFakeNumber({ min: 0, max: 8 });

      jest.spyOn(random, 'getRandomNumber').mockReturnValue(randomIdx);

      render(<GameMain />);

      skipCountdown();

      // showing pattern 1
      act(() => {
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
      });

      const tiles = screen.queryAllByTestId('tile');

      expect(tiles).toHaveLength(9);

      tiles.forEach((tileEl, idx) => {
        if (idx === randomIdx) {
          expect(tileEl).toHaveAttribute('data-active', '1');
        } else {
          expect(tileEl).toHaveAttribute('data-active', '0');
        }
        expect(tileEl).toBeDisabled();
      });

      // hiding pattern 1
      act(() => {
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
      });

      tiles.forEach((tileEl) => {
        expect(tileEl).toHaveAttribute('data-active', '0');
        expect(tileEl).toBeDisabled();
      });

      // transitioning
      act(() => {
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
      });

      const infoEl = screen.queryByTestId('info');

      expect(infoEl).toHaveTextContent('Your turn...');

      tiles.forEach((tileEl) => {
        expect(tileEl).toHaveAttribute('data-active', '0');
        expect(tileEl).not.toBeDisabled();
      });
    });

    it('should handle extra clicks during transitioning', () => {
      const randomIdx = getFakeNumber({ min: 0, max: 8 });

      jest.spyOn(random, 'getRandomNumber').mockReturnValue(randomIdx);

      render(<GameMain />);

      skipCountdown();
      skipPatternsDisplay(1);

      const tiles = screen.queryAllByTestId('tile');

      expect(tiles).toHaveLength(9);

      fireEvent.click(tiles[randomIdx]);
      fireEvent.click(tiles[randomIdx]); // extra click

      const infoEl = screen.queryByTestId('info');
      const scoreEl = screen.queryByTestId('score');

      expect(infoEl).not.toHaveTextContent('Wrong!');
      expect(scoreEl).toHaveTextContent(POINTS_PER_TILE.toString());
    });

    it('should continue if correct tile is clicked', () => {
      const randomIdx = getFakeNumber({ min: 0, max: 8 });

      jest.spyOn(random, 'getRandomNumber').mockReturnValue(randomIdx);

      render(<GameMain />);

      skipCountdown();
      skipPatternsDisplay(1);

      const tiles = screen.queryAllByTestId('tile');

      expect(tiles).toHaveLength(9);

      fireEvent.click(tiles[randomIdx]);

      const infoEl = screen.queryByTestId('info');
      const scoreEl = screen.queryByTestId('score');

      expect(infoEl).not.toHaveTextContent('Wrong!');
      expect(scoreEl).toHaveTextContent(POINTS_PER_TILE.toString());

      skipPatternsDisplay(2);

      fireEvent.click(tiles[randomIdx]);

      expect(infoEl).not.toHaveTextContent('Wrong!');
      expect(scoreEl).toHaveTextContent((POINTS_PER_TILE * 2).toString());
    });

    it('should be game over if wrong tile is clicked', () => {
      const wrongTileIdx = 0;
      const randomIdx = getFakeNumber({ min: wrongTileIdx + 1, max: 8 });

      jest.spyOn(random, 'getRandomNumber').mockReturnValue(randomIdx);

      render(<GameMain />);

      skipCountdown();
      skipPatternsDisplay(1);

      const tiles = screen.queryAllByTestId('tile');

      fireEvent.click(tiles[wrongTileIdx]);

      const infoEl = screen.queryByTestId('info');
      const scoreEl = screen.queryByTestId('score');

      expect(infoEl).toHaveTextContent('Wrong!');
      expect(scoreEl).toHaveTextContent('0');

      const retryEl = screen.queryByText('Play again?');

      expect(retryEl?.tagName).toBe('BUTTON');

      // should highlight correct tile
      expect(tiles).toHaveLength(9);

      tiles.forEach((tileEl, idx) => {
        if (idx === randomIdx) {
          expect(tileEl).toHaveAttribute('data-active', '1');
        } else {
          expect(tileEl).toHaveAttribute('data-active', '0');
        }
        expect(tileEl).toBeDisabled();
      });
    });
  });

  describe('analytics', () => {
    it('should NOT track event on mount (game auto start)', () => {
      const trackEventSpy = jest.spyOn(ga, 'trackEvent');

      render(<GameMain />);

      expect(trackEventSpy).not.toBeCalled();
    });

    it('should track event on game over', () => {
      const wrongTileIdx = 0;
      const randomIdx = getFakeNumber({ min: wrongTileIdx + 1, max: 8 });

      jest.spyOn(random, 'getRandomNumber').mockReturnValue(randomIdx);

      const trackEventSpy = jest.spyOn(ga, 'trackEvent');

      render(<GameMain />);

      skipCountdown();
      skipPatternsDisplay(1);

      const tiles = screen.queryAllByTestId('tile');

      expect(tiles).toHaveLength(9);

      fireEvent.click(tiles[randomIdx]);

      skipPatternsDisplay(2);

      fireEvent.click(tiles[randomIdx]);

      skipPatternsDisplay(3);

      fireEvent.click(tiles[randomIdx]);

      skipPatternsDisplay(4);

      fireEvent.click(tiles[randomIdx]);

      skipPatternsDisplay(5);

      fireEvent.click(tiles[wrongTileIdx]);

      expect(trackEventSpy).toBeCalledTimes(1);
      expect(trackEventSpy).toBeCalledWith({
        event: GoogleAnalyticsEvents.GAME_END_AUTO,
        projectTitle: PROJECT_TITLE,
        gameScore: POINTS_PER_TILE * 4,
      });
    });

    it('should track event on game restart', () => {
      const wrongTileIdx = 0;
      const randomIdx = getFakeNumber({ min: wrongTileIdx + 1, max: 8 });

      jest.spyOn(random, 'getRandomNumber').mockReturnValue(randomIdx);

      const trackEventSpy = jest.spyOn(ga, 'trackEvent');

      render(<GameMain />);

      skipCountdown();
      skipPatternsDisplay(1);

      const tiles = screen.queryAllByTestId('tile');

      fireEvent.click(tiles[wrongTileIdx]);

      trackEventSpy.mockClear();

      const restartBtn = screen.queryByText('Play again?') as HTMLButtonElement;

      fireEvent.click(restartBtn);

      expect(trackEventSpy).toBeCalledTimes(1);
      expect(trackEventSpy).toBeCalledWith({
        event: GoogleAnalyticsEvents.GAME_RESTART,
        projectTitle: PROJECT_TITLE,
      });
    });
  });
});
