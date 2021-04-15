class AddPhraseToRooms < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :selected_phrase_id, :integer
    add_index :rooms, :selected_phrase_id
  end
end
