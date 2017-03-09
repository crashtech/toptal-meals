import Ember from 'ember';

// const extend = Ember.$.extend;
const proxySave = {
  save(options) {
    return this._super(options).then((object) => {
      copyModelTo(this, this.get('_original'), true);
      return object;
    });
  }
};

export default Ember.Mixin.create({
  model() {
    let name = this.routeName;
    let model = this.modelFor(name.substr(0, name.lastIndexOf('.')));
    return this.get('copyOnly') ? this.copyModel(model) : model;
  },

  // Generate a copy of a model
  copyModel(reference) {
    if(reference.then) {
      return reference.then(value => this.copyModel(value));
    }

    // Start the new record
    var modelName = reference._internalModel.modelName;
    var model = reference.store.createRecord(modelName);

    // Copty attributes
    this.copyModelTo(reference, model, true);

    // Reopen the model to proxy the save
    model.reopen(proxySave);

    // Set the original model and return object
    model.set('_original', reference);
    return model;
  },

  // Copy model attributes from one to another
  copyModelTo() {
    copyModelTo(...arguments);
  }
});

function copyModelTo(reference, destination, id) {
  // Copy basic attributes
  reference.eachAttribute((attr) => {
    destination.set(attr, reference.get(attr));
  });

  // Copy relationships
  reference.eachRelationship((attr) => {
    let value = reference.get(attr);
    if(value.constructor === Array) {
      destination.set(attr, value.slice());
    } else {
      destination.set(attr, value);
    }
  });

  // Copy the state and maybe the id
  destination._internalModel.currentState = reference._internalModel.currentState;
  if(id === true) {
    destination.set('id', reference.get('id'));
  } else if(id) {
    destination.set('id', id);
  }
}
