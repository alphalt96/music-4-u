import Envs from './env'
import { User } from './models/user';
import { Song } from './types';

export type GetAccessTokenResponse = {
  access_token: string,
  user: {
    id: string,
    username: string
  }
}

class Client {
  constructor(
    private readonly API_ENDPOINT = Envs.API_ENDPOINT || ''
  ) { }

  private get(path: string) {
    return fetch(
      `${this.API_ENDPOINT}${path}`,
      {
        method: 'GET',
        credentials: 'include'
      }
    )
  }

  private post(path: string, body: any) {
    return fetch(
      `${this.API_ENDPOINT}${path}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body)
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

  async getAccessToken(email: string, password: string): Promise<GetAccessTokenResponse> {
    const response = await this.post('/getAccessToken', {
      username: email,
      password
    })

    const bodyData = await response.json()

    return bodyData
  }

  async getUser(id: number): Promise<User> {
    const response = await this.get(`/getUser/${id}`)

    const responseBody = await response.json()

    return responseBody.data
  }
}

export default new Client()
