import { render } from '@testing-library/react';
import * as SeoTags from '../../components/seoTags';
import * as InfoBlock from '../../components/infoBlock';
import * as GameBlock from '../../components/gameBlock';
import Home from '../index.page';

describe('<Home />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', () => {
    const seoTagsSpy = jest.spyOn(SeoTags, 'default');
    const infoBlockSpy = jest.spyOn(InfoBlock, 'default');
    const gameBlockSpy = jest.spyOn(GameBlock, 'default');

    render(<Home />);

    expect(seoTagsSpy).toBeCalledTimes(1);
    expect(infoBlockSpy).toBeCalledTimes(1);
    expect(gameBlockSpy).toBeCalledTimes(1);
  });
});
