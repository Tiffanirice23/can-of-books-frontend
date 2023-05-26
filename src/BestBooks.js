import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
import UpdateBook from './UpdateBook';
import './BestBooks.css';
import { Button } from 'react-bootstrap';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModalDisplaying: false,
      showUpdateModal: false,
      selectedBook: {}
    }
  }

  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/books`);

      console.log(results)
      this.setState({
        books: results.data
      })
      console.log(this.state.books);
    } catch (error) {
      console.log('we have an error: ', error.response.data);
    }
  }

  postBook = async (newBook) => {
    try {
      let url = `${SERVER}/books`
      let createdBook = await axios.post(url, newBook);
      console.log(createdBook.data);
      this.setState({
        books: [...this.state.books, createdBook.data]
      });
    } catch (error) {
      console.log('OOP THERE IS AN ERROR: ', error.response.data)
    }
  }

  handleBookSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target.title.value);
    // console.log(event.target.description.value);
    // console.log(event.target.status.checked);
    let newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked
    }
    this.postBook(newBook);
  }

  deleteBook = async (book) => {
    let id = book._id
    console.log(id);
    try {
      let url = `${SERVER}/books/${id}`;
      await axios.delete(url);
      // this.getBooks();
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks
      })
    } catch (error) {
      console.log('we have an error: ', error.response.data)
    }
  }

  putBook = async (bookToUpdate) => {
    try {
      let url = `${SERVER}/books/${bookToUpdate._id}`;
      let updatedBook = await axios.put(url, bookToUpdate);
      let updatedBooks = this.state.books.map(existingBook => {
        return existingBook._id === bookToUpdate._id
          ? updatedBook.data
          : existingBook;
      });
      this.setState({
        books: updatedBooks,
        // showUpdateModal: true,
      })
    } catch (error) {
      console.log('we have an error: ', error.response.data)
    }
  }

  handleShowModal = () => {
    this.setState({
      isModalDisplaying: true
    });
  }

  handleCloseModal = () => {
    this.setState({
      isModalDisplaying: false,
      showUpdateModal: false
    })
  }


  handleUpdateModal = (book) => {
    this.setState({
      showUpdateModal: true,
      selectedBook: book
    });
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    // <p key={book._id}>{book.title} is {book.status}</p>
    // console.log('!!!!!!', this.bookToUpdate);
    return (
      <>
        <header className="subHead">
          <BookFormModal
            show={this.state.isModalDisplaying}
            handleClose={this.handleCloseModal}
            handleShow={this.handleShowModal}
            handleBookSubmit={this.handleBookSubmit}
          />
          <UpdateBook
            show={this.state.showUpdateModal}
            handleClose={this.handleCloseModal}
            // handleShow={this.handleShowModal}
            putBook={this.putBook}
            book={this.state.selectedBook}
          />
          <Button variant="primary" className="addButton" onClick={this.handleShowModal} > Add Book! </Button>
        </header>
        <main>

          {this.state.books.length > 0 ? (

            <Carousel>
              {this.state.books.map((value, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100 carousel-img"
                    src="stack.jpg"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                    <Button variant="primary" onClick={() => this.deleteBook(value)} > Delete Book </Button>
                    <Button variant="secondary" onClick={() => this.handleUpdateModal(value)} > Update Book </Button>
                  </Carousel.Caption>
                </Carousel.Item>

              ))}
            </Carousel>
          ) : (<h2> No books found!</h2>)
          }
        </main>
      </>
    )
  }
}

export default BestBooks;
