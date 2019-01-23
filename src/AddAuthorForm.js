import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import './AddAuthorForm.css'

class AuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      books: [],
      newBook: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onAddAuthor(this.state);
  }

  onClick(event) {
    this.setState({ books: this.state.books.concat(this.state.newBook) });
    this.setState({ newBook: ''});
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="AddAuthorForm__input">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={this.state.name}
            onChange={this.onChange}></input>
        </div>
        <div className="AddAuthorForm__input">
          <label htmlFor="imageUrl">Image Url</label>
          <input type="text" name="imageUrl" value={this.state.imageUrl}
            onChange={this.onChange}></input>
        </div>
        <div className="AddAuthorForm__input">
          <label htmlFor="newBook">Books</label>
          {this.state.books.map(book => <p key={book}>{book}</p>)}
          <input type="text" name="newBook" value={this.state.newBook}
            onChange={this.onChange}></input>
          <input type="button" value="+"
            onClick={this.onClick} ></input>
        </div>
        <input type="submit" value="OK" ></input>
      </form>
    );
  }
}

function AddAuthorForm({match, onAddAuthor}) {
  return (
    <div className="AddAuthorForm">
      <h1>Add Author</h1>
      <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>
  );
}

const mapStateToProps = (state) => { return {} }; // no need to access the store / state in this form

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddAuthor: (author) => {
      dispatch({type: 'ADD_AUTHOR', author});
      props.history.push('/'); // navigate back to app root
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  AddAuthorForm
));
