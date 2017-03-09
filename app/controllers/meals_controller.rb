class MealsController < AuthenticatedController
  before_action :grant_role
  before_action :set_meal, only: [:show, :update, :destroy]

  # GET /meals
  def index
    @meals = Meal.available.exclusive(current_user).filter(filter_params)
    render @meals, queryable: true
  end

  # GET /meals/1
  def show
    render @meal
  end

  # POST /meals
  def create
    @meal = Meal.new(meal_params)
    @meal.user_id = current_user.id if current_user.user?

    if @meal.save
      render @meal, status: :created
    else
      render @meal, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /meals/1
  def update
    if @meal.update(meal_params)
      render @meal
    else
      render @meal, status: :unprocessable_entity
    end
  end

  # DELETE /meals/1
  def destroy
    @meal.update(deleted: true)
    render nil
  end

  private
    # Check the authorization to access this controller methods
    def grant_role
      raise InvalidRole.new if current_user.manager?
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_meal
      @meal = Meal.available.exclusive(current_user).find(params[:id])
    end

    # Only accept these parameters as filter
    def filter_params
      params.permit(:date_lte, :date_gte, :time_lte, :time_gte)
    end

    # Only allow a trusted parameter "white list" through.
    def meal_params
      properties = [:title, :calories, :date, :time]
      properties << :user_id if current_user.admin?
      params.require(:meal).permit(*properties)
    end
end
