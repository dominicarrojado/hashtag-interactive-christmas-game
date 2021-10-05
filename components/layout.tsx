import { ReactNode } from 'react';
import Script from 'next/script';
import styles from '../styles/layout.module.css';

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm"
        dangerouslySetInnerHTML={{
          __html: `
              if (window.location.hostname !== 'localhost') {
                (function (w, d, s, l, i) {
                  w[l] = w[l] || [];
                  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                  var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                  j.async = true;
                  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                  f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', 'GTM-TSMLTPT');
              }
            `,
        }}
      />

      <noscript
        dangerouslySetInnerHTML={{
          __html: `
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TSMLTPT"
              height="0"
              width="0"
              style="display: none; visibility: hidden"
            ></iframe>
          `,
        }}
      />
      {/* End Google Tag Manager */}

      <div className={styles.container}>{children}</div>
    </>
  );
}

export default Layout;
