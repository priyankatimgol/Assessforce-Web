import {} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import './styles/appTransition.css';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/Store.js';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProviderWrapper from './context/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProviderWrapper>
        <App />
      </ThemeProviderWrapper>
    </PersistGate>
  </Provider>
);
