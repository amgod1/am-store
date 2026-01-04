import { usePlayer } from "@/shared/hooks/player"
import { PlayerControlsActions } from "./player-controls-actions"
import { PlayerControlsMiddle } from "./player-controls-middle"

export const PlayerControls = () => {
  const { currentBeat } = usePlayer()

  if (!currentBeat) return

  return (
    <div className="w-full grid grid-cols-3 items-center">
      <h4 className="text-card-foreground font-medium select-none leading-none">
        {currentBeat.title}
      </h4>

      <div className="flex items-center justify-center">
        <PlayerControlsMiddle />
      </div>

      <div className="flex flex-row gap-2 items-center justify-end">
        <PlayerControlsActions />
      </div>
    </div>
  )
}
