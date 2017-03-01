import Ember from 'ember';

const computed = Ember.computed;
export default Ember.Component.extend({
  classNameBindings: ['hasPages::hidden'],
  classNames: ['pagination'],
  tagName: 'ul',

  showPages: 7,

  // Check whether it has pages to be shown
  hasPages: computed('data', function() {
    return this.get('data.self') !== undefined;
  }),

  // Generate the list of pages
  pages: computed('data', function() {
    var self = this.get('data.self');
    let last = this.get('data.last') || self || 0;
    let all = new Array(last + 1).join('x').split('').map((e,i) => {
      return {number: i + 1, current: (self === i + 1)};
    });

    let showPages = this.get('showPages');
    if(all.length > showPages) {
      showPages -= 1;
      let min = (self - 3 <= 0) ? 1 : self - 3;
      min = (min + showPages >= last) ? last - showPages : min;
      return all.slice(min - 1, min + showPages);
    } else {
      return all;
    }
  }),

  // Check if should have the last page link
  hasLastPage: computed('data', function() {
    return this.get('data.self') < this.get('data.last');
  }),

  // Check if should have the first page link
  hasFirstPage: computed('data', function() {
    return this.get('data.self') > 1;
  })
});
