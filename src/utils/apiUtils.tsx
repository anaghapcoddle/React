import axios from 'axios';

export const postData = async (url: string, data: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Anagha ${token}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const getData = async (url: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};
