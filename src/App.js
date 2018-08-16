import React from 'react';
import Alert from 'react-s-alert';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import { routes } from './data/routes';
import history from './utils/history';
import { Wrapper } from './utils/helpers';
import Header from './components/Header';

var data = require('./data/data.json');

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
        <Alert stack={{ limit: 1 }} />
          <Header />
          <Switch>
            {routes.map((route, i) => (
              <Route
                key={i}
                path={route.path}
                render={props =>
                  Wrapper(route.component)({
                    ...data
                  })
                }
              />
            ))}
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
