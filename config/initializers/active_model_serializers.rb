# Set some configurations up for ActiveModelDerializers

# User JSON Api as default communication
ActiveModelSerializers.config.adapter = :json_api
# Add camel case for attribute-like responses
ActiveModelSerializers.config.key_transform = :camel_lower

# Pagination modification
require Rails.root.join('lib/serializers_pagination')
