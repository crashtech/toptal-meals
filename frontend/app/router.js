import Ember from 'ember';
import resources from './utils/resources';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Ember.RouterDSL.prototype.resources = resources;
Router.map(function() {
});

export default Router;
