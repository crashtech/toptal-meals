require 'rails_helper'

RSpec.describe "Application", type: :request do
  subject { ApplicationController }

  describe "GET /" do
    it "returns Ok" do
      get root_path
      expect(response).to have_http_status(:ok)
    end
  end
end
