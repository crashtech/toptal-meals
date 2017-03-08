import Ember from 'ember';

const service = Ember.inject.service;
export default Ember.Service.extend({
  session: service('session'),
  store: service('store'),
  data: null,

  // Load user information
  load() {
    if(this.get('session.isAuthenticated')) {
      let query = this.get('store').queryRecord('profile', {});
      return query.then((user) => {
        this.set('data', user);
        this.set(user.get('role'), true);
      });
    } else {
      return Ember.RSVP.Promise.resolve();
    }
  }
});
