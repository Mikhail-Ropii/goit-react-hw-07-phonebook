import { useEffect } from 'react';
import { Container, Title, ContcTitle, Section } from './Phonebook.styled';
import { ContactForm } from './contactForm/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';
import { useDispatch } from 'react-redux';
import { fetchContacts } from './redux/ContactsOperation';

// const LS_KEY = 'contacts';
export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function asyncContacts() {
      dispatch(fetchContacts());
    }
    asyncContacts();
  }, [dispatch]);

  return (
    <Container>
      <Section>
        <Title>Phonebook</Title>
        <ContactForm />
        <ContcTitle>Contacts</ContcTitle>
        <Filter />
        <ContactList />
      </Section>
    </Container>
  );
}
