import ky from 'ky'

export const api = ky.extend({
  prefixUrl: process.env.EXPO_PUBLIC_API_URL,
})