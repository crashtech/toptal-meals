module Authentication
  module ClassMethods
    def login_user(extras = nil)
      extras = {} if extras.nil?
      before(:each) do
        @request.env['devise.mapping'] = Devise.mappings[:user]
        user = FactoryGirl.create(:user, extras)
        sign_in user
        @current_user = user
      end
    end

    def authenticate_user(extras = nil)
      extras = {} if extras.nil?
      before(:each) do
        user = FactoryGirl.create(:user, extras)
        $token = "Token token=\"#{user.authentication_token}\""
        $token << ", email=\"#{user.email}\""
        @current_user = user
      end
    end
  end

  module Tokenizer
    %w(
      get post patch put head delete xml_http_request
      xhr get_via_redirect post_via_redirect
    ).each do |method|

      define_method(method) do |*args|
        if $token
          args << {} unless args.last && args.last.is_a?(Hash)
          args.last[:headers] = {} unless args.last.key?(:headers)
          unless args.last[:headers].key?('Authorization')
            args.last[:headers]['Authorization'] = $token
          end
        end

        super(*args)
      end
    end
  end
end
