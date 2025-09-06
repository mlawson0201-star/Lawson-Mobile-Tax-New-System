
'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  PlayCircle, 
  PauseCircle, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw,
  Settings,
  SkipBack,
  SkipForward
} from 'lucide-react'
import { toast } from 'sonner'

interface VideoPlayerProps {
  videoUrl: string
  title: string
  duration: number
  onProgress?: (progress: number) => void
  onComplete?: () => void
}

export default function VideoPlayer({ 
  videoUrl, 
  title, 
  duration, 
  onProgress, 
  onComplete 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => {
      setCurrentTime(video.currentTime)
      const progress = (video.currentTime / video.duration) * 100
      onProgress?.(progress)
    }

    const updateDuration = () => {
      setVideoDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onComplete?.()
      toast.success('Video completed!')
    }

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('ended', handleEnded)
    }
  }, [onProgress, onComplete])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    video.currentTime = pos * video.duration
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const changeVolume = (newVolume: number) => {
    const video = videoRef.current
    if (!video) return

    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (!isFullscreen) {
      video.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setIsFullscreen(!isFullscreen)
  }

  const skipTime = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds))
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative w-full h-96 bg-gray-900 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        <p className="text-white text-center p-4">
          Your browser does not support the video tag.
          <br />
          <a href={videoUrl} className="underline text-blue-400">Download the video</a> to watch it.
        </p>
      </video>

      {/* Video Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
        {/* Progress Bar */}
        <div 
          className="w-full h-2 bg-white/30 rounded-full mb-4 cursor-pointer hover:h-3 transition-all"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-white rounded-full transition-all duration-200"
            style={{ width: `${(currentTime / videoDuration) * 100}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-2"
              onClick={() => skipTime(-10)}
            >
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-2"
              onClick={togglePlay}
            >
              {isPlaying ? <PauseCircle className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-2"
              onClick={() => skipTime(10)}
            >
              <SkipForward className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-2"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>

            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                className="w-20 accent-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {formatTime(currentTime)} / {formatTime(videoDuration)}
            </span>

            <select
              value={playbackRate}
              onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
              className="bg-white/20 text-white text-sm rounded px-2 py-1 border-none outline-none"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-2"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Center Play Button Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/20 p-4"
            onClick={togglePlay}
          >
            <PlayCircle className="h-16 w-16" />
          </Button>
        </div>
      )}

      {/* Loading State */}
      {videoDuration === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-sm opacity-80">Loading video...</p>
          </div>
        </div>
      )}
    </div>
  )
}
