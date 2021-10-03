import { fireEvent, render } from '@testing-library/react';
import { getFakeWord } from '../../lib/test-helpers';
import Tile from '../tile';

describe('<Tile />', () => {
  it('should accept active prop', () => {
    const { container } = render(<Tile active />);

    const btnEl = container.firstChild as HTMLButtonElement;

    expect(btnEl.tagName).toBe('BUTTON');
  });

  it('should accept className prop', () => {
    const className = getFakeWord();

    const { container } = render(<Tile className={className} />);

    const btnEl = container.firstChild as HTMLButtonElement;

    expect(btnEl).toHaveClass(className);
  });

  it('should callback on click', () => {
    const onClickMock = jest.fn();

    const { container } = render(<Tile onClick={onClickMock} />);

    const btnEl = container.firstChild as HTMLButtonElement;

    fireEvent.click(btnEl);

    expect(onClickMock).toBeCalledTimes(1);
  });
});
