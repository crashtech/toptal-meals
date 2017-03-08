import Ember from 'ember';
import JSONAPISerializer from 'ember-data/serializers/json-api';

const { String: { singularize, capitalize } } = Ember;
export default JSONAPISerializer.extend({
  keyForAttribute(key) {
    return key;
  },
  keyForRelationship(key) {
    return key;
  },
  payloadKeyFromModelName(modelName) {
    return singularize(capitalize(modelName));
  }
});
