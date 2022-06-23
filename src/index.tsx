import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './frontend/App';
import { store } from './frontend/redux/store';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
