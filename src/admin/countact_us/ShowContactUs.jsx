import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from '../Admin';

export default function ShowContactUs() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/contact_us/show'); 
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/contact_us/delete/${id}`);
      setContacts(contacts.filter(contact => contact.id !== id)); // Silindikdən sonra vəziyyəti yeniləyir
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <>
      <Admin />
      <div className='adminHero'>
        <h2>Contact Messages</h2>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.message}</td>
                  <td>
                    <button className='delete-button' onClick={() => handleDelete(contact.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No messages found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
