import Ember from 'ember';
import InheritedModel from 'frontend/mixins/inherited-model';

export default Ember.Route.extend(InheritedModel, {
  copyOnly: true,

  actions: {
    save(record) {
      record.save().then(() => {
        let message = `User '${record.get('firstName')}' edited.`;
        this.get('flash').ok(message);
        this.transitionTo('users');
      }).catch((reason) => {
        this.get('flash').error(reason.errors).now();
      });
    },
  }
});
