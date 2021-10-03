import { render } from '@testing-library/react';
import * as GameBlock from '../../components/gameBlock';
import * as InfoBlock from '../../components/infoBlock';
import Home from '../index.page';

describe('<Home />', () => {
  it('should render the block components', () => {
    const infoBlockSpy = jest.spyOn(InfoBlock, 'default');
    const gameBlockSpy = jest.spyOn(GameBlock, 'default');

    render(<Home />);

    expect(infoBlockSpy).toBeCalledTimes(1);
    expect(gameBlockSpy).toBeCalledTimes(1);
  });
});
