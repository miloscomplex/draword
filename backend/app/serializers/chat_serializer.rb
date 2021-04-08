class ChatSerializer < ActiveModel::Serializer
  attributes :id, :room_id, :text, :created_at
end
