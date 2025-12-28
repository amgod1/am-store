import { usePlayer } from "@/shared/hooks/player"
import { useBeatsList } from "./model/use-beats"
import BeatItem from "./ui/beat-item"

const BeatsPage = () => {
  const { beats } = useBeatsList({ limit: 3 })
  const { playBeat, currentBeat, isPlaying } = usePlayer()

  return (
    <div className="flex flex-col gap-2">
      {beats.map((beat) => {
        const isActive = beat.id === currentBeat?.id

        return (
          <BeatItem
            key={beat.id}
            beat={beat}
            isActive={isActive}
            isPlaying={isPlaying}
            onPlay={() => playBeat(beat, beats)}
          />
        )
      })}
    </div>
  )
}

export const Component = BeatsPage
