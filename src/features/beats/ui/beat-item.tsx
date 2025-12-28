import { FC } from "react"
import { ApiSchemas } from "@/shared/api/schema"
import { Button } from "@/shared/ui/kit/button"
import { Card } from "@/shared/ui/kit/card"
import { Icon } from "@/shared/ui/kit/icon"
import BeatTags from "./beat-tags"

type BeatItem = {
  beat: ApiSchemas["Beat"]
  isActive: boolean
  isPlaying: boolean
  onPlay: () => void
}

const BeatItem: FC<BeatItem> = ({ beat, isActive, isPlaying, onPlay }) => {
  const { title, bpm } = beat

  return (
    <Card
      onClick={onPlay}
      className={`p-3 flex flex-row justify-between items-center cursor-pointer ${isActive && "border-primary"}`}
    >
      <div className="flex flex-row items-center gap-4">
        <Button variant="icon">
          {isPlaying && isActive ? (
            <Icon.Pause size="2rem" />
          ) : (
            <Icon.Play size="2rem" />
          )}
        </Button>
        <div className="flex flex-col gap-1">
          <h3>{title}</h3>
          <p>{bpm} BPM</p>
        </div>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <BeatTags tags={beat.tags} />
        <Button variant="icon">
          <Icon.Cart size={"1.5rem"} />
        </Button>
      </div>
    </Card>
  )
}

export default BeatItem
