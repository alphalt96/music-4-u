import Envs from './env'
import { Song } from './types';

class Client {
  constructor(
    private readonly API_ENDPOINT = Envs.API_ENDPOINT || ''
  ) { }

  private get(path: string) {
    return fetch(
      `${this.API_ENDPOINT}${path}`,
      {
        method: 'GET'
      }
    )
  }

  async getSongDownloadUrl(id: number): Promise<string> {
    const response = await this.get(`/getSongMediaFile/${id}`);

    const data = await response.json()
    return data.url;
  }

  async getSongMediaFile(downloadUrl: string) {
    const response = await fetch(downloadUrl);

    const data = await response.body?.getReader()
    
    return data
  }

  async getRecommendedSongs(): Promise<Song[]> {
    const response = await this.get('/getRecommendedSongs')

    const responseBody = await response.json()

    return responseBody.data
  }

  async getTopChartSongs(): Promise<Song[]> {
    const response = await this.get('/getTopChartSongs')

    const responseBody = await response.json()

    return responseBody.data
  }

  async getSongImageUrl(id: number): Promise<string> {
    const response = await this.get(`/getSongImage/${id}`)

    const responseBody = await response.json()

    return responseBody.url
  }
}

export default new Client()
