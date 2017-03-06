class UsersController < AuthenticatedController
  before_action :grant_role, except: [:show]
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.filter(filter_params)
    render @users, queryable: true
  end

  # GET /users/1
  def show
    render @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render @user, status: :created
    else
      render @user, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    skip = [:email, :password, :password_confirmation]
    if @user.update(user_params.except(*skip))
      render @user
    else
      render @user, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
    render nil
  end

  private
    # Check the authorization to access this controller methods
    def grant_role
      raise InvalidRole.new if current_user.user?
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only accept these parameters as filter
    def filter_params
      params.permit(:role)
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :role,
                                   :password, :password_confirmation)
    end
end
