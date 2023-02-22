import Envs from './env'

class Client {
  constructor(
    private readonly API_ENDPOINT = Envs.API_ENDPOINT || ''
  ) { }

  async getSongDownloadUrl(id: string): Promise<string> {
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
}

export default new Client()
