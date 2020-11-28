import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.scss';
import App from './App/App';

const renderApp = () => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,

    document.getElementById('root')
  );
};

// HMR
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App/App', renderApp);
}

renderApp();
