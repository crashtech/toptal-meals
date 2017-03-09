import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let id = params.user_id;
    return this.store.findRecord('user', id, { reload: true }).catch(() => {
      this.get('flash').error('User not found');
      this.transitionTo('users');
    });
  }
});
