import React from 'react';
import { Card, CardImg, CardImgOverlay,  CardTitle } from 'reactstrap';





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
  function RenderMenuItem({dish}) {
    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

  const Menu=(props) => {

    const menu =props.dishes.map((dish) => {
      return (
        <div  className="col-12 col-md-5 m-1">
          {/* <Card key={dish.id}
            onClick={() => this.props.onClick(dish.id)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card> */}
          <RenderMenuItem dish={dish} onClick={props.onClick} />
        </div>
      );
  });

  return (
            <div className="container">
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
      // const menu = this.props.dishes.map((dish) => {
      //     return (
      //       <div  className="col-12 col-md-5 m-1">
      //         <Card key={dish.id}
      //           onClick={() => this.props.onClick(dish.id)}>
      //           <CardImg width="100%" src={dish.image} alt={dish.name} />
      //           <CardImgOverlay>
      //               <CardTitle>{dish.name}</CardTitle>
      //           </CardImgOverlay>
      //         </Card>
      //       </div>
      //     );
      // });

      // return (
      //           <div className="container">
      //         <div className="row">
      //             {menu}
      //         </div>
      //          {/* <div className="row">
      //           <div  className="col-12 col-md-5 m-1">
      //             {this.renderDish(this.state.selectedDish)}
      //           </div>

      //         </div>  */}

      //         {/* <DishDetail selected={this.state.selectedDish} /> */}
              
      //     </div>
      // );


export default Menu;