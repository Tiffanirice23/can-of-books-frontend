import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
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
      console.log(this.state.books);
    } catch (error) {
      console.log('we have an error: ', error.response.data);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    // <p key={book._id}>{book.title} is {book.status}</p>

    return (
      <>
        <header>
          <h1>Books</h1>
        </header>
        <main>

          {this.state.books.length > 0 ? (
            (
              <Carousel>
                {this.state.books.map((book) => (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="holder.js/800x400?text=First slide&bg=373940"
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>

                ))
                }
              </Carousel>
            )
          ) : (<h2> No books found!</h2>)
          }
        </main>
      </>
    )
  }
}

export default BestBooks;
