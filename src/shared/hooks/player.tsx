import {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { ApiSchemas } from "@/shared/api/schema"

type Beat = ApiSchemas["Beat"]

interface PlayerContextType {
  currentBeat: Beat | null
  isPlaying: boolean
  playBeat: (beat: Beat, currentList: Beat[]) => void
  togglePlay: () => void
  next: () => void
  prev: () => void
  audioRef: RefObject<HTMLAudioElement>
  seek: (time: number) => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef(new Audio())
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null)
  const [queue, setQueue] = useState<Beat[]>([])
  const [isPlaying, setIsPlaying] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: need this deps
  useEffect(() => {
    const audio = audioRef.current
    const handleEnded = () => next()
    audio.addEventListener("ended", handleEnded)
    return () => audio.removeEventListener("ended", handleEnded)
  }, [currentBeat, queue])

  const playBeat = (beat: Beat, currentList: Beat[]) => {
    setQueue(currentList)

    if (currentBeat?.id === beat.id) {
      togglePlay()
      return
    }

    setCurrentBeat(beat)
    audioRef.current.src = beat.fileLink
    audioRef.current.play()
    setIsPlaying(true)
  }

  const togglePlay = () => {
    if (isPlaying) audioRef.current.pause()
    else if (currentBeat) audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const next = () => {
    const idx = queue.findIndex((b) => b.id === currentBeat?.id)
    const nextIndex = idx === queue.length - 1 ? 0 : idx + 1

    if (idx !== -1) {
      playBeat(queue[nextIndex], queue)
    }
  }

  const prev = () => {
    const idx = queue.findIndex((b) => b.id === currentBeat?.id)
    const prevIndex = idx <= 0 ? queue.length - 1 : idx - 1

    if (idx !== -1) {
      playBeat(queue[prevIndex], queue)
    }
  }

  const seek = (time: number) => {
    if (!audioRef.current) return

    audioRef.current.muted = true
    audioRef.current.currentTime = time

    const handleSeeked = () => {
      audioRef.current.muted = false
      audioRef.current.removeEventListener("seeked", handleSeeked)
    }

    audioRef.current.addEventListener("seeked", handleSeeked)
  }

  return (
    <PlayerContext.Provider
      value={{
        currentBeat,
        isPlaying,
        playBeat,
        togglePlay,
        next,
        prev,
        audioRef,
        seek,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  const context = useContext(PlayerContext)

  if (!context) {
    throw new Error("usePlayer must be used within PlayerProvider")
  }

  return context
}
