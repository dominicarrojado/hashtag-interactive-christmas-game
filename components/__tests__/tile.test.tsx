import { fireEvent, render } from '@testing-library/react';
import { getFakeWord } from '../../lib/test-helpers';
import Tile from '../tile';

describe('<Tile />', () => {
  describe('active prop', () => {
    it('should have expected attribute if undefined', () => {
      const { container } = render(<Tile />);

      const btnEl = container.firstChild as HTMLButtonElement;

      expect(btnEl).toHaveAttribute('data-active', '0');
    });

    it('should have expected attribute if false', () => {
      const { container } = render(<Tile active={false} />);

      const btnEl = container.firstChild as HTMLButtonElement;

      expect(btnEl).toHaveAttribute('data-active', '0');
    });

    it('should have expected attribute if true', () => {
      const { container } = render(<Tile active />);

      const btnEl = container.firstChild as HTMLButtonElement;

      expect(btnEl).toHaveAttribute('data-active', '1');
    });
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
