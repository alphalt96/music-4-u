import { useEffect, useRef, useState } from 'react'
import ReactSlider from 'react-input-slider'
import { FaPlay, FaPause } from 'react-icons/fa'
import { BsShuffle } from 'react-icons/bs'
import { FiRepeat } from 'react-icons/fi'
import { BsFillSkipForwardFill, BsFillSkipBackwardFill } from 'react-icons/bs'
import { IoVolumeLow, IoVolumeMedium, IoVolumeHigh, IoVolumeMute } from 'react-icons/io5'

import client from '../utils/client'
import { convertSecondToMin, getTimeRange } from '../utils/timer'
import { AudioPlayerPropsType } from '../utils/types'
import { useAppSelector } from '../shared/hooks'

const AudioPlayer = ({ onFinish }: AudioPlayerPropsType) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isLooped, setIsLooped] = useState(false)
  const [duration, setDuration] = useState(0)
  const [timeLoaded, setTimeLoaded] = useState('0:00')
  const [timeLeft, setTimeLeft] = useState('0:00')
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)

  const playingSong = useAppSelector(state => state.player.playingSong)

  useEffect(() => {
    if (playingSong) {
      client.getSongDownloadUrl(playingSong.id)
        .then(url => {
          client.getSongMediaFile(url).then(async data => {
            if (data && audioRef.current) {
              const blobParts: BlobPart[] = []
              let readableData = await data.read()

              // read until the last blob
              while (!readableData.done) {
                blobParts.push(readableData.value)
                readableData = await data.read()
              }
              // TODO: use dynamic media type
              const blob = new Blob(blobParts, { type: 'audio/mp3' })
              const blobUrl = URL.createObjectURL(blob)
              audioRef.current.src = blobUrl
            }
          })
        })
      // set the value to true when autoPlay is activated
      // set the value to false when autoPlay is disabled
      if (isAutoPlay) {
        setIsPlaying(true)
      } else {
        setIsPlaying(false)
      }
    }
  }, [playingSong])


  const onSongProgressChange = (changed: { x: number }) => {
    if (audioRef.current) {
      audioRef.current.currentTime = changed.x
      setCurrentTime(changed.x)
    }
  }

  const onTimeUpdate = (event: any) => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      const timeRange = getTimeRange(duration, audioRef.current.currentTime)
      setTimeLoaded(timeRange.timeLoaded)
      setTimeLeft(timeRange.timeLeft)
    }
  }

  const onLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      setTimeLeft(convertSecondToMin(audioRef.current.duration))
      // setIsPlaying(true)
      // audioRef.current.muted = true
      // audioRef.current.play()
    }
  }

  const toggleLoopedStatus = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLooped
      setIsLooped(!isLooped)
    }
  }

  const togglePlayStatus = (isPlaying: boolean) => {
    isPlaying
      ? audioRef.current?.play()
      : audioRef.current?.pause()
    setIsPlaying(isPlaying)
  }

  const setMuted = () => {
    if (audioRef.current) {
      setIsMuted(!isMuted)
      if (isMuted) {
        audioRef.current.muted = false
      } else {
        audioRef.current.muted = true
      }
    }
  }

  const onSongFinish = () => {
    setIsPlaying(false)
    onFinish()
  }

  const onVolumeChange = (changed: { x: number }) => {
    if (audioRef.current) {
      setVolume(changed.x / 100)
      audioRef.current.volume = changed.x / 100
    }
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col w-80% gap-y-2">
        <div className="flex justify-between">
          <span className="font-poppins text-sm text-gray1">{timeLoaded}</span>
          <span className="font-poppins text-sm text-gray1">-{timeLeft}</span>
        </div>
        <ReactSlider
          axis="x"
          xmax={duration}
          x={currentTime}
          styles={{
            track: {
              width: '100%',
              height: '2px'
            },
            active: {
              background: '#27AE60'
            },
            thumb: {
              width: '15px',
              height: '15px',
              background: '#27AE60'
            }
          }}
          onChange={onSongProgressChange}
        />
      </div>
      <div className="flex flex-col w-70% gap-10">
        <div className="flex justify-between">
          <div className="flex gap-x-36px">
            <button>
              <BsShuffle fontSize={26} />
            </button>
            <button>
              <BsFillSkipBackwardFill fontSize={30} />
            </button>
          </div>
          <button className="relative w-16 h-16 rounded-full bg-green2 text-white">
            {isPlaying ? (
              <FaPause
                onClick={() => togglePlayStatus(false)}
                className="absolute left-1/4 top-27%" fontSize={30} />
            ) : (
              <FaPlay
                onClick={() => togglePlayStatus(true)}
                className="absolute left-1/3 top-27%" fontSize={28} />
            )}
          </button>
          <div className="flex gap-x-36px items-center">
            <button>
              <BsFillSkipForwardFill fontSize={30} />
            </button>
            <button>
              <FiRepeat
                onClick={toggleLoopedStatus}
                className={isLooped ? 'text-green2' : ''}
                fontSize={26} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-16px">
          <button
            onClick={setMuted}
          >
            {isMuted ? (
              <IoVolumeMute fontSize={20} />
            ) : (
              <IoVolumeLow fontSize={20} />
            )}
          </button>
          <ReactSlider
            axis="x"
            xmax={100}
            x={volume * 100}
            styles={{
              track: {
                width: '100%',
                height: '2px'
              },
              active: {
                background: '#27AE60'
              },
              thumb: {
                width: '10px',
                height: '10px',
                background: '#27AE60'
              }
            }}
            onChange={onVolumeChange}
          />
          <IoVolumeMedium fontSize={25} />
        </div>
      </div>
      <audio
        ref={audioRef}
        autoPlay={isAutoPlay}
        onLoadedData={onLoadedData}
        onTimeUpdate={onTimeUpdate}
        onEnded={onSongFinish} />
    </div>
  )
}

export default AudioPlayer
