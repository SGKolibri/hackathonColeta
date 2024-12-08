import { useAuth } from "../utils/AuthProvider";
import axiosInstance from "../utils/AxiosInstance";

const useApi = () => {
  const { token } = useAuth();

  interface GetResponse {
    data: any;
  }

  const get = async (url: string): Promise<GetResponse> => {
    try {
      const response = await axiosInstance.get<GetResponse>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const post = async (url: string, data: any) => {
    try {
      const response = await axiosInstance.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return { get, post };
};

export default useApi;
