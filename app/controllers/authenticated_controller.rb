class AuthenticatedController < ApplicationController
  include ActionController::HttpAuthentication::Token::ControllerMethods

  # Default error when the authenticated user don't have permission to do
  # somehting
  class InvalidRole < StandardError; end
  rescue_from self::InvalidRole, with: :invalid_permission

  before_action :authenticate_user_from_token!
  before_action :authenticate_user!

  # Handle erors of permission
  def invalid_permission(exception)
    message = { error: { title: I18n.t(:invalid_role, scope: :authorization) } }
    render message, status: :not_acceptable
  end

  private

    # Create an authentication based on a token
    def authenticate_user_from_token!
      authenticate_with_http_token do |token, options|
        user_email = options[:email].presence
        user = user_email && User.find_by_email(user_email)

        if user && Devise.secure_compare(user.authentication_token, token)
          sign_in user, store: false
        end
      end
    end
end
