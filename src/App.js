import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Test from './components/Teste';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
      <Route path="/teste" component={ Test } />
    </Switch>
  );
}

export default App;
