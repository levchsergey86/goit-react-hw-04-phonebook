import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import FilterContacts from './FilterContacts/FilterContacts';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import styled from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const deleteContact = id => {
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.filter(contact => contact.id !== id);
      return updatedContacts;
    });
  };

  const addContact = (name, number) => {
    const isContactExists = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (isContactExists) {
      alert('Contact with the same name or number already exists.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styled.container}>
      <h1>PHONE BOOK</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts:</h2>
      <FilterContacts handleFilterChange={handleFilterChange} />
      <ContactList
        filteredContacts={filteredContacts}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
