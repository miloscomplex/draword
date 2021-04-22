class AddIsdrawingToUsers < ActiveRecord::Migration[6.0]
  def change
      add_column :users, :is_drawing, :boolean, :null => false, :default => false 
  end
end
