import React from 'react';
import axios from 'axios';

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

export default BestBooks;



// import React from 'react';

// class BestBooks extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       books: []
//     }
//   }

//   /* TODO: Make a GET request to your API to fetch all the books from the database  */

//   render() {

//     /* TODO: render all the books in a Carousel */

//     return (
//       <>
//         <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

//         {this.state.books.length ? (
//           <p>Book Carousel coming soon</p>
//         ) : (
//           <h3>No Books Found :(</h3>
//         )}
//       </>
//     )
//   }
// }

// export default BestBooks;
