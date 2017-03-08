import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

Ember.Route.reopen({
  flash: Ember.inject.service('flash'),
  hasLayout: true,
  setupController() {
    this._super(...arguments);
    this.controllerFor('application').set('showLayout', this.get('hasLayout'));
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
