import Envs from './env'
import { Song } from './types';

class Client {
  constructor(
    private readonly API_ENDPOINT = Envs.API_ENDPOINT || ''
  ) { }

  async getSongDownloadUrl(id: number): Promise<string> {
    const response = await fetch(
      `${this.API_ENDPOINT}/getSongMediaFile/${id}`,
      {
        method: 'GET'
      }
    );

    const data = await response.json()
    return data.url;
  }

  async getSongMediaFile(downloadUrl: string) {
    const response = await fetch(
      downloadUrl,
      {
        method: 'GET'
      }
    );

    const data = await response.body?.getReader()
    
    return data
  }

  async getRecommendedSongs(): Promise<Song[]> {
    const response = await fetch(
      `${this.API_ENDPOINT}/getRecommendedSongs`,
      {
        method: 'GET'
      }
    )

    const responseBody = await response.json()

    return responseBody.data
  }

  async getTopChartSongs(): Promise<Song[]> {
    const response = await fetch(
      `${this.API_ENDPOINT}/getTopChartSongs`,
      {
        method: 'GET'
      }
    )

    const responseBody = await response.json()

    return responseBody.data
  }

  async getSongImageUrl(id: number): Promise<string> {
    const response = await fetch(
      `${this.API_ENDPOINT}/getSongImage/${id}`,
      {
        method: 'GET'
      }
    )

    const responseBody = await response.json()

    return responseBody.url
  }
}

export default new Client()
