import Ember from 'ember';
import InheritedModel from 'frontend/mixins/inherited-model';

export default Ember.Route.extend(InheritedModel, {
  copyOnly: true,

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('users', this.store.query('user', { role: 'user' }));
  },

  actions: {
    save(record) {
      record.save().then(() => {
        let message = `Meal '${record.get('title')}' edited.`;
        this.get('flash').ok(message);
        this.transitionTo('meals');
      }).catch((reason) => {
        this.get('flash').error(reason.errors).now();
      });
    },
  }
});
