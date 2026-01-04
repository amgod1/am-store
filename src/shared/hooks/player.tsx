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
  volume: number
  isMuted: boolean
  changeVolume: (vol: number) => void
  toggleMute: () => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef(new Audio())
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null)
  const [queue, setQueue] = useState<Beat[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  const lastVolume = useRef(1)

  // biome-ignore lint/correctness/useExhaustiveDependencies: need this deps
  useEffect(() => {
    const audio = audioRef.current
    const handleEnded = () => next()
    audio.addEventListener("ended", handleEnded)
    return () => audio.removeEventListener("ended", handleEnded)
  }, [currentBeat, queue])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const playBeat = async (beat: Beat, currentList: Beat[]) => {
    setQueue(currentList)

    if (currentBeat?.id === beat.id) {
      togglePlay()
      return
    }

    setCurrentBeat(beat)
    audioRef.current.src = beat.fileLink

    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.warn("Playback interrupted or blocked:", error)
      setIsPlaying(false)
    }
  }

  const togglePlay = async () => {
    if (!currentBeat) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.warn("Playback failed:", error)
      }
    }
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

  const changeVolume = (val: number) => {
    setVolume(val)
    if (val > 0) {
      lastVolume.current = val
      setIsMuted(false)
    } else {
      setIsMuted(true)
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      // Restore from memory
      setVolume(lastVolume.current)
      setIsMuted(false)
    } else {
      // Save current to memory and mute
      lastVolume.current = volume
      setIsMuted(true)
    }
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
        volume,
        isMuted,
        changeVolume,
        toggleMute,
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
