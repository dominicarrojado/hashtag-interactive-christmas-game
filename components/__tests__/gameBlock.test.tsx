import { fireEvent, render, screen } from '@testing-library/react';
import * as GameStart from '../gameStart';
import * as GameMain from '../gameMain';
import GameBlock from '../gameBlock';

describe('<GameBlock />', () => {
  it('should display start by default', () => {
    const gameStartSpy = jest.spyOn(GameStart, 'default');
    const gameMainSpy = jest.spyOn(GameMain, 'default');

    render(<GameBlock />);

    expect(gameStartSpy).toBeCalledTimes(1);
    expect(gameMainSpy).not.toBeCalled();
  });

  it('should display main game on start', () => {
    const gameMainSpy = jest.spyOn(GameMain, 'default');

    render(<GameBlock />);

    const btnEl = screen.queryByText('Start the game') as HTMLButtonElement;

    fireEvent.click(btnEl);

    expect(gameMainSpy).toBeCalledTimes(1);
  });
});
