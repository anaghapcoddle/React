import axios from 'axios';

interface AddOrderType {
  employeeId: number;
  tableId: string | undefined;
  items: {
    id: number;
    quantity: number;
  }[];
}

interface Credentials {
  username: string;
  password: string;
}

interface Signupdata {
  username: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

type Billing = {
  orderId: string | undefined;
};

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  'token'
)}`;

export const postData = async (
  url: string,
  data: AddOrderType | Billing | Credentials | Signupdata | LoginCredentials
) => {
  try {
    const response = await axios.post(url, data);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const patchData = async (url: string, data: any) => {
  try {
    const response = await axios.patch(url, data);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const deleteData = async (url: string, data: any) => {
  try {
    const response = await axios.delete(url, data);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const getData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};
