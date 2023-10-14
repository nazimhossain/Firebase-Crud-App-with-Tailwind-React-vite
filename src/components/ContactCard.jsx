import { deleteDoc, doc } from "firebase/firestore";

import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdatecontact";
import useDisclose from "../useDisclose";
import {toast} from "react-toastify"


const ContactCard = ({ contact }) => {
  const {isOpen, onClose, onOpen} = useDisclose();

  
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="bg-yellow items-center justify-between flex p-2 rounded-lg "
      >
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-orange-500 text-4xl" />
          <div className="">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine onClick ={onOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-orange-500 cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdateContact isUpdate contact = {contact}  isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ContactCard;
