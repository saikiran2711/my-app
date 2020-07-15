import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,  CardTitle } from 'reactstrap';


class Menu extends Component {


  // onDishSelect(dish) {
  //     this.setState({ selectedDish: dish });
  // }

  // renderDish(dish) {
  //     if (dish != null)
  //         return(
  //             <Card>
  //                 <CardImg top src={dish.image} alt={dish.name} />
  //                 <CardBody>
  //                   <CardTitle>{dish.name}</CardTitle>
  //                   <CardText>{dish.description}</CardText>
  //                 </CardBody>
  //             </Card>
  //         );
  //     else
  //         return(
  //             <div></div>
  //         );
  // }

  render() {
      const menu = this.props.dishes.map((dish) => {
          return (
            <div  className="col-12 col-md-5 m-1">
              <Card key={dish.id}
                onClick={() => this.props.onClick(dish.id)}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
              </Card>
            </div>
          );
      });

      return (
                <div>
              <div className="row">
                  {menu}
              </div>
               {/* <div className="row">
                <div  className="col-12 col-md-5 m-1">
                  {this.renderDish(this.state.selectedDish)}
                </div>

              </div>  */}

              {/* <DishDetail selected={this.state.selectedDish} /> */}
              
          </div>
      );
  }
}

export default Menu;