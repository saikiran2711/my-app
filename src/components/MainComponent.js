import React, { Component } from 'react';
import Menu from './MenuComponent';
import {DISHES } from '../shared/dishes';
// import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from "./ContactComponent";
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

class Main extends Component{
    constructor(props)
    {
      super(props);

      this.state={
        dishes:DISHES,
        // selectedDish:null
        comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
      };
    }

    // onDishSelect(dish) {
    //     this.setState({ selectedDish: dish });
    // }
  render() {

    const HomePage = () => {
      return(
          <Home  dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
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
              <Route exact path='/contactus' component={Contact} />
              <Redirect to="/home" />
          </Switch>
    <Footer />
    </div>
  // </div>
  );
  }
}

export default Main;
