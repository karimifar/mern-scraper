import React, { Component } from 'react';
import './App.css';
import Home from "./components/Home"
import Header from "./components/header"
import ArticleCard from "./components/articleCard"
import SavedArticles from "./components/savedArticles"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <div>
      
      <Header />
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/articles" component={ArticleCard} />
        <Route exact path="/saved-articles" component={SavedArticles} />
       

      </Switch>
    </div>
  </Router>
);


export default App;
