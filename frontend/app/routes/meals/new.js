import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('meal');
  },

  actions: {
    save(record) {
      record.save().then(() => {
        let message = `Meal '${record.get('title')}' created.`;
        this.get('flash').ok(message);
        this.transitionTo('meals');
      }).catch((reason) => {
        this.get('flash').error(reason.errors).now();
      });
    }
  }
});
