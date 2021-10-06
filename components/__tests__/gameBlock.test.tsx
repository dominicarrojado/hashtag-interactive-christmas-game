import { act, fireEvent, render, screen } from '@testing-library/react';
import { BUTTON_CLICK_DELAY, PROJECT_TITLE } from '../../lib/constants';
import * as ga from '../../lib/google-analytics';
import * as GameStart from '../gameStart';
import * as GameMain from '../gameMain';
import GameBlock from '../gameBlock';
import { GoogleAnalyticsEvents } from '../../lib/types';

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
      .mockImplementation(() => <></>); // if not mocked, it renders twice due to component/game logic

    render(<GameBlock />);

    const btnEl = screen.queryByText('Start the game') as HTMLButtonElement;

    fireEvent.click(btnEl);

    act(() => {
      jest.advanceTimersByTime(BUTTON_CLICK_DELAY);
    });

    expect(gameMainSpy).toBeCalledTimes(1);
  });

  it('should track event on start', () => {
    const trackEventSpy = jest.spyOn(ga, 'trackEvent');

    render(<GameBlock />);

    const btnEl = screen.queryByText('Start the game') as HTMLButtonElement;

    fireEvent.click(btnEl);

    expect(trackEventSpy).toBeCalledTimes(1);
    expect(trackEventSpy).toBeCalledWith({
      event: GoogleAnalyticsEvents.GAME_START,
      projectTitle: PROJECT_TITLE,
    });
  });
});
