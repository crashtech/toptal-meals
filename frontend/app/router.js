import Ember from 'ember';
import resources from './utils/resources';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Ember.RouterDSL.prototype.resources = resources;
Router.map(function() {
  this.route('auth.sign-in',          { path: '/sign-in' });
  this.route('auth.sign-up',          { path: '/sign-up' });
  this.route('auth.sign-out',         { path: '/sign-out' });
  this.route('auth.token-access',     { path: '/token-access' });
  this.route('auth.recover-password', { path: '/recover-password' });

  this.route('dashboard');
  this.route('settings', () => {});

  this.resources('meals');
});

export default Router;
