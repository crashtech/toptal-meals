class SettingsController < AuthenticatedController
  before_action :grant_role
  before_action :set_settings

  # GET /settings
  def show
    render @settings
  end

  # PATCH/PUT /settings
  def update
    if @settings.update(settings_params)
      render @settings
    else
      render @settings, status: :unprocessable_entity
    end
  end

  private
    # Check the authorization to access this controller methods
    def grant_role
      raise InvalidRole.new unless current_user.user?
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_settings
      @settings = Settings.find_or_initialize_by(user_id: current_user.id)
    end

    # Only allow a trusted parameter "white list" through.
    def settings_params
      params.require(:settings).permit(:calories_per_day)
    end
end
