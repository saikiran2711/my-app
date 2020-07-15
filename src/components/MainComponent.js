import React, { Component } from 'react';
import Menu from './MenuComponent';
import  { Navbar, NavbarBrand } from 'reactstrap';
import {DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';

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
  return (
    <div>
    <Navbar dark color="primary">
      <div className="container">
        <NavbarBrand href="#">Ristorante Con Fusion</NavbarBrand>
      </div>
    </Navbar>
    <div className="container">
    <Menu dishes={this.state.dishes}
            onClick={(dishId) => this.onDishSelect(dishId)} />
    <DishDetail selected={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
    </div>
  </div>
  );
  }
}

export default Main;
