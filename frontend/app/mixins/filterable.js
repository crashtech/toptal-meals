import Ember from 'ember';

const underscore = Ember.String.underscore;
export default Ember.Mixin.create({
  filters: new Ember.Object(),

  // Create the connection between controller search and this one
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('filters', this.get('filters'));
  },

  // Return the request parameters
  filterQuery() {
    let values = this.get('filters');
    let filters = {};

    for(var key in values) {
      if(values.hasOwnProperty(key) && key !== "toString") {
        filters[underscore(key)] = values.get(key);
      }
    }

    return filters;
  },

  // Debounce search event
  actions: {
    applyFilters() {
      this.refresh();
    }
  }
});
