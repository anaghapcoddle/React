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

export const postData = async (
  url: string,
  data: AddOrderType | Billing | Credentials | Signupdata | LoginCredentials
) => {
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

export const patchData = async (url: string, data: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const deleteData = async (url: string, data: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
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
