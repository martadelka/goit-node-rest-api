import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

export async function getById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }

  const deletedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact[0];
}

export async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export async function updateById(id, data) {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex((el) => el.id === id);
  if (contactIndex === -1) {
    return null;
  }

  const contactToUpdate = contacts.find((el) => el.id === id);
  contacts[contactIndex] = { id, ...contactToUpdate, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIndex];
}