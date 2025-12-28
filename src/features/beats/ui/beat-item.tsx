import { FC } from "react"
import type { ApiSchemas } from "@/shared/api/schema"
import { Button } from "@/shared/ui/kit/button"
import { Card } from "@/shared/ui/kit/card"
import { Icon } from "@/shared/ui/kit/icon"

type BeatItem = {
  beat: ApiSchemas["Beat"]
  isActive: boolean
  onPlay: () => void
}

const BeatItem: FC<BeatItem> = ({ beat, isActive, onPlay }) => {
  const { title, bpm } = beat

  return (
    <Card
      onClick={onPlay}
      className={`p-3 flex flex-row justify-between items-center cursor-pointer ${isActive && "border-primary"}`}
    >
      <div className="flex flex-row items-center gap-4">
        <Button variant="icon">
          {isActive ? <Icon.Pause size="2rem" /> : <Icon.Play size="2rem" />}
        </Button>
        <div className="flex flex-col gap-1">
          <h3>{title}</h3>
          <p>{bpm} BPM</p>
        </div>
      </div>
      <Button variant="icon">
        <Icon.Cart size={"1.5rem"} />
      </Button>
    </Card>
  )
}

export default BeatItem
