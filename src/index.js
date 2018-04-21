import React from 'react';
import { render } from 'react-dom'; //only taking one method

// Import Components
import Router from './components/Router';

// Import Styles
import './css/style.css';


render(<Router />, document.querySelector('#main'));
