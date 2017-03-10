import Ember from 'ember';
import { Model, belongsTo } from 'ember-cli-mirage';

Ember.Inflector.inflector.uncountable('settings');
export default Model.extend({
  user: belongsTo()
});
