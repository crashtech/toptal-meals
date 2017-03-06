require 'rails_helper'

RSpec.describe MealsController, type: :controller do
  login_user

  describe "GET #index" do
    it "assigns all meals as @meals" do
      create(:meal_with_associations)
      meal = create(:meal, user_id: @current_user.id)
      get :index
      expect(assigns(:meals)).to eq([meal])
    end
  end

  describe "GET #show" do
    it "assigns the requested meal as @meal" do
      meal = create(:meal, user_id: @current_user.id)
      get :show, params: { id: meal.to_param }
      expect(assigns(:meal)).to eq(meal)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new meal" do
        expect {
          post :create, params: { meal: attributes_for(:meal) }
        }.to change(Meal, :count).by(1)
      end

      it "assigns a newly created meal as @meal" do
        post :create, params: { meal: attributes_for(:meal) }
        expect(assigns(:meal)).to be_a(Meal)
        expect(assigns(:meal)).to be_persisted
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved meal as @meal" do
        post :create, params: { meal: attributes_for(:meal, :invalid) }
        expect(assigns(:meal)).to be_a_new(Meal)
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        attributes_for(:meal)
      }

      it "updates the requested meal" do
        meal = create(:meal, user_id: @current_user.id)
        put :update, params: { id: meal.to_param, meal: new_attributes }

        meal.reload
        new_attributes.except(:time).each do |key, value|
          expect(meal[key]).to be_eql(value)
        end
      end

      it "assigns the requested meal as @meal" do
        meal = create(:meal, user_id: @current_user.id)
        put :update, params: { id: meal.to_param, meal: attributes_for(:meal) }
        expect(assigns(:meal)).to eq(meal)
        expect(assigns(:meal).changed?).to be_falsey
      end
    end

    context "with invalid params" do
      it "assigns the meal as @meal" do
        meal = create(:meal, user_id: @current_user.id)
        put :update, params: { id: meal.to_param, meal: attributes_for(:meal, :invalid) }
        expect(assigns(:meal)).to eq(meal)
        expect(assigns(:meal).changed?).to be_truthy
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested meal" do
      meal = create(:meal, user_id: @current_user.id)
      expect {
        delete :destroy, params: { id: meal.to_param }
      }.to change(Meal.available, :count).by(-1)
    end
  end
end
