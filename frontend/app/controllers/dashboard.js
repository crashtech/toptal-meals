import Ember from 'ember';

const computed = Ember.computed;
const service = Ember.inject.service;
export default Ember.Controller.extend({
  account: service('current-user'),

  // Get the month title
  monthTitle: computed('reference', function() {
    let reference = this.get('reference');
    let date = new Date(reference.year, reference.month - 1);

    let month = date.toLocaleString('en-us', { month: "long" });
    return `${month} ${date.getFullYear()}`;
  })
});
