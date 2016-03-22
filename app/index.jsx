/**
 * Created by brightboahen on 10/03/2016.
 */
require('./styles/main.css');
import React from 'react';
import MainPage from  './components/main_page';
import { render } from 'react-dom';

render(
    <MainPage title="Survey"/>,
    document.getElementById('app')
);