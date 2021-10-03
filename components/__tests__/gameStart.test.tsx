import { fireEvent, render, screen } from '@testing-library/react';
import GameStart from '../gameStart';

describe('<GameStart />', () => {
  it('should callback on button click', () => {
    const btnOnClickMock = jest.fn();

    render(<GameStart btnOnClick={btnOnClickMock} />);

    const btnEl = screen.queryByText('Start the game') as HTMLButtonElement;

    fireEvent.click(btnEl);

    expect(btnOnClickMock).toBeCalledTimes(1);
  });
});
