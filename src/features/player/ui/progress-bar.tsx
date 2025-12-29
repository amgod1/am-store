import { useEffect, useState } from "react"
import { usePlayer } from "@/shared/hooks/player"

const formatTime = (seconds: number) => {
  if (Number.isNaN(seconds)) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export const ProgressBar = () => {
  const { audioRef, seek } = usePlayer()
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isUserMovingSlider, setIsUserMovingSlider] = useState(false)

  useEffect(() => {
    const audio = audioRef.current

    const onTimeUpdate = () => {
      if (!isUserMovingSlider) {
        setProgress(audio.currentTime)
      }
    }

    const onDurationChange = () => setDuration(audio.duration)

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("durationchange", onDurationChange)

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("durationchange", onDurationChange)
    }
  }, [isUserMovingSlider, audioRef])

  const handleInteractionStart = () => {
    setIsUserMovingSlider(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value))
  }

  const handleInteractionEnd = () => {
    seek(progress)
    setTimeout(() => setIsUserMovingSlider(false), 100)
  }

  return (
    <div className="w-full flex flex-row items-center justify-between gap-4">
      <p className="text-card-foreground">{formatTime(progress)}</p>
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={progress}
        onTouchStart={handleInteractionStart}
        onMouseDown={handleInteractionStart}
        onInput={handleInputChange}
        onTouchEnd={handleInteractionEnd}
        onMouseUp={handleInteractionEnd}
        className="w-full h-[4px] cursor-pointer appearance-none bg-secondary accent-primary"
        style={{
          background: `linear-gradient(to right, var(--color-primary) ${(progress / duration) * 100}%, var(--color-secondary) 0%)`,
        }}
      />
      <p className="text-card-foreground">{formatTime(duration)}</p>
    </div>
  )
}
