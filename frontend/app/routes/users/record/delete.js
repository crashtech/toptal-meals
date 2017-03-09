import Ember from 'ember';
import InheritedModel from 'frontend/mixins/inherited-model';

export default Ember.Route.extend(InheritedModel, {
  actions: {
    delete() {
      let model = this.get('controller.model');
      model.destroyRecord().then(() => {
        let message = `User '${model.get('firstName')}' deleted.`;
        this.get('flash').ok(message);
        this.transitionTo('users');
      }).catch((reason) => {
        this.get('flash').error(reason.errors).now();
      });
    }
  }
});
