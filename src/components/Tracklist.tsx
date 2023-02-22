import React, { useRef, useState } from 'react'
import { FaRandom } from 'react-icons/fa'
import { FiRepeat } from 'react-icons/fi'
import { RxDragHandleHorizontal } from 'react-icons/rx'

import { Song } from '../utils/types'
import photo from '../assets/default.png'
import SongItem from './SongItem'

const Tracklist = () => {
  const trackItemRef = useRef(null)

  const data: Song[] = []
  for (let i = 0; i < 20; i++) {
    data.push({
      id: i + 1,
      title: `Song ${i + 1}`,
      artist: 'nobody 1',
      releasedDate: new Date(),
      img: photo,
      duration: 280
    })
  }

  const [songList, setSongList] = useState(data)
  const [selectItemIdx, setSelectItemIdx] = useState<number | null>(null)
  const [dragOverItemIdx, setDragOverItemIdx] = useState<number | null>(null)

  const onDragStart = (e: any, idx: number) => {
    setSelectItemIdx(idx)
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.parentNode)
    e.dataTransfer.setDragImage(e.target.parentNode, 10, 20)
  }

  const onDragOver = (idx: number) => {
    setDragOverItemIdx(idx)
  }

  const onDragEnd = () => {
    if (dragOverItemIdx === selectItemIdx) return

    const newSongList = songList.filter((_, i) => i !== selectItemIdx)
    newSongList.splice(dragOverItemIdx!, 0, songList[selectItemIdx!])
    setSongList(newSongList)
    setSelectItemIdx(null)
    setDragOverItemIdx(null)
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
          <button>
            <FiRepeat
              fontSize={20}
              className="text-gray4" />
          </button>
        </div>
        <span className="font-poppins text-gray1 text-sm">Playing next</span>
      </div>
      <div className="flex flex-col gap-y-9px mt-3 overflow-scroll hide-scrollbar">
        {songList.map((song, idx) => (
          <div key={idx} onDragOver={_ => onDragOver(idx)} ref={trackItemRef} className="flex items-center gap-x-2">
            <button 
              draggable 
              onDragStart={e => onDragStart(e, idx)}
              onDragEnd={onDragEnd}>
              <RxDragHandleHorizontal className="text-gray1" />
            </button>
            <SongItem song={song} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tracklist
