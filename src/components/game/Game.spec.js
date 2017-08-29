import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';

it('renders game without crashing', () => {
    let div = document.createElement("div");
    ReactDOM.render(<Game/>, div);
});