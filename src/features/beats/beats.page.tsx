import BeatItem from "./ui/beat-item"
import { useBeatsList } from "./use-beats"

const BeatsPage = () => {
  const beatsQuery = useBeatsList({ limit: 5 })

  return (
    <section className="flex flex-col gap-2">
      {beatsQuery.beats.map((beat) => (
        <BeatItem key={beat.id} beat={beat} />
      ))}
    </section>
  )
}

export const Component = BeatsPage
