import { render } from '@testing-library/react';
import * as InfoBlock from '../../components/infoBlock';
import * as GameBlock from '../../components/gameBlock';
import Home from '../index.page';

describe('<Home />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', () => {
    const infoBlockSpy = jest.spyOn(InfoBlock, 'default');
    const gameBlockSpy = jest.spyOn(GameBlock, 'default');

    render(<Home />);

    expect(infoBlockSpy).toBeCalledTimes(1);
    expect(gameBlockSpy).toBeCalledTimes(1);
  });
});
