import { nanoid } from 'nanoid';
import { useEffect, useMemo } from 'react';
import { Container, Title, ContcTitle, Section } from './Phonebook.styled';
import { ContactForm } from './contactForm/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';
import { useContacts } from './redux/Slices';

// const LS_KEY = 'contacts';
export function App() {
  const {
    contacts,
    filter,
    addNewContact,
    filterContacts,
    deleteContact,
    getAllContacts,
  } = useContacts();

  useEffect(() => {
    getAllContacts();
  });

  const handleSubmit = (values, { resetForm }) => {
    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase().trim() === values.name.toLowerCase().trim()
      )
    ) {
      alert(`${values.name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(5),
      name: values.name,
      number: values.number,
    };

    addNewContact(newContact);

    resetForm();
  };

  const onChangeFilter = evt => {
    filterContacts(evt.currentTarget.value);
  };

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
    <Container>
      <Section>
        <Title>Phonebook</Title>
        <ContactForm onHandleSubmit={handleSubmit} />
        <ContcTitle>Contacts</ContcTitle>
        <Filter filter={filter} onChangeFilter={onChangeFilter} />
        <ContactList
          contacts={findContact}
          handleDeleteContact={handleDeleteContact}
        />
      </Section>
    </Container>
  );
}
