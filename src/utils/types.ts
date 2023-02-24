import { Dispatch, SetStateAction } from 'react'
import { User } from './models/user'

export type SidebarPropType = {
  user?: User | null
}

export type Song = {
  id: number
  title: string
  artist: string
  img: string
  releasedDate: string
  duration: number
}

export type SongItemPropType = {
  isActive?: boolean
  song: Song
}

export type DiscoverPropsType = {
  topCharts: Song[]
  recommendedSongs: Song[]
}

export type TopChartPropsType = {
  songs: Song[]
} 

export type RecommnedSongPropsType = {
  songs: Song[]
}

export type AudioPlayerPropsType = {
  onFinish: () => void
}

export type PlayerReduxStateType = {
  playingSong: Song | null
}
