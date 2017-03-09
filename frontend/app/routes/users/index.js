import Ember from 'ember';
import Paginable from 'frontend/mixins/paginable';
import Searchable from 'frontend/mixins/searchable';
import Resourceable from 'frontend/mixins/resourceable';

export default Ember.Route.extend(Paginable, Searchable, Resourceable, {
  resource: 'user'
});
