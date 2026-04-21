const BASE_URL = 'https://t4e-testserver.onrender.com/api'
const CREDENTIALS = {
  studentId: 'E0223018',
  set: 'setB',
  password: '737200',
}

const requestJson = async (url, options = {}) => {
  const response = await fetch(url, options)
  const data = await response.json()

  if (!response.ok) {
    const message = data?.message || 'Request failed'
    throw new Error(message)
  }

  return data
}

export const fetchToken = async () => {
  const data = await requestJson(`${BASE_URL}/public/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(CREDENTIALS),
  })

  const token = data?.token || data?.access_token || data?.accessToken || data?.jwt
  const dataUrl = data?.dataUrl || data?.data_url

  if (!token) {
    throw new Error('Token missing in response')
  }

  if (!dataUrl) {
    throw new Error('Data URL missing in response')
  }

  return { token, dataUrl }
}

export const fetchPrivateData = async (token, dataUrl) =>
  requestJson(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const fetchAppData = async () => {
  const { token, dataUrl } = await fetchToken()
  return fetchPrivateData(token, dataUrl)
}
