class CreateSettings < ActiveRecord::Migration[5.0]
  def change
    create_table :settings do |t|
      t.belongs_to :user, null: false, foreign_key: true, index: true
      t.integer :calories_per_day
      t.timestamps
    end
  end
end
