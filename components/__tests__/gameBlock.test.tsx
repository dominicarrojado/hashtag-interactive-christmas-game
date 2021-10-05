import { act, fireEvent, render, screen } from '@testing-library/react';
import { BUTTON_CLICK_DELAY } from '../../lib/constants';
import * as GameStart from '../gameStart';
import * as GameMain from '../gameMain';
import GameBlock from '../gameBlock';

jest.useFakeTimers();

describe('<GameBlock />', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should display start by default', () => {
    const gameStartSpy = jest.spyOn(GameStart, 'default');
    const gameMainSpy = jest.spyOn(GameMain, 'default');

    render(<GameBlock />);

    expect(gameStartSpy).toBeCalledTimes(1);
    expect(gameMainSpy).not.toBeCalled();
  });

  it('should display main game on start', () => {
    const gameMainSpy = jest
      .spyOn(GameMain, 'default')

      // if not mocked, it renders twice due to component/game logic
      .mockImplementation(() => <></>);

    render(<GameBlock />);

    const btnEl = screen.queryByText('Start the game') as HTMLButtonElement;

    fireEvent.click(btnEl);

    act(() => {
      jest.advanceTimersByTime(BUTTON_CLICK_DELAY);
    });

    expect(gameMainSpy).toBeCalledTimes(1);
  });
});
