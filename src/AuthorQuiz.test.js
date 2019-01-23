import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';

import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { deepStrictEqual } from 'assert';
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ['The Shining', 'It', 'The Adventures of Huckleberry Finn'],
    author: {
      name: 'Mark Twain',
      imageUrl: 'images/authors/marktwain.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['The Adventures of Huckleberry Finn']
    }
  },
  highlight: ''
};

describe('Author Quiz', ()=>{
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswer={()=>{}} />, div);
  });

  describe('When no answer has been selected', () => {
    let wrapper;
    beforeAll(()=>{
      wrapper = mount(<AuthorQuiz {...state} onAnswer={()=>{}} />);
    });

    it('should have white background', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('white');
    });
  });

  describe('When a wrong answer has been selected', () => {
    let wrapper;
    beforeAll(()=>{
      wrapper = mount(<AuthorQuiz turnData={state.turnData} onAnswer={()=>{}}
        highlight='wrong' />);
    });

    it('should have red background', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('red');
    });
  });

  // similar for correct answer => green

  describe('When the 1st answer is selected', () => {
    let wrapper;
    const onAnswerHandler = jest.fn();
    beforeAll(()=>{
      wrapper = mount(<AuthorQuiz {...state} onAnswer={onAnswerHandler} />);
      wrapper.find('.answer').first().simulate('click');
    });

    it('handler should be called', () => {
      expect(onAnswerHandler).toHaveBeenCalled();
    });

    it('handler should be called with "The Shining" ', () => {
      expect(onAnswerHandler).toHaveBeenCalledWith('The Shining');
    });
  });

})
