class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActionController::ParameterMissing, with: :invalid_data

  API_CONTENT_TYPE = 'application/vnd.api+json'.freeze

  Deserializer = ActiveModelSerializers::Deserialization

  # Just so it has a root url
  def index
    version = { version: 'v1' }
    render version
  end

  # Handle erors on ActiveRecord::Base#find
  def record_not_found(exception)
    message = { errors: [{ title: exception.message }] }
    render message, status: :not_found
  end

  # Handle errors with strong paraeters
  def invalid_data(exception)
    message = { errors: [{ title: exception.message }] }
    render message, status: :bad_request
  end

  # Handle all the answers from devise
  def respond_with(resource, *args)
    if resource.blank?
      render nil
    elsif resource.is_a?(ActiveModel::Errors)
      model = resource.instance_variable_get(:@base)
      render model, status: :unprocessable_entity
    elsif !resource.valid?
      render resource, status: :unprocessable_entity
    else
      render resource, adapter: :attributes, serializer: SessionSerializer
    end
  end

  # Disable devise flash messages
  def is_flashing_format?
    false
  end

  # Disable devise redirections
  def is_navigational_format?
    false
  end

  protected

    # Wrap most of the resoruces available for answering as a JSON Api
    def render(object, includes: true, queryable: nil, paginable: nil, **args)
      includes = params[:include] if includes === true
      args[:include] = includes unless includes.blank?

      paginable = true if queryable && paginable.nil?
      object = object_with_query(object) if queryable
      object = object_with_pages(object) if paginable

      if object.is_a?(ActiveRecord::Base) && object.errors.present?
        serializer = ActiveModel::Serializer::ErrorSerializer
        args.merge!(json: object, serializer: serializer)
      else
        args.merge!(object.nil? ? { status: :no_content } : { json: object })
      end

      super(args)
    end

    # Proxy params to get JSON Api data propertly
    #
    # It helps to keep params as ActionController::Parameters and enable
    # strong parameters as well
    #
    # Its behavior can be customized by implementing #deserialize on child
    # controllers, it sends the JSON as Hash allowing custom configurations
    # for ActiveModelSerializers::Deserialization process
    def params
      original = super
      return original if request.body.size.zero? || request.body.eof?
      return original unless request.headers['Content-Type'].eql?(API_CONTENT_TYPE)

      # Read the data as JSON and force keys as underscore
      json = JSON.parse(request.body.read)

      # If it's an empty body, return the original
      return original if json.empty?

      # Deserialize using controller method or the default behavior
      deserialized = begin
        if methods.include?(:deserialize)
          deserialize(json)
        else
          Deserializer.jsonapi_parse(json)
        end
      end

      # Check the integrity of the JSON
      unless json.key?('data') && json['data'].key?('type')
        raise ActionController::ParameterMissing.new('Invalid parameters.')
      end

      # Merge the data under the type key
      type = json['data']['type'].demodulize.underscore
      original.merge!(type => deserialized)
    end

  private

    # Check for a JSON Api query argument
    def object_with_query(object)
      return object unless params.key?(:q) && !params[:q].blank?
      object.query(params[:q])
    end

    # Check for a JSON Api page argument
    def object_with_pages(object)
      return object unless params.key?(:page)
      page = params[:page]

      object = object.page(page[:number])
      object = object.per(page[:size]) if page.key?(:size)
      return object
    end
end
