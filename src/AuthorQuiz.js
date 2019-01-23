import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';


import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css'

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  )
}

function Book({title, onClick}) {
  return (
    <div className="answer" onClick={onClick}>
      <h4>{title}</h4>
    </div>
  );
}

function Turn({author, books, highlight, onAnswer}) {
  function backgroundColor(highlight) {
    const mapping = {
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight] || 'white';
  }
  return (
    <div className="row turn" style={{backgroundColor: backgroundColor(highlight)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-6">
        {books.map(title => <Book title={title} key={title} onClick={() => onAnswer(title)}/>)}
      </div>
    </div>
  );
}
Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlight: PropTypes.string.isRequired,
  onAnswer: PropTypes.func.isRequired
}

function Continue({show, onContinue}) {
  return (
    <div className="row continue">
      {
        show?
          <div className="col-11">
            <button className="btn btn-primary btn-lg float-right"
              onClick={onContinue}>Continue</button>
          </div>
        : null
      }
    </div>
  );
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">All images are from
          <a href="#">Wikipedia Commons</a> and are public domain
        </p>
      </div>
    </div>
  );
}

function AuthorQuiz({turnData, highlight, onAnswer, onContinue}) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} highlight={highlight} onAnswer={onAnswer} />
      <Continue show={highlight==='correct'} onContinue={onContinue} />
      <p><Link to="/add">Add an author</Link></p>
      <Footer />
    </div>
  );
}

export default AuthorQuiz;
