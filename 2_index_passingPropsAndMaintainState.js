import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {

    /*
    React components can have state by setting this.state in their constructors. this.state
    should be considered as private to a React component that it’s defined in. Let’s store the 
    current value of the Square in this.state, and change it when the Square is clicked.

    Note:
    In JavaScript classes, you need to always call super when defining the constructor of a subclass. 
    All React component classes that have a constructor should start it with a super(props) call.

    */
    constructor(props) {
        super(props);
        this.state = {
          value: null,
        };
    }

    render() {
      return (
        /*
        Making an interactive component
        Let’s fill the Square component with an “X” when we click it.

        As a next step, we want the Square component to “remember” that it got clicked, 
        and fill it with an “X” mark. To “remember” things, components use state.       
        
        By calling this.setState from an onClick handler in the Square’s render method, we tell 
        React to re-render that Square whenever its <button> is clicked. After the update, the Square’s 
        this.state.value will be 'X', so we’ll see the X on the game board. If you click on any 
        Square, an X should show up.

        */  
        <button className="square" 
                onClick={() => this.setState({value: 'X'})}>
          {this.state.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      /*
       You’ve just “passed a prop” from a parent Board component to a child Square component.
       Passing props is how information flows in React apps, from parents to children.
      */
      return <Square value={i}/>;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  