import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-size: 10px;
    font-family: 'Roboto', sans-serif;
    height: 100%;
    box-sizing: border-box;
  }

  html{
    height: 100%;
  }

  a{
    text-decoration: none;
    &:visited{
      color: black;
    }
    @media(min-width: 768px){
    }
  }

  li{
    list-style-type: none;
  }

  h1{
    font-size: 2rem;
  }

  h2{
    font-size: 1.6rem;
  }

  p{
    font-size: 1.2rem;
  }

`;

export default GlobalStyle;