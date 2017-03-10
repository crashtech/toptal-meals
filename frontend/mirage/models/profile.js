import Ember from 'ember';
import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

Ember.Inflector.inflector.uncountable('profile');
export default Model.extend({
  settings: belongsTo(),
  meals:    hasMany()
});
