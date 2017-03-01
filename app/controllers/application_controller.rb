class ApplicationController < ActionController::API
  API_CONTENT_TYPE = 'application/vnd.api+json'.freeze

  Deserializer = ActiveModelSerializers::Deserialization

  # Just so it has a root url
  def index
    version = { version: 'v1' }
    render json: version
  end

  protected

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
end
