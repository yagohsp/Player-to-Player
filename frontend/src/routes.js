import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Players from './pages/players';
import Register from './pages/register';

export default function routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Players} />
                <Route path="/cadastrar" exact component={Register} />
            </Switch>
        </BrowserRouter>
    )
}