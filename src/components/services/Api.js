import axios from 'axios';

axios.defaults.baseURL = 'https://62866f9af0e8f0bb7c1630aa.mockapi.io';

export const getContacts = async () => {
  const response = await axios.get('/contacts');
  return response.data;
};

export const addContact = async data => {
  const response = await axios.post('/contacts', data);
  return response.data;
};

export const deleteContact = async id => {
  const response = await axios.delete(`/contacts/${id}`);
  return response.data;
};
