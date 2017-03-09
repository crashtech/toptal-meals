import Ember from 'ember';

const service = Ember.inject.service;
export default Ember.Component.extend({
  currentUser: service('current-user'),

  // Get all messages from servcie and clean it
  init() {
    this._super(...arguments);
    let role = this.get('currentUser.data.role');
    this.set(role, true);
  }
});
