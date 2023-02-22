import { User } from './models/user'

export type SidebarPropType = {
  user?: User | null
}

export type Song = {
  id: number
  title: string
  artist: string
  img: string
  releasedDate: Date
  duration: number
}

export type SongItemPropType = {
  song: Song
}
