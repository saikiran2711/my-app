import React, { Component } from 'react';
import Menu from './MenuComponent';
// import {DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import Contact from "./ContactComponent";
// import { COMMENTS } from '../shared/comments';
// import { PROMOTIONS } from '../shared/promotions';
// import { LEADERS } from '../shared/leaders';
import About from './AboutComponent';
import {connect} from 'react-redux';
import { addComment } from '../redux/ActionCreators';
import {  fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});


class Main extends Component{
    
  componentDidMount() {
    this.props.fetchDishes();
  }
    // onDishSelect(dish) {
    //     this.setState({ selectedDish: dish });
    // }
  render() {

      const DishWithId=({match}) => {
        return(

          // <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          // comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
          // />
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment}
          />
        );
      }

      const HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
      }

    const AboutUs = () => {
      return(
        <About leaders={this.props.leaders}/>
      );
    }

  return (
    <div>
    <Header />
    {/* <div className="container"> */}
    <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route path='/aboutus' component={AboutUs}/>
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Redirect to="/home" />
          </Switch>
    <Footer />
    </div>
  // </div>
  );
  }
}

// export default  withRouter(connect(mapStateToProps)(Main));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));