const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
};

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
};

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const [contact] = contacts.filter(({ id }) => id === contactId);

    return contact;
};

const removeContact = async (contactId) => {
    const data = await listContacts();
    const contacts = data.filter(({ id }) => id !== contactId);
    await updateContacts(contacts);

    return data.filter(({ id }) => id === contactId)[0] || null;
};

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id: uid(),
        name: name,
        email: email,
        phone: phone,
    };
    contacts.push(newContact);
    await updateContacts(contacts);

    return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { id, name, email, phone };
    await updateContacts(contacts);

    return contacts[index];
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
