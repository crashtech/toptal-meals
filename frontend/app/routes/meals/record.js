import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let id = params.meal_id;
    return this.store.findRecord('meal', id, { reload: true }).catch(() => {
      this.get('flash').error('Meal not found');
      this.transitionTo('meals');
    });
  }
});
