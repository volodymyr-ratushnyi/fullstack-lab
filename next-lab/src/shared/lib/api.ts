import {API_URL} from '@/shared/constants/constants'

class Api {
  async post(path: string, body: object) {
    const res = await fetch(API_URL + path, {
      method: "POST",
      body: JSON.stringify(body),
    })
    return await res.json()
  }
}

export const api = new Api()
