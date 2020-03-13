import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Box from './pages/Box';
// exact significa que ele vai começar exatamente com / e nao com /jsdhh ou qq outra coisa. 
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/box/:id" component={Box} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
