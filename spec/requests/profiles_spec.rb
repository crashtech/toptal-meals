require 'rails_helper'

RSpec.describe "Profile", type: :request do
  authenticate_user

  describe "GET /profile" do
    it "returns Ok" do
      get profile_path
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /profile" do
    context "with valid params" do
      it "returns Created" do
        params = { user: attributes_for(:user) }
        post profile_path, params: params
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid params" do
      it "returns Unprocessable Entity" do
        params = { user: attributes_for(:user, :invalid) }
        post profile_path, params: params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PUT/PATCH /profile" do
    context "with valid params" do
      it "returns Ok" do
        passw = @current_user.encrypted_password
        params = { user: attributes_for(:user) }
        put profile_path, params: params

        @current_user.reload
        expect(response).to have_http_status(:ok)
        expect(@current_user.encrypted_password).to_not be_eql(passw)
      end
    end

    context "with valid params and blank password" do
      it "returns Ok" do
        passw = @current_user.encrypted_password
        params = { user: attributes_for(:user, password: '', password_confirmation: '') }
        put profile_path, params: params

        @current_user.reload
        expect(response).to have_http_status(:ok)
        expect(@current_user.encrypted_password).to be_eql(passw)
      end
    end

    context "with valid params and blank password confirmation" do
      it "returns Unprocessable Entity" do
        params = { user: attributes_for(:user, password: '') }
        put profile_path, params: params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context "with invalid params" do
      it "returns Unprocessable Entity" do
        params = { user: attributes_for(:user, :invalid) }
        put profile_path, params: params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
