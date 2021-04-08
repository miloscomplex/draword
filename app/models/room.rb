class Room < ApplicationRecord
  has_many :chats
  has_one :canva
end
