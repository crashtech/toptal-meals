require 'rails_helper'

RSpec.describe "Meals", type: :request do
  context "authenticated as user" do
    authenticate_user

    let(:meal) {
      create(:meal, user_id: @current_user.id)
    }

    describe "GET /" do
      it "returns Ok" do
        get meals_path
        expect(response).to have_http_status(:ok)
      end
    end

    describe "GET /:id" do
      context "with existing record" do
        it "returns Ok" do
          get meal_path(meal.to_param)
          expect(response).to have_http_status(:ok)
        end
      end

      context "with another user's record" do
        it "returns Not Found" do
          meal = create(:meal_with_associations)
          get meal_path(meal.to_param)
          expect(response).to have_http_status(:not_found)
        end
      end

      context "with deleted record" do
        it "returns Not Found" do
          meal = create(:meal, :deleted, user_id: @current_user.id)
          get meal_path(meal.to_param)
          expect(response).to have_http_status(:not_found)
        end
      end

      context "without existing record" do
        it "returns Not Found" do
          get meal_path(0)
          expect(response).to have_http_status(:not_found)
        end
      end
    end

    describe "POST /" do
      context "with valid params" do
        it "returns Created" do
          params = { meal: attributes_for(:meal) }
          post meals_path, params: params
          expect(response).to have_http_status(:created)
        end
      end

      context "with invalid params" do
        it "returns Unprocessable Entity" do
          params = { meal: attributes_for(:meal, :invalid) }
          post meals_path, params: params
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    describe "PUT/PATCH /:id" do
      context "with valid params" do
        it "returns Ok" do
          params = { meal: attributes_for(:meal) }
          put meal_path(meal.to_param), params: params
          expect(response).to have_http_status(:ok)
        end
      end

      context "with invalid params" do
        it "returns Unprocessable Entity" do
          params = { meal: attributes_for(:meal, :invalid) }
          put meal_path(meal.to_param), params: params
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    describe "DELETE /:id" do
      context "without tickets" do
        it "returns No Content" do
          delete meal_path(meal.to_param)
          expect(response).to have_http_status(:no_content)
        end
      end
    end
  end

  context "authenticated as admin" do
    authenticate_user(role: :admin)

    let(:meal) {
      create(:meal_with_associations)
    }

    describe "GET /" do
      it "returns Ok" do
        get meals_path
        expect(response).to have_http_status(:ok)
      end
    end

    describe "GET /:id" do
      context "with existing record" do
        it "returns Ok" do
          get meal_path(meal.to_param)
          expect(response).to have_http_status(:ok)
        end
      end

      context "with another user's record" do
        it "returns Ok" do
          meal = create(:meal_with_associations)
          get meal_path(meal.to_param)
          expect(response).to have_http_status(:ok)
        end
      end
    end

    describe "POST /" do
      context "with valid params" do
        it "returns Created" do
          params = { meal: attributes_for(:meal_with_associations) }
          post meals_path, params: params
          expect(response).to have_http_status(:created)
        end
      end

      context "with invalid params" do
        it "returns Unprocessable Entity" do
          params = { meal: attributes_for(:meal, :invalid) }
          post meals_path, params: params
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  end

  context "authenticated as manager" do
    authenticate_user(role: :manager)

    describe "GET /meals" do
      it "returns Not Acceptable" do
        get meals_path
        expect(response).to have_http_status(:not_acceptable)
      end
    end
  end
end
