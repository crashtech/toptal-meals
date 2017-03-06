require 'rails_helper'

RSpec.describe "Application", type: :request do
  subject { ApplicationController }

  describe "GET /" do
    it "returns Ok" do
      get root_path
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET to invalid record id" do
    it "returns Not Found" do
      error = ActiveRecord::RecordNotFound.new('A message')
      allow_any_instance_of(subject).to receive(:index).and_raise(error)
      get root_path
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST/PUT/PATCH with invalid data" do
    it "returns Bad Request" do
      error = ActionController::ParameterMissing.new('A message')
      allow_any_instance_of(subject).to receive(:index).and_raise(error)
      get root_path
      expect(response).to have_http_status(:bad_request)
    end
  end
end
