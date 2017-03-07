require 'rails_helper'

RSpec.describe "Settings", type: :request do
  authenticate_user

  describe "GET /settings" do
    it "returns Ok" do
      get settings_path
      expect(response).to have_http_status(:ok)
    end
  end

  describe "PUT/PATCH /settings" do
    context "with valid params" do
      it "returns Ok" do
        params = { settings: attributes_for(:settings) }
        put settings_path, params: params
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
