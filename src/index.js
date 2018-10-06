import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import Routing from './components/Routing/Routing';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routing />, document.getElementById('root'));
registerServiceWorker();
