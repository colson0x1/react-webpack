import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';

// These modules are being dynamically loaded
// import ArtistDetail from './components/artists/ArtistDetail';
// import ArtistCreate from './components/artists/ArtistCreate';
// import ArtistEdit from './components/artists/ArtistEdit';

// @ Route configuration object
// Transform JSX route structure into Plain Javascript Object
const componentRoutes = {
  component: Home,
  path: '/',
  indexRoute: { component: ArtistMain },
  childRoutes: [
    {
      path: 'artists/new',
      // Asynchronously load the component
      getComponent(location, cb) {
        System.import('./components/artists/ArtistCreate').then((module) =>
          cb(null, module.default),
        );
      },
    },
    {
      path: 'artists/:id',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistDetail').then((module) =>
          cb(null, module.default),
        );
      },
    },
    {
      path: 'artists/:id/edit',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistEdit').then((module) =>
          cb(null, module.default),
        );
      },
    },
  ],
};

const Routes = () => {
  return <Router history={hashHistory} routes={componentRoutes} />;
};

/*
 * JSX structure routes
const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={Home}>
        <IndexRoute component={ArtistMain} />
        <Route path='artists/new' component={ArtistCreate} />
        <Route path='artists/:id' component={ArtistDetail} />
        <Route path='artists/:id/edit' component={ArtistEdit} />
      </Route>
    </Router>
  );
};
*/

export default Routes;
