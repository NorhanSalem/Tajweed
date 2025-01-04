import React, { useState } from "react"
import EmojiPicker, {
  Emoji,
  EmojiClickData,
  EmojiStyle,
} from "emoji-picker-react"

export default function EmojiComp({ setSelectedEmoji, onEmojiClick }: any) {
  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setSelectedEmoji(emojiData.unified)
  }
  return (
    <div>
      <EmojiPicker
        onEmojiClick={onClick}
        //@ts-ignore
        // eslint-disable-next-line react/jsx-no-duplicate-props
        onEmojiClick={onEmojiClick}
      />
    </div>
  )
}
