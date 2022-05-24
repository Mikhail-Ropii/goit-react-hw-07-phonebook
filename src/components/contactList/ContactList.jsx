import { ContactItem } from '../contactItem/ContactItem';
import { Button, BookItem } from './ContactList.styled';
import { useContacts } from '../redux/Slices';
import { useMemo } from 'react';

export const ContactList = () => {
  const { contacts, filter, deleteContact } = useContacts();

  const findContact = useMemo(() => {
    return (
      contacts?.filter(contact =>
        contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
      ) ?? []
    );
  }, [contacts, filter]);

  const handleDeleteContact = id => {
    deleteContact(id);
  };

  return (
    <ul>
      {findContact.map(({ id, name, phone }) => (
        <BookItem key={id}>
          <ContactItem name={name} number={phone} />
          <Button type="button" onClick={() => handleDeleteContact(id)}>
            Delete
          </Button>
        </BookItem>
      ))}
    </ul>
  );
};
