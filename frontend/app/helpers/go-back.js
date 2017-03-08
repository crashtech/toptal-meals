import Ember from 'ember';
import { ACTION } from 'ember-route-action-helper/-private/internals';

export default Ember.Helper.extend({
  compute() {
    let backAction = () => {
      Ember.run.scheduleOnce('afterRender', history, 'back');
    };

    backAction[ACTION] = true;
    return backAction;
  }
});
