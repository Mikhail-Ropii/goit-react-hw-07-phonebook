import styled from '@emotion/styled';
import { nanoid } from 'nanoid';
import { Button, Label } from './ContactForm.styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useContacts } from 'components/redux/Slices';

const FormStyle = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const ErrorMessageStyle = styled(ErrorMessage)`
  color: red;
`;

const phoneValid =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const nameValid = /[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)/;

export const ContactForm = () => {
  const { contacts, addNewContact } = useContacts();

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

  const initialValues = {
    name: '',
    number: '',
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Type name')
      .matches(
        nameValid,
        'Name may contain only letters, apostrophe, dash and spaces'
      ),
    number: yup
      .string()
      .required('Type number')
      .matches(
        phoneValid,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormStyle>
        <Label htmlFor="name">
          Name
          <ErrorMessageStyle name="name" component="div" />
          <Field type="text" name="name" id="name" />
        </Label>
        <Label htmlFor="number">
          Number
          <ErrorMessageStyle name="number" component="div" />
          <Field type="tel" name="number" id="number" />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormStyle>
    </Formik>
  );
};
