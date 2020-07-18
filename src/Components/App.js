import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import { uuid } from "uuidv4";
import ThemeContext from "../context/ThemeContext";

import Form from "./Form/Form";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import Layout from "./Layout/Layout";

import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    theme: "light",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contactsInLocalStorage = localStorage.getItem("contacts");
    if (contactsInLocalStorage) {
      this.setState({ contacts: JSON.parse(contactsInLocalStorage) });
    }
  }

  handlerAddContact = ({ name, number }) => {
    const contact = {
      id: uuid(),
      name: name,
      number: number,
    };

    const nameAtList = this.state.contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    const numberAtList = this.state.contacts.some(
      (contact) => contact.number === number
    );

    if (nameAtList) {
      toast.info(`${name} is already in contacts!`);
    } else if (numberAtList) {
      toast.info(`${number} is already in contacts!`);
    } else if (!name || !number) {
      toast.info("Please, fill out the form!");
    } else {
      this.setState((prevState) => {
        return {
          contacts: [...prevState.contacts, contact],
        };
      });
    }
  };

  handlerFilter = (filter) => {
    this.setState({ filter });
  };

  handlerVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handlerRemoveContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(
          (contact) => contact.id !== contactId
        ),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.handlerVisibleContacts();
    return (
      <ThemeContext>
        <>
          <Layout>
            <ToastContainer />
            <h1>Phonebook</h1>
            <Form onAddContact={this.handlerAddContact} />
            {contacts.length > 1 && (
              <Filter onFilter={this.handlerFilter} value={filter} />
            )}
            {contacts.length > 0 && <h2>Contacts</h2>}
            <ContactList
              contacts={visibleContacts}
              onRemoveContact={this.handlerRemoveContact}
            />
          </Layout>
        </>
      </ThemeContext>
    );
  }
}
