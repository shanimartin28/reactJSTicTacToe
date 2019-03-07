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

        Replace this.state.value with this.props.value in Square’s render method
        
        Replace this.setState() with this.props.onClick() in Square’s render method

        Delete the constructor from Square because Square no longer keeps track of the game’s state
        
        NOW:
        When a Square is clicked, the onClick function provided by the Board is called. 
        Here’s a review of how this is achieved:
        1. The onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
        2. When the button is clicked, React will call the onClick event handler that is defined in Square’s 
        render() method
        3. This event handler calls this.props.onClick(). The Square’s onClick prop was specified by the Board.
        4. Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls this.handleClick(i) when clicked.
        5. We have not defined the handleClick() method yet, so our code crashes. If you click a square now, you should see a red error 
        screen saying something like “this.handleClick is not a function”.
        */  
        <button className="square" 
                onClick={() => this.props.onClick()}>
          {this.props.value}
        </button>
      );
    }
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

  */

  class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
        };
    }
    
    /*
    When we try to click a Square, we should get an error because we haven’t defined handleClick yet. We’ll now 
    add handleClick to the Board class.

    Note how in handleClick, we call .slice() to create a copy of the squares array to modify instead of modifying 
    the existing array. We will explain why we create a copy of the squares array in the next section.

    -- Why Immutability Is Important
    In the previous code example, we suggested that you use the .slice() operator to create a copy of the squares 
    array to modify instead of modifying the existing array.

    We’ll now discuss immutability and why immutability is important to learn.

    There are generally two approaches to changing data. The first approach is to mutate the data by directly 
    changing the data’s values. The second approach is to replace the data with a new copy which has the desired changes.

    -- Data Change with Mutation
    var player = {score: 1, name: 'Jeff'};
    player.score = 2;
    // Now player is {score: 2, name: 'Jeff'}

    -- Data Change without Mutation
    var player = {score: 1, name: 'Jeff'};

    var newPlayer = Object.assign({}, player, {score: 2});
    // Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

    // Or if you are using object spread syntax proposal, you can write:
    // var newPlayer = {...player, score: 2};

    The end result is the same but by not mutating (or changing the underlying data) 
    directly, we gain several benefits described below.

    Immutability makes complex features much easier to implement. Later in this tutorial, we will implement a “time travel” 
    feature that allows us to review the tic-tac-toe game’s history and 
    “jump back” to previous moves. This functionality isn’t specific to games — an ability to undo 
    and redo certain actions is a common requirement in applications. Avoiding direct data 
    mutation lets us keep previous versions of the game’s history intact, and reuse them later.

    Detecting changes in mutable objects is difficult because they are modified directly. This 
    detection requires the mutable object to be compared to previous copies of itself and the 
    entire object tree to be traversed.

    Detecting changes in immutable objects is considerably easier. If the immutable object that is 
    being referenced is different than the previous one, then the object has changed.

    

    */

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
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
  