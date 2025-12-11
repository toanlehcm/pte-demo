import { ConfigProvider } from 'antd';
import { theme } from './theme/antd-theme';
import { AppRouter } from './routes';
import './App.css';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;
