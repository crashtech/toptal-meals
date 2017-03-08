import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { String: { underscore } } = Ember;
export default JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:devise',
  namespace: '/api',

  // Ensure plural form for types
  pathForType(type) {
    return underscore(type);
  }
});
