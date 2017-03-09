import Ember from 'ember';

export default Ember.Mixin.create({
  size: null,
  page: 1,

  // Get the page params from request
  beforeModel(transition) {
    this._super(transition);
    let params = transition.queryParams;
    if(params.page) {
      this.set('page', params.page);
    }
    if(params.size) {
      this.set('size', params.size);
    }
  },

  // Return the request parameters
  pagination() {
    return {
      number: this.getWithDefault('page', 1),
      size: this.getWithDefault('size', null)
    };
  },

  // Change the current page
  actions: {
    goToPage(number) {
      let links = this.get('controller.model.links');
      let last = links.last || links.self;
      let page = this.get('page');

      if(number >= 1 && number <= last && page !== number) {
        this.set('page', number);
        this.refresh();
      }
    }
  }
});
