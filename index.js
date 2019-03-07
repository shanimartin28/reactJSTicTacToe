import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function  Square (props) {

    /*
    We’ll now change the Square to be a function component.
    In React, function components are a simpler way to write components that only contain a 
    render method and don’t have their own state. Instead of defining a class which extends 
    React.Component, we can write a function that takes props as input and returns what should 
    be rendered.

    */
      return (        
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
      );
  }
  
    /*
    To collect data from multiple children, or to have two child components communicate with each other, 
    you need to declare the shared state in their parent component instead. The parent component can pass 
    the state back down to the children by using props; this keeps the child components in sync with 
    each other and with the parent component.

    Add a constructor to the Board and set the Board’s initial state to contain an array of 9 nulls 
    corresponding to the 9 squares:
    When we fill the board in later, the this.state.squares array will look something like this:
     
    [
    'O', null, 'X',
    'X', 'X', 'O',
    'O', null, null,
    ]

    Taking Turns
    We now need to fix an obvious defect in our tic-tac-toe game: the “O”s cannot be marked on the board.
    We’ll set the first move to be “X” by default. We can set this default by modifying the initial state in our 
    Board constructor.
    */

  class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
          xIsNext: true,
        };
    }
    
    /*
      Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and 
      the game’s state will be saved. We’ll update the Board’s handleClick function to flip the value of 
      xIsNext:
      
      Also
      We can now change the Board’s handleClick function to return early by ignoring a click if 
      someone has won the game or if a Square is already filled:
    */

    handleClick(i) {
        const squares = this.state.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        //squares[i] = 'X';
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
      /*
       You’ve just “passed a prop” from a parent Board component to a child Square component.
       Passing props is how information flows in React apps, from parents to children.
       We will modify the Board to instruct each individual Square about its current value ('X', 'O', or null).
       We will modify the Board’s renderSquare method to read from it:       
       Now we’re passing down two props from Board to Square: value and onClick. 
       The onClick prop is a function that Square can call when clicked. 
      */
      return <Square 
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
                />;
    }
    
    /* Let’s also change the “status” text in Board’s render so that it displays which player has the next turn: */
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
        status = 'Winner: ' + winner;
        } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
  
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

  /* Declaring a Winner */
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  