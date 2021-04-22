class CreateSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :sessions do |t|
      t.timestamps
      t.string :user_id
      t.string :role 
    end
  end
end
