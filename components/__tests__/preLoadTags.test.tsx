import { render } from '@testing-library/react';
import { FONTS, MAIN_URL } from '../../lib/constants';
import PreLoadTags from '../preLoadTags';

describe('<PreLoadTags />', () => {
  beforeEach(() => {
    render(<PreLoadTags />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render preload font tags', () => {
    const linkEls = document.querySelectorAll('link');

    expect(linkEls).toHaveLength(FONTS.length);

    linkEls.forEach((linkEl, idx) => {
      const fontName = FONTS[idx];

      expect(linkEl).toHaveAttribute(
        'href',
        `${MAIN_URL}fonts/${fontName}.ttf`
      );
      expect(linkEl).toHaveAttribute('rel', 'preload');
      expect(linkEl).toHaveAttribute('as', 'font');
      expect(linkEl).toHaveAttribute('type', 'font/ttf');
      expect(linkEl).toHaveAttribute('crossOrigin', 'anonymous');
    });
  });
});
