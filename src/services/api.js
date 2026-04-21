import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function getToken() {
  const studentId =
    import.meta.env.VITE_STUDENT_ID || import.meta.env.VITE_STUDENT_USERNAME || '';

  const payload = {
    studentId,
    password: import.meta.env.VITE_STUDENT_PASSWORD,
  };

  const response = await api.post('/public/token', payload);
  return response.data?.token || '';
}

export async function getPrivateData(token) {
  const response = await api.get('/private/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data?.data || response.data;
}
