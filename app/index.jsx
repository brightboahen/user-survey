/**
 * Created by brightboahen on 10/03/2016.
 */
require('./main.css');
import React from 'react';
import QuestionComponent from  './question_comp';
import { render } from 'react-dom';

render(
    <QuestionComponent title="Survey"/>,
    document.getElementById('app')
);