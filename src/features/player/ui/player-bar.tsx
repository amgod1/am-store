import { usePlayer } from "@/shared/hooks/player"
import { Button } from "@/shared/ui/kit/button"
import { Icon } from "@/shared/ui/kit/icon"

export const PlayerBar = () => {
  const { currentBeat, isPlaying, togglePlay, next, prev } = usePlayer()

  if (!currentBeat) return

  return (
    <div className="sticky bottom-0 w-full bg-background p-4 mt-2 border-t-1 flex items-center justify-between">
      <h4 className="text-card-foreground select-none">{currentBeat.title}</h4>

      <div className="flex items-center">
        <Button variant="icon" onClick={prev}>
          <Icon.PlayerPrev size="1.5rem" />
        </Button>
        <Button variant="icon" onClick={togglePlay}>
          {isPlaying ? (
            <Icon.Pause size="1.5rem" />
          ) : (
            <Icon.Play size="1.5rem" />
          )}
        </Button>
        <Button variant="icon" onClick={next}>
          <Icon.PlayerNext size="1.5rem" />
        </Button>
      </div>

      <Button variant="icon">
        <Icon.Cart size="1.5rem" />
      </Button>
    </div>
  )
}
