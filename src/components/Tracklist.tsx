import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { FaRandom } from 'react-icons/fa'
import { FiRepeat } from 'react-icons/fi'
import { RxDragHandleHorizontal } from 'react-icons/rx'

import { Song, TracklistPropsType } from '../utils/types'
import photo from '../assets/default.png'
import SongItem from './SongItem'

const Tracklist = ({ playingSong, setPlayingSong, trackList, setTrackList }: TracklistPropsType) => {
  const [isLooped, setIsLooped] = useState(false)
  const [selectItemIdx, setSelectItemIdx] = useState<number | null>(null)
  const [dragOverItemIdx, setDragOverItemIdx] = useState<number | null>(null)

  const onDragStart = (e: any, idx: number) => {
    setSelectItemIdx(idx)
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.parentNode)
    e.dataTransfer.setDragImage(e.target.parentNode, 10, 20)
  }

  const onDragEnd = () => {
    if (dragOverItemIdx === selectItemIdx) return

    const newSongList = trackList.filter((_, i) => i !== selectItemIdx)
    newSongList.splice(dragOverItemIdx!, 0, trackList[selectItemIdx!])
    setTrackList(newSongList)
    setSelectItemIdx(null)
    setDragOverItemIdx(null)
  }

  const onDragEnter = (idx: number) => {
    setDragOverItemIdx(idx)
  }

  return (
    <div className="flex flex-col w-80 px-4">
      <div className="flex flex-col gap-y-3 mt-6">
        <span className="font-poppins text-gray3 text-xl font-bold">Track list</span>
        <div className="flex gap-x-4">
          <button>
            <FaRandom
              fontSize={20}
              className="text-gray4" />
          </button>
          <button onClick={_ => setIsLooped(!isLooped)}>
            <FiRepeat
              fontSize={20}
              className={isLooped ? 'text-green2' : 'text-gray4'} />
          </button>
        </div>
        <span className="font-poppins text-gray1 text-sm">Playing next</span>
      </div>
      <div className="flex flex-col gap-y-9px mt-3 overflow-scroll hide-scrollbar">
        {trackList.map((song, idx) => (
          <div key={idx} onDragEnter={_ => onDragEnter(idx)} className="flex items-center gap-x-2">
            <button 
              draggable 
              onDragStart={e => onDragStart(e, idx)}
              onDragEnd={onDragEnd}>
              <RxDragHandleHorizontal className="text-gray1" />
            </button>
            <SongItem isActive={song.id === playingSong?.id} song={song} setPlayingSong={setPlayingSong} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tracklist
