class CreateMeals < ActiveRecord::Migration[5.0]
  def change
    create_table :meals do |t|
      t.belongs_to :user, null: false, foreign_key: true, index: true
      t.string :title, limit: 100, null: false
      t.integer :calories, null: false
      t.date :date, null: false
      t.time :time, null: false
      t.boolean :deleted, null: false, default: false
      t.timestamps

      t.index :date
      t.index :time
      t.index :deleted
    end
  end
end
