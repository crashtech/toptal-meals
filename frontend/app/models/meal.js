import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  title:         DS.attr('string'),
  calories:      DS.attr('number'),
  date:          DS.attr('string'),
  time:          DS.attr('string'),
  dateFormatted: DS.attr('string'),
  timeFormatted: DS.attr('string'),
  dateTimeAgo:   DS.attr('string'),

  user:        DS.belongsTo('user')
});
