class AddDrawerIdToRooms < ActiveRecord::Migration[6.0]
  def change
    add_reference :rooms, :drawer_id, foreign_key: { to_table: :users }
  end
end
