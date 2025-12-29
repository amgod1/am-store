import { usePlayer } from "@/shared/hooks/player"
import { Button } from "@/shared/ui/kit/button"
import { Icon } from "@/shared/ui/kit/icon"

export const PlayerControls = () => {
  const { currentBeat, togglePlay, next, prev, isPlaying } = usePlayer()

  if (!currentBeat) return

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col">
        <h4 className="text-card-foreground font-medium select-none leading-none">
          {currentBeat.title}
        </h4>
      </div>

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
