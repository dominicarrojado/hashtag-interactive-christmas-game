import { FONTS, MAIN_URL } from '../lib/constants';

function PreLoadTags() {
  return (
    <>
      {FONTS.map((font) => (
        <link
          key={font}
          rel="preload"
          href={`${MAIN_URL}fonts/${font}.ttf`}
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      ))}
    </>
  );
}

export default PreLoadTags;
