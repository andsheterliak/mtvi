import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './modules/App/App';

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
  module.hot.accept('./modules/App/App', renderApp);
}

renderApp();
