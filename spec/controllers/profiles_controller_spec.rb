require 'rails_helper'

RSpec.describe ProfilesController, type: :controller do
  login_user

  describe "GET #show" do
    it "assigns current user to @user" do
      get :show
      expect(assigns(:user)).to eq(@current_user)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new user" do
        expect {
          post :create, params: { user: attributes_for(:user) }
        }.to change(User, :count).by(1)
      end

      it "assigns a newly created user as @user" do
        post :create, params: { user: attributes_for(:user) }
        expect(assigns(:user)).to be_a(User)
        expect(assigns(:user)).to be_persisted
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved user as @user" do
        post :create, params: { user: attributes_for(:user, :invalid) }
        expect(assigns(:user)).to be_a_new(User)
        expect(assigns(:user)).to_not be_persisted
      end
    end

    context "with password confirmation not present" do
      it "assigns a newly created but unsaved user as @user" do
        post :create, params: { user: attributes_for(:user).except(:password_confirmation) }
        expect(assigns(:user)).to be_a_new(User)
      end
    end

    context "with mismatching password" do
      it "assigns a newly created but unsaved user as @user" do
        post :create, params: { user: attributes_for(:user, password: '111222333') }
        expect(assigns(:user)).to be_a_new(User)
      end
    end
  end

  describe "PUT #profile" do
    context "with valid params" do
      let(:new_attributes) {
        attributes_for(:user)
      }

      it "updates the requested user" do
        user = @current_user
        put :update, params: { id: user.to_param, user: new_attributes }

        user.reload
        skip = [:email, :password, :password_confirmation]
        new_attributes.except(*skip).each do |key, value|
          expect(user[key]).to be_eql(value)
        end
      end

      it "assigns the requested user as @user" do
        user = @current_user
        put :update, params: { id: user.to_param, user: attributes_for(:user) }
        expect(assigns(:user)).to eq(user)
        expect(assigns(:user).changed?).to be_falsey
      end
    end

    context "with invalid params" do
      it "assigns the user as @user" do
        user = @current_user
        put :update, params: { id: user.to_param, user: attributes_for(:user, :invalid) }
        expect(assigns(:user)).to eq(user)
        expect(assigns(:user).changed?).to be_truthy
      end
    end
  end
end
