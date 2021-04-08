class CreateCanvas < ActiveRecord::Migration[6.0]
  def change
    create_table :canvas do |t|
      t.string :action
      t.integer :offsetX
      t.integer :offsetY
      t.reference :room

      t.timestamps
    end
  end
end
