import React, { createContext, useState } from "react";
import DeletePopUp from "../components/DeletePopUp";

export const DeleteContext = createContext();

export const DeleteProvider = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [deleteCallback, setDeleteCallback] = useState(null);

  const openDelete = (callback) => {
    setDeleteCallback(() => callback);
    setIsOpen(true);
  };

  const closeDelete = () => {
    setIsOpen(false);
    setDeleteCallback(null);
  };

  return (
    <DeleteContext.Provider value={{ openDelete }}>
      {children}

      {isOpen && (
        <DeletePopUp
          setDeletePopUp={closeDelete}
          onConfirm={() => {
            deleteCallback?.();
            closeDelete();
          }}
        />
      )}

    </DeleteContext.Provider>
  );
};