import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  settings: belongsTo(),
  meals:    hasMany()
});
