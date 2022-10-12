import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Title, TitleText, AddBtn } from './ContactForm.styled';
import { RiContactsBook2Line } from 'react-icons/ri';
import FieldInput from './FieldInput';

class ContactForm extends Component {
  state = { name: { name: '', number: '', email: '' } };

  inputHandler = e => {
    const { name, value } = e.currentTarget;

    this.setState(({ name: newName }) => ({
      name: { id: nanoid(), ...newName, [name]: value },
    }));
  };

  onFormSubmit = e => {
    e.preventDefault();
    const duplicateName = this.props.checkContact(this.state.name);

    if (duplicateName) {
      alert(`${this.state.name.name} is already in contacts!`);
    } else {
      this.props.addContact(this.state.name);
      this.setState({ name: { name: '', number: '', email: '' } });
    }
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <Title>
          <TitleText>Phone Book</TitleText>
          <RiContactsBook2Line size={40} display="inline-block" />
        </Title>

        <FieldInput
          title="Name"
          inputHandler={this.inputHandler}
          value={this.state.name.name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          hint="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        ></FieldInput>

        <FieldInput
          title="Phone"
          inputHandler={this.inputHandler}
          value={this.state.name.number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          hint="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        ></FieldInput>

        <FieldInput
          title="Email"
          inputHandler={this.inputHandler}
          value={this.state.name.email}
          type="mail"
          name="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          hint="Please type correct email"
        ></FieldInput>

        <AddBtn type="submit">Add contact</AddBtn>
      </form>
    );
  }
}

export default ContactForm;
