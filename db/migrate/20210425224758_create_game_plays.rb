class CreateGamePlays < ActiveRecord::Migration[6.0]
  def change
    create_table :game_plays do |t|
      t.string :action
      t.timestamps
    end
  end
end
