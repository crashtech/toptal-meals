import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.queryRecord('settings', {});
  },

  actions: {
    save(record) {
      record.save().then(() => {
        let message = `Settings edited.`;
        this.get('flash').ok(message);
        this.transitionTo('dashboard');
      }).catch((reason) => {
        this.get('flash').error(reason.errors).now();
      });
    },
  }
});
