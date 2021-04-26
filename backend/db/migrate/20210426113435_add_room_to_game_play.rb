class AddRoomToGamePlay < ActiveRecord::Migration[6.0]
  def change
    add_column :game_plays, :room_id, :integer
  end
end
