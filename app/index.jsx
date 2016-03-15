/**
 * Created by brightboahen on 10/03/2016.
 */
require('./main.css');
import React from 'react';
import QuestionsPage from  './questions_page';
import { render } from 'react-dom';

render(
    <QuestionsPage title="Survey"/>,
    document.getElementById('app')
);