import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import { CreateTodo } from "./components/CreateTodo";
import { EditTodo } from "./components/EditTodo";
import { TodoList } from "./components/TodoList";
function App() {
  return (
    <div>
      <nav className="navbar bg-light navbar-expand-lg navbar-light">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Todos
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">
              Create Todo
            </Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={TodoList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
      </Switch>
    </div>
  );
}

export default App;
