import { render, screen } from '@testing-library/react';
import { getFakeSentences, getFakeWord } from '../../lib/test-helpers';
import Button from '../button';

describe('<Button />', () => {
  it('should render children', () => {
    const children = getFakeSentences();

    render(<Button>{children}</Button>);

    const btnEl = screen.queryByText(children);

    expect(btnEl?.tagName).toBe('BUTTON');
  });

  it('should accept className prop', () => {
    const children = getFakeSentences();
    const className = getFakeWord();

    render(<Button className={className}>{children}</Button>);

    const btnEl = screen.queryByText(children);

    expect(btnEl).toHaveClass(className);
  });
});
