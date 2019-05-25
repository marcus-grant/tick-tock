import React from 'react';
import { render } from 'react-dom';

// Imports for using Fontawesome, which should be imported early.
import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStop,
} from '@fortawesome/free-solid-svg-icons';

// Only importing one project-created component, the main App container.
import App from './containers/App';
import * as serviceWorker from './util/service-worker';

// Import the global stylesheet using webpack loaders
import './styles/main.scss';

// Prepare the FontAwesome icons library
library.add(faPlay, faPause, faStop);

// Register service worker


render(React.createElement(App), document.getElementById('react-root'));

// serviceWorker.register();
