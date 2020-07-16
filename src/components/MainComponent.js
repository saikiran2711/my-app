import React, { Component } from 'react';
import Menu from './MenuComponent';
import {DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component{
    constructor(props)
    {
      super(props);

      this.state={
        dishes:DISHES,
        selectedDish:null
      };
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish });
    }
  render() {

    const HomePage = () => {
      return(
          <Home 
          />
      );
    }

  return (
    <div>
    <Header />
    {/* <div className="container"> */}
    <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Redirect to="/home" />
          </Switch>
    <Footer />
    </div>
  // </div>
  );
  }
}

export default Main;
