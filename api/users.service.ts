import { api } from './client'
import type { UsersResponse } from './types'

export function getUsers() {
  return api.get('webhook/data-5dYbrVSlMVJxfmco').json<UsersResponse>()
}