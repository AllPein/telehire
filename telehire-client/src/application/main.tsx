import ReactDOM from 'react-dom/client';
import App from './App';
import { TOKEN_NAME } from '@/constants/localStorage';

localStorage.removeItem(TOKEN_NAME);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
);
