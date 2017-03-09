import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('user');
  },

  actions: {
    save(record) {
      record.save().then(() => {
        let message = `User '${record.get('firstName')}' created.`;
        this.get('flash').ok(message);
        this.transitionTo('users');
      }).catch((reason) => {
        this.get('flash').error(reason.errors).now();
      });
    }
  }
});
