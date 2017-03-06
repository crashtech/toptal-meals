require 'rails_helper'

RSpec.describe "Users", type: :request do
  context "with the correct role" do
    authenticate_user(role: :admin)

    let(:user) {
      create(:user)
    }

    describe "GET /" do
      it "returns Ok" do
        get users_path
        expect(response).to have_http_status(:ok)
      end
    end

    describe "GET /:id" do
      context "with existing record" do
        it "returns Ok" do
          get user_path(user.to_param)
          expect(response).to have_http_status(:ok)
        end
      end

      context "without existing record" do
        it "returns Not Found" do
          get user_path(0)
          expect(response).to have_http_status(:not_found)
        end
      end
    end

    describe "POST /" do
      context "with valid params" do
        it "returns Created" do
          params = { user: attributes_for(:user) }
          post users_path, params: params
          expect(response).to have_http_status(:created)
        end
      end

      context "with invalid params" do
        it "returns Unprocessable Entity" do
          params = { user: attributes_for(:user, :invalid) }
          post users_path, params: params
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    describe "PUT/PATCH /:id" do
      context "with valid params" do
        it "returns Ok" do
          params = { user: attributes_for(:user) }
          put user_path(user.to_param), params: params
          expect(response).to have_http_status(:ok)
        end
      end

      context "with invalid params" do
        it "returns Unprocessable Entity" do
          params = { user: attributes_for(:user, :invalid) }
          put user_path(user.to_param), params: params
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    describe "DELETE /:id" do
      it "returns No Content" do
        delete user_path(user.to_param)
        expect(response).to have_http_status(:no_content)
      end
    end
  end

  context "without the correct role" do
    authenticate_user

    describe "GET /users" do
      it "returns Not Acceptable" do
        get users_path
        expect(response).to have_http_status(:not_acceptable)
      end
    end
  end
end
