import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routes/AppRouter';





import '../node_modules/jquery/dist/jquery.js';
import '../node_modules/assets/js/core/popper.min.js';

import '../node_modules/normalize.css';
import './styles.css/style.scss';

import configureStore from '../src/store/configureStore';


const store = configureStore();


const jsx = ( <Provider store = { store } >
    <AppRouter />

    </Provider>
)



ReactDom.render(jsx, document.getElementById('app'))