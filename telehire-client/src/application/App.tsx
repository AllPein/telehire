import { Provider } from '@/application/Provider/Provider';
import { Root } from '@/application/Root/Root';
import '@twa-dev/sdk';
import './App.css';

function App() {
  return (
    <Provider>
      <Root />
    </Provider>
  );
}

export default App;
