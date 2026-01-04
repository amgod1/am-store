import { usePlayer } from "@/shared/hooks/player"
import { Button } from "@/shared/ui/kit/button"
import { Icon } from "@/shared/ui/kit/icon"

export const PlayerControlsMiddle = () => {
  const { currentBeat, prev, togglePlay, next, isPlaying } = usePlayer()

  if (!currentBeat) return

  return (
    <>
      <Button variant="icon" onClick={prev}>
        <Icon.PlayerPrev size="1.5rem" />
      </Button>
      <Button variant="icon" onClick={togglePlay}>
        {isPlaying ? <Icon.Pause size="1.5rem" /> : <Icon.Play size="1.5rem" />}
      </Button>
      <Button variant="icon" onClick={next}>
        <Icon.PlayerNext size="1.5rem" />
      </Button>
    </>
  )
}
