
import { createGlobalStyle } from 'styled-components';
import WeatherApp from './components/WeatherApp';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #F8FAFC;
    color: #1F2937;
    line-height: 1.5;
  }

  html {
    scroll-behavior: smooth;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <WeatherApp />
    </>
  );
}

export default App;
