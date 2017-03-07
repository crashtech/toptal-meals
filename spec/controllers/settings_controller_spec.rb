require 'rails_helper'

RSpec.describe SettingsController, type: :controller do
  login_user

  describe "GET #show" do
    it "assigns current user to @user" do
      get :show
      expect(assigns(:settings)).to be_a(Settings)
    end
  end

  describe "PUT #profile" do
    context "with valid params" do
      let(:new_attributes) {
        attributes_for(:settings)
      }

      it "updates the requested user" do
        put :update, params: { settings: new_attributes }

        @current_user.settings.reload
        new_attributes.each do |key, value|
          expect(@current_user.settings[key]).to be_eql(value)
        end
      end
    end
  end
end
