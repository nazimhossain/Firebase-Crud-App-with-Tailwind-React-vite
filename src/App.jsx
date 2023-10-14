import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";

import AddAndUpdateContact from "./components/AddAndUpdatecontact";
import useDisclose from "./useDisclose";
import ContactNotFound from "./components/ContactNotFound";

export default function App() {
  const [contacts, setContacts] = useState([]);

    const {isOpen, onClose, onOpen} = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
       

        // real time data updating 
        onSnapshot(contactsRef, (snapshot) => {
          const contactsLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsLists);
          return contactsLists
        });

        
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);


  // for filtering from database

 const filterContacts = (e) => {
  const value = e.target.value
  const contactsRef = collection(db, "contacts");
       

  // real time data updating 
  onSnapshot(contactsRef, (snapshot) => {
    const contactsLists = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    const filteredContacts = contactsLists.filter(contact => 
      contact.name.toLowerCase().includes(value.toLowerCase())
      )
    setContacts(filteredContacts);


    return filteredContacts
  });


 }






  return (
    <>
      <div className="max-w-[360px] mx-auto px-4 ">
        <Navbar />
        <div className="flex gap-2  ">
          <div className="flex relative items-center w-80  ">
            <FiSearch className="ml-1 text-4xl absolute text-white" />
            <input
            onChange={filterContacts}
              type="text"
              className=" pl-10 h-10 border border-white rounded-md flex-grow bg-transparent text-white "
            />
          </div>

          <AiFillPlusCircle
            onClick={onOpen}
            className="text-5xl text-white cursor-pointer "
          />
        </div>
        <div className="mt-4 gap-3 flex flex-col ">
          {contacts.length <= 0 ? (<ContactNotFound/>) :
          
          (contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          )))}
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
   <ToastContainer
   position = "bottom-center"/>
    </>
  );
}
