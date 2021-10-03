import { render } from '@testing-library/react';
import InfoBlock from '../infoBlock';

describe('<InfoBlock />', () => {
  it('should render without errors', () => {
    const { container } = render(<InfoBlock />);

    expect(container).toBeInTheDocument();
  });
});
