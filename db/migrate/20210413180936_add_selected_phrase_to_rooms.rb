class AddSelectedPhraseToRooms < ActiveRecord::Migration[6.0]
  def change
    add_reference :rooms, :selected_phrase, foreign_key: { to_table: :phrases }
  end
end
