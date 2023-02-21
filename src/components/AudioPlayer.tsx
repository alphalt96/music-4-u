import React, { useRef, useState } from 'react'
import ReactSlider from 'react-input-slider'
import { FaRandom, FaPlay, FaPause } from 'react-icons/fa'
import { FiRepeat } from 'react-icons/fi'
import { BsFillSkipForwardFill, BsFillSkipBackwardFill } from 'react-icons/bs'
import { IoVolumeLow, IoVolumeMedium, IoVolumeHigh, IoVolumeMute } from 'react-icons/io5'

import song from '../assets/default.mp3'

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const onSliderChange = (changed: { x: number }) => {
    if (audioRef.current) {
      audioRef.current.currentTime = changed.x
      setCurrentTime(changed.x)
    }
  }

  const onTimeUpdate = (event: any) => {
    setCurrentTime(audioRef.current?.currentTime || 0)
  }

  const onLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      // setIsPlaying(true)
      // audioRef.current.muted = true
      // audioRef.current.play()
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

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col w-80% gap-y-2">
        <div className="flex justify-between">
          <span className="font-poppins text-sm text-gray1">2:14</span>
          <span className="font-poppins text-sm text-gray1">-1:15</span>
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
          onChange={onSliderChange}
        />
      </div>
      <div className="flex flex-col w-70% gap-10">
        <div className="flex justify-between">
          <div className="flex gap-x-36px">
            <button>
              <FaRandom fontSize={26} />
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
              <FiRepeat fontSize={26} />
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
            x={0}
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
            onChange={onSliderChange}
          />
          {!isMuted && <IoVolumeMedium fontSize={25} />}
        </div>
      </div>
      <audio
        ref={audioRef} 
        src={song}
        onLoadedData={onLoadedData}
        onTimeUpdate={onTimeUpdate}
        onEnded={_ => setIsPlaying(false)} />
    </div>
  )
}

export default AudioPlayer
