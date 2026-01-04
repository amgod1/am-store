import { usePlayer } from "@/shared/hooks/player"
import { Button } from "@/shared/ui/kit/button"
import { Icon } from "@/shared/ui/kit/icon"

export const PlayerControlsActions = () => {
  const { currentBeat, toggleMute, isMuted, volume, changeVolume } = usePlayer()

  if (!currentBeat) return

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeVolume(parseFloat(e.target.value))
  }

  const displayVolume = isMuted ? 0 : volume
  const volumePercentage = displayVolume * 100

  return (
    <>
      <div className="flex flex-row gap-1 items-center">
        <Button variant="icon" onClick={toggleMute}>
          {isMuted ? (
            <Icon.VolumeMute size="1rem" />
          ) : (
            <Icon.Volume size="1rem" />
          )}
        </Button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={displayVolume}
          onChange={handleVolumeChange}
          className="w-24 h-1 cursor-pointer appearance-none bg-secondary rounded-lg accent-primary"
          style={{
            background: `linear-gradient(to right, var(--color-primary) ${volumePercentage}%, var(--color-secondary) ${volumePercentage}%)`,
          }}
        />
      </div>

      <Button variant="icon">
        <Icon.Cart size="1.5rem" />
      </Button>
    </>
  )
}
