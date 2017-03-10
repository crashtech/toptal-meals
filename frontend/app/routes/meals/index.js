import Ember from 'ember';
import Paginable from 'frontend/mixins/paginable';
import Filterable from 'frontend/mixins/filterable';
import Searchable from 'frontend/mixins/searchable';
import Resourceable from 'frontend/mixins/resourceable';

export default Ember.Route.extend(Paginable, Filterable, Searchable, Resourceable, {
  resource: 'meal'
});
