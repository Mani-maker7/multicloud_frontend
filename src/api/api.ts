import axios from 'axios';

const awsApi = axios.create({
  baseURL: import.meta.env.VITE_AWS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const gcpApi = axios.create({
  baseURL: import.meta.env.VITE_GCP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { awsApi, gcpApi };
