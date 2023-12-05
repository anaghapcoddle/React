import axios from 'axios';

const postData = async (url: string, data: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export default postData;
