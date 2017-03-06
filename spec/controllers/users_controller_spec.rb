require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  login_user(role: :admin)

  describe "GET #index" do
    it "assigns all users as @users" do
      get :index
      expect(assigns(:users)).to eq([@current_user])
    end

    it "assigns filtered users as @users" do
      user = create(:user)
      get :index, params: { role: :user }
      expect(assigns(:users)).to eq([user])
    end
  end

  describe "GET #show" do
    it "assigns the requested user as @user" do
      user = create(:user)
      get :show, params: { id: user.to_param }
      expect(assigns(:user)).to eq(user)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new User" do
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
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        attributes_for(:user)
      }

      it "updates the requested user" do
        user = create(:user)
        put :update, params: { id: user.to_param, user: new_attributes }

        user.reload
        skip = [:email, :password, :password_confirmation]
        new_attributes.slice!(*skip).each do |key, value|
          expect(user[key]).to be_eql(value)
        end
      end

      it "assigns the requested user as @user" do
        user = create(:user)
        put :update, params: { id: user.to_param, user: attributes_for(:user) }
        expect(assigns(:user)).to eq(user)
      end
    end

    context "with invalid params" do
      it "assigns the user as @user" do
        user = create(:user)
        put :update, params: { id: user.to_param, user: attributes_for(:user, :invalid) }
        expect(assigns(:user)).to eq(user)
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested user" do
      user = create(:user)
      expect {
        delete :destroy, params: { id: user.to_param }
      }.to change(User, :count).by(-1)
    end
  end
end
