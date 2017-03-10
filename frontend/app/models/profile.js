import Ember from 'ember';
import User from './user';

Ember.Inflector.inflector.uncountable('profile');
export default User.extend();
