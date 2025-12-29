import { usePlayer } from "@/shared/hooks/player"
import { PlayerControls } from "./ui/player-controls"
import { ProgressBar } from "./ui//progress-bar"

export const Player = () => {
  const { currentBeat } = usePlayer()

  if (!currentBeat) return

  return (
    <div className="sticky bottom-0 w-full bg-background mt-2 p-4 border-t-1 flex flex-col items-center gap-2">
      <ProgressBar />
      <PlayerControls />
    </div>
  )
}
