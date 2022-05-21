import { createAsyncThunk } from '@reduxjs/toolkit';
import * as Api from '../services/Api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await Api.getContacts();
      return contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, { rejectWithValue }) => {
    try {
      const contacts = await Api.addContact(data);
      return contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const contacts = await Api.deleteContact(id);
      return contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
