class Room < ApplicationRecord
  has_many :chats
  has_many :canvas

  validates :title, presence: true
  validates :title, length: { minimum: 3, maximum: 10 }
end
