import React, { useReducer, useState } from "react";
import { reducer } from "./reducer";
const booksData = [
  { id: 1, name: "Pather Panchal" },
  { id: 2, name: "Padma Nadir Majhi" },
  { id: 3, name: "Srikanta" },
];

const Modal = ({ modalText }) => {
  return <p>{modalText}</p>;
};

const initialState = {
  books: booksData,
  isModalOpen: false,
  modalText: "",
};

const UseReducer = () => {
  const [bookState, dispatch] = useReducer(reducer, initialState);

  const removeBooks = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  /* const [books, setBooks] = useState(booksData);
  const [modalText, setModalText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); */
  const [bookName, setBookName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { id: new Date().getTime().toString(), name: bookName };
    dispatch({ type: "ADD", payload: newBook });
    setBookName("");
  };
  return (
    <div>
      <h1>Book List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={bookName}
          onChange={(e) => {
            setBookName(e.target.value);
          }}
        />
        <button type="submit">Add Book</button>
      </form>
      {bookState.isModalOpen && <Modal modalText={bookState.modalText} />}
      {bookState.books.map((book) => {
        const { id, name } = book;
        return (
          <li key={id}>
            {name}{" "}
            <button
              onClick={() => {
                removeBooks(id);
              }}
            >
              Remove Book
            </button>
          </li>
        );
      })}
    </div>
  );
};

export default UseReducer;
