import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './modules/App/App';
import store from './store/store';

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,

    document.getElementById('root')
  );
};

// HMR
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./modules/App/App', renderApp);
}

renderApp();
