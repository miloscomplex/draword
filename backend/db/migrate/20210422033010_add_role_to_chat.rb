class AddRoleToChat < ActiveRecord::Migration[6.0]
  def change
    add_column :chats, :role, :string 
  end
end
