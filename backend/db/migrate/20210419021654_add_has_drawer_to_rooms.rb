class AddHasDrawerToRooms < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :has_drawer, :boolean, default: false 
  end
end
