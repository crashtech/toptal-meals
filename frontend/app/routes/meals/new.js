import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('meal');
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('users', this.store.query('user', { role: 'user' }));
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
