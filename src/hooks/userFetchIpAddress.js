import axios from 'axios';

const useFetchIPAddress = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching the IP address:', error);
    throw error;
  }
};

export default useFetchIPAddress;
