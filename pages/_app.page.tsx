import type { AppProps } from 'next/app';
import SeoTag from '../components/seoTags';
import TagManager from '../components/tagManager';
import Layout from '../components/layout';
import 'normalize.css';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SeoTag />
      <TagManager />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default App;
