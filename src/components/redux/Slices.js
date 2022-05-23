import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact, deleteContact } from './ContactsOperation';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending](state, action) {},
    [fetchContacts.fulfilled](state, action) {
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.error = action.payload;
    },
    [addContact.pending](state, action) {},
    [addContact.fulfilled](state, action) {
      state.items.push(action.payload);
    },
    [addContact.rejected](state, action) {
      state.error = action.payload;
    },
    [deleteContact.pending](state, action) {},
    [deleteContact.fulfilled](state, action) {
      state.items = state.items.filter(
        contact => contact.id !== action.payload.id
      );
    },
    [deleteContact.rejected](state, action) {
      state.error = action.payload;
    },
  },
});

export default contactsSlice.reducer;

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter: (_, action) => action.payload,
  },
});

export const { changeFilter } = filterSlice.actions;

//Selectors
const getContacts = state => state.contacts.items;
const getFilterValue = state => state.filter;

//Hooks
export const useContacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterValue);
  const addNewContact = newContact => dispatch(addContact(newContact));
  const filterContacts = value => dispatch(changeFilter(value));
  const deleteContactById = id => dispatch(deleteContact(id));

  return {
    contacts,
    filter,
    addNewContact,
    filterContacts,
    deleteContact: deleteContactById,
  };
};
