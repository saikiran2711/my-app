import React, { Component } from 'react';
import Menu from './MenuComponent';
import {DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from "./ContactComponent";
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import About from './AboutComponent';

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

      const DishWithId=({match}) => {
        return(

          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
          />
        );
      }

    const HomePage = () => {
      return(
          <Home  dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const AboutUs = () => {
      return(
        <About leaders={this.state.leaders}/>
      );
    }

  return (
    <div>
    <Header />
    {/* <div className="container"> */}
    <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route path='/aboutus' component={AboutUs}/>
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
