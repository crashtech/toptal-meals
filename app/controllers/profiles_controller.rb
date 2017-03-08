class ProfilesController < AuthenticatedController
  skip_before_action :authenticate_user_from_token!, only: :create
  skip_before_action :authenticate_user!, only: :create
  before_action :set_user

  # GET /profile
  def show
    render @user
  end

  # POST /profile
  def create
    @user = User.new(profile_params)

    if @user.save
      render @user, status: :created
    else
      render @user, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /profile
  def update
    params = profile_params.except(:email)
    if params[:password].blank? && params[:password_confirmation].blank?
      params.delete(:password_confirmation)
      params.delete(:password)
    end

    if @user.update(params)
      render @user
    else
      render @user, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = current_user
    end

    # Only allow a trusted parameter "white list" through.
    def profile_params
      params.require(:profile).permit(:first_name, :last_name, :email,
                                      :password, :password_confirmation)
    end
end
