import { fireEvent, act, render, screen } from '@testing-library/react';
import { getFakeNumber, setReadOnlyProperty } from '../../lib/test-helpers';
import { COUNTDOWN_SPEED, PATTERNS_DISPLAY_SPEED } from '../../lib/constants';
import * as random from '../../lib/random';
import GameMain from '../gameMain';

jest.useFakeTimers();

describe('<GameMain />', () => {
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

      act(() => {
        // countdown
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
      });

      const infoEl = screen.queryByTestId('info');

      expect(infoEl).toHaveTextContent('...');
    });

    it('should highlight preview', () => {
      const randomIdx = getFakeNumber({ min: 0, max: 8 });

      jest.spyOn(random, 'getRandomNumber').mockReturnValue(randomIdx);

      render(<GameMain />);

      act(() => {
        // countdown
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);

        // showing pattern 1 (shown)
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

      act(() => {
        // showing pattern 1 (hidden)
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);

        // transitioning
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
      });

      const infoEl = screen.queryByTestId('info');

      expect(infoEl).toHaveTextContent('Your turn...');

      tiles.forEach((tileEl) => {
        expect(tileEl).toHaveAttribute('data-active', '0');
        expect(tileEl).not.toBeDisabled();
      });
    });

    it('should handle clicks during transitioning', () => {
      const randomIdx = getFakeNumber({ min: 0, max: 8 });

      jest.spyOn(random, 'getRandomNumber').mockReturnValue(randomIdx);

      render(<GameMain />);

      act(() => {
        // countdown
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);

        // showing pattern 1
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);

        // transitioning
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
      });

      const tiles = screen.queryAllByTestId('tile');

      expect(tiles).toHaveLength(9);

      fireEvent.click(tiles[randomIdx]);
      fireEvent.click(tiles[randomIdx]);

      const infoEl = screen.queryByTestId('info');
      const scoreEl = screen.queryByTestId('score');

      expect(infoEl).not.toHaveTextContent('Wrong!');
      expect(scoreEl).toHaveTextContent('10');
    });

    it('should continue if correct tile is clicked', () => {
      const randomIdx = getFakeNumber({ min: 0, max: 8 });

      jest.spyOn(random, 'getRandomNumber').mockReturnValue(randomIdx);

      render(<GameMain />);

      act(() => {
        // countdown
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);

        // showing pattern 1
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);

        // transitioning
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
      });

      const tiles = screen.queryAllByTestId('tile');

      expect(tiles).toHaveLength(9);

      fireEvent.click(tiles[randomIdx]);

      const infoEl = screen.queryByTestId('info');
      const scoreEl = screen.queryByTestId('score');

      expect(infoEl).not.toHaveTextContent('Wrong!');
      expect(scoreEl).toHaveTextContent('10');

      act(() => {
        // transitioning
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);

        // showing pattern 1
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);

        // showing pattern 2
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);

        // transitioning
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
      });

      fireEvent.click(tiles[randomIdx]);

      expect(infoEl).not.toHaveTextContent('Wrong!');
      expect(scoreEl).toHaveTextContent('20');
    });

    it('should be game over if wrong tile is clicked', () => {
      const wrongTileIdx = 0;
      const randomIdx = getFakeNumber({ min: wrongTileIdx + 1, max: 8 });

      jest.spyOn(random, 'getRandomNumber').mockReturnValue(randomIdx);

      render(<GameMain />);

      act(() => {
        // countdown
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);
        jest.advanceTimersByTime(COUNTDOWN_SPEED);

        // showing pattern 1
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);

        // transitioning
        jest.advanceTimersByTime(PATTERNS_DISPLAY_SPEED);
      });

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
});
