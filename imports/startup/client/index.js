import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../both/api';
import './api';
import './on-login.js';
import '../../ui/stylesheets/app.scss';

Meteor.startup(() => 
    {
        render(<App />, document.getElementById('react-root'))
    });
