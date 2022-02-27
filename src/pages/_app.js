import * as React from 'react';
import GlobalStyle from '../components/Styled/globalStyles.js';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
