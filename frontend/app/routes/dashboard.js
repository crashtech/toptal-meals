import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const service = Ember.inject.service;
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: service('current-user'),

  model() {
    let role = this.get('currentUser.data.role');
    let filter = this.referenceToFilter();
    if(role !== 'user') {
      return [];
    }

    return this.store.query('meal', filter);
  },

  dateToReference(date) {
    let reference = {month: date.getMonth() + 1, year: date.getFullYear()};
    this.set('reference', reference);
  },

  referenceToFilter() {
    let reference = this.get('reference');
    if(!reference) {
      this.dateToReference(new Date());
      reference = this.get('reference');
    }

    return { month_details: `${reference.year}-${reference.month}`};
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('settings', this.store.queryRecord('settings', {}));
    controller.set('reference', this.get('reference'));
  },

  actions: {
    changeReference(amount) {
      amount -= 1;
      let reference = this.get('reference');
      this.dateToReference(new Date(reference.year, reference.month + amount));
      this.refresh();
    }
  }
});
