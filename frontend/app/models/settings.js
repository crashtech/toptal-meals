import Ember from 'ember';
import DS from 'ember-data';

Ember.Inflector.inflector.uncountable('settings');
export default DS.Model.extend({
  caloriesPerDay: DS.attr('number'),
});
