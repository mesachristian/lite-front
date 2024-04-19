import axios from "axios";

export const callExternalApi = async (options: any) => {
    try {
      const response = await axios(options.config);
      const { data } = response;
  
      return {
        data,
        error: null,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
  
        const { response } = axiosError;
  
        let message = "http request failed";
  
        const statusText = response?.statusText; 
  
        if (statusText) {
          message = statusText;
        }
  
        if (axiosError.message) {
          message = axiosError.message;
        }
  
        const responseMessage = response?.data?.message;
  
        if (responseMessage) {
          message = responseMessage;
        }
  
        return {
          data: null,
          error: {
            message,
          },
        };
      }
  
      return {
        data: null,
        error: {
          message: error.message,
        },
      };
    }
  };