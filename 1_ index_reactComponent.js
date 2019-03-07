import React from 'react';
import ReactDOM from 'react-dom';

/*
React is a declarative, efficient, and flexible JavaScript library for building user interfaces. 
It lets you compose complex UIs from small and isolated pieces of code called “components”.

We use components to tell React what we want to see on the screen. When our data changes, 
React will efficiently update and re-render our components.

A component takes in parameters, called props (short for “properties”).

The render method returns a description of what you want to see on the screen.

In particular, render returns a React element, which is a lightweight description 
of what to render.

*/

class ShoppingList extends React.Component {
    render() {
      return (
        <div className="shopping-list">
          <h1>Shopping List for {this.props.name}</h1>
          <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Oculus</li>
          </ul>
        </div>
      );
    }
  }