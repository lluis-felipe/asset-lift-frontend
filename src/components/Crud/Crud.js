import axios from 'axios';

const API_BASE_URL = 'assetlift';

// Método para criar dados
// const createData = async (address, newData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/${address}`, newData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating data:', error);
//     throw error;
//   }
// };

// Método para atualizar dados
// const updateData = async (address, updatedData) => {
//   try {
//     const response = await axios.put(`${API_BASE_URL}/${address}`, updatedData);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating data:', error);
//     throw error;
//   }
// };

// Método para buscar dados
const fetchData = async (address) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${address}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


// Método para excluir dados
const deleteData = async (address) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${address}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

export { fetchData, deleteData };
