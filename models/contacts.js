const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const dataStr = await fs.readFile(contactsPath, "utf-8");
  const contactsList = JSON.parse(dataStr);
  return contactsList;
};

const getContactById = async contactId => {
  const contactsList = await listContacts();
  const contact = contactsList.find(contact => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async contactId => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContactsList = contactsList.filter(
    (contact, index) => index !== idx,
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
  return contactsList[idx];
};

const addContact = async body => {
  const contactsList = await listContacts();
  const newContact = { id: nanoid(), ...body };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const result = contactsList.find(contact => contact.id === contactId);
  if (!result) {
    return null;
  }

  const updatedContact = { ...result, ...body };
  const idx = contactsList.findIndex(contact => contact.id === contactId);
  contactsList.splice(idx, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
