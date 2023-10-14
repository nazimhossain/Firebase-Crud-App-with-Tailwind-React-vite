import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div
          
          className=" grid place-items-center backdrop-blur top-0 h-screen w-screen absolute z-40"
        >
          <div className="  m-auto relative z-50 min-h-[200px] min-w-[80%] bg-white p-4">
            <div className="flex justify-end text-2xl ">
              <AiOutlineClose onClick={onClose} className="cursor-pointer" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
