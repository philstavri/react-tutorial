import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';

it('renders board without crashing', () => {
    let div = document.createElement("div");
    let squares = new Array(9).fill(null);
    ReactDOM.render(<Board squares={squares}/>, div);
});