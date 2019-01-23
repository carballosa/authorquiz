import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom'

import './index.css';

import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';

import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn']
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness']
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Ogren',
    books: ['Harry Potter and the Sorcerers Stone']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT']
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce((list,author) =>
    list.concat(author.books), []);
  const fourRandonBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandonBooks);
  return {
    books: fourRandonBooks,
    author: authors.find(author =>
      author.books.some(book => book === answer))
  };
}

let state;
function resetState() {
  state = {
    turnData: getTurnData(authors),
    highlight: ''
  };
}
resetState();

function onAnswer(answer) {
  const isCorrect = state.turnData.author.books.some(book => book === answer);
  state.highlight = isCorrect? 'correct' : 'wrong';
  render();
}

function AuthorQuizWrapper() {
  return (
    <AuthorQuiz {...state} onAnswer={onAnswer} onContinue={()=>{
      resetState();
      render();
    }} />
  );
}

const AddAuthorWrapper = withRouter(({history}) =>
  <AddAuthorForm onAddAuthor={({name, imageUrl, books}) => {
    authors.push({name, imageUrl, books});
    history.push('/'); //navigate back to the app root
  }} />
);

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path='/' component={AuthorQuizWrapper} />
        <Route path='/add' component={AddAuthorWrapper} />
      </React.Fragment>
    </BrowserRouter>,

    document.getElementById('root')
  );
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
