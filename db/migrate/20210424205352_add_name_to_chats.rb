class AddNameToChats < ActiveRecord::Migration[6.0]
  def change
    add_column :chats, :name, :string
  end
end
