class SessionSerializer < ApplicationSerializer
  attributes :email
  attribute :token do
    object.authentication_token
  end
end
