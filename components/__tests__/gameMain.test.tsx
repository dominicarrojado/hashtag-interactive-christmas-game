import { render } from '@testing-library/react';
import GameMain from '../gameMain';

describe('<GameMain />', () => {
  it('should render without errors', () => {
    const { container } = render(<GameMain />);

    expect(container).toBeInTheDocument();
  });
});
