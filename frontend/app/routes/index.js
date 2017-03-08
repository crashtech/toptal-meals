import Ember from 'ember';

const service = Ember.inject.service;
export default Ember.Route.extend({
  session: service('session'),

  beforeModel() {
    if(this.get('session.isAuthenticated')){
      this.transitionTo('dashboard');
    } else {
      this.transitionTo('auth.sign-in');
    }
  }

});
