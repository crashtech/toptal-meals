import Ember from 'ember';
import Debounceable from './debounceable';

export default Ember.Mixin.create(Debounceable, {
  search: '',

  // Get the query params from request
  beforeModel(transition) {
    this._super(transition);
    let params = transition.queryParams;
    if(params.q) {
      this.set('search', params.q);
    }
  },

  // Create the connection between controller search and this one
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('search', this.get('search'));
  },

  // Return the request parameters
  searchQuery() {
    return this.get('search');
  },

  // Debounce search event
  actions: {
    searchChanged(value) {
      this.singleDebounce('search', 500, () => {
        this.set('search', value);
        this.refresh();
      });
    }
  }
});
