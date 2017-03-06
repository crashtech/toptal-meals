class ErrorsSerializer < ActiveModel::Serializer::ErrorSerializer
  attribute :title do
    model = object.model_name.human
    errors = object.errors.count
    I18n.t(:header, scope: [:errors, :template], count: errors, model: model)
  end

  attribute :detail do
    I18n.t(:body, scope: [:errors, :template])
  end
end
