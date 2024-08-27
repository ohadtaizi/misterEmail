import React, { useEffect, useState } from "react";
import { emailService } from "../services/emailService.js";
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { Outlet } from "react-router-dom";

export function EmailIndex() {
  const [emails, setEmail] = useState([]);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());
  const [sortBy, setSortBy] = useState({ field: 'date', order: 'desc' }); // Add state for sorting

// const [filterBy, setFilterBy] = useState(null);
console.log(filterBy);
  useEffect(() => {
    loadEmail();
  }, [filterBy,sortBy]);
  
  async function loadEmail() {
    try {
      const emails = await emailService.queryfromLocalStorge(filterBy, sortBy);
      console.log(emails);
      setEmail(emails);
    } catch (err) {
      console.error("Failed to load emails:", err);
      alert("Couldn't load emails");
    }
  }
  async function removeEmail(emailId) {
    try {
        await emailService.remove(emailId)
        setEmails(email => emails.filter(email => email.id !== emailId))
    } catch (err) {
        console.log(err)            
        alert('Couldnt remove email')
    }
}
// function onSetFilter(status) {
//   return () => {
//       if (setFilterBy) {
//           setFilterBy(prevFilter => ({
//               ...prevFilter,
//               status, 
//               isRead: null, // Reset isRead filter when changing status
//           }));
//       } else {
//           console.error('setFilterBy is not a function');
//       }
//   };
// }
function onSetSort(field, order) {
  setSortBy({ field, order }); // Update the sorting criteria
}

  if (!emails) return <div>Loading...</div>;

  return (
    <section className="email-index"   >
      <EmailFolderList filterBy={filterBy} setFilterBy={setFilterBy} />
      {/* <section className="emails-list"> */}
      <EmailFilter setFilterBy={setFilterBy} onSetSort={onSetSort} /> {/* Pass onSetSort as a prop */}
        
        <EmailList emails={emails} onRemove={removeEmail} />
      {/* </section> */}
      <Outlet />
    </section>
  );
}
