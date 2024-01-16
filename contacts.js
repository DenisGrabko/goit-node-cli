import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = listContacts();
  const result = contacts.find(({ id }) => id === contactId) ?? null;

  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContacts = { id: nanoid(), name, email, phone };

  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContacts;
}

export { listContacts, getContactById, removeContact, addContact };
