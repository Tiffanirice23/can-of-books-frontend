import React from 'react';
import axios from 'axios';
// import './App.css';
// import Header from './Header';
// import Footer from './Footer';
// import BestBooks from './BestBooks';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";

let SERVER = process.env.REACT_APP_SERVER;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/books`);
      this.setState({
        books: results.data
      })
    } catch (error) {
      console.log('we have an error: ', error.response.data);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    let books = this.state.books.map((book) => (
      <p key={book._id}>{book.title} is {book.status}</p>
    ))
    return (
      <>
        <header>
          <h1>Books</h1>
        </header>
        <main>
          {
            this.state.books.length > 0 &&
            <>
              {books}
            </>
          }
        </main>
      </>
    )
  }
}

export default App;
