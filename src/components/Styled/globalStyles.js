import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(/assets/gradient.png);
    margin: 0;
    padding: 0;
    height: 100%;
    background-size: 100vw 100vh;
    background-repeat: no-repeat;
    overflow: hidden;
  }
`;

export default GlobalStyle;
