import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import '@fontsource/roboto/latin-300.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-700.css';
import './index.css';

const renderApp = () => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,

    document.getElementById('root')
  );
};

renderApp();
