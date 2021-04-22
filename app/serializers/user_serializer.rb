class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :initials, :scores, :is_drawing
end
