class AddSelectedPhraseToRooms < ActiveRecord::Migration[6.0]
  def change
    add_reference :rooms, :phrase, index: true
    add_foreign_key :rooms, :phrases
  end
end
