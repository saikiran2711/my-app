import React, { Component } from 'react';
import { Card, CardImg,  CardText, CardTitle, CardBody, ListGroup,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

 class DishDetail extends Component{
     

  renderDish(dish) {
      if(dish != null){
          return(
              
                  <div className="col col-md-5 m-1">
              <Card>
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
              </div>
              
          );}
          else{
              return (
                  <div></div>
              )
          }
    
  }

  renderComments(comment) {
      if(comment != null){
        const com=comment.map((arr) => {
             return (

                <ListGroup
                 key={arr.id}>
                <li className="list-unstyled">
                <p>{arr.comment}</p>
                <p>-- {arr.author}, {arr.date}</p>
                </li>
                </ListGroup>
            )
      });
      return (
          
              <div className="col-12 col-md-5 m-1">
              <h4>
                  Comments
              </h4>
              {com}
          </div> 
          
      );
    }
      else {
          return(
            <div >
            </div>
          )
      }
  }

            render(){
                const dish=this.props.dish;
                const comment=this.props.comments;
                return (
                    <div className="container">
                         <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                        <div className="row">
                         {this.renderDish(dish)}
                            {this.renderComments(comment)}
                        </div>
                     </div>
                )

            }

 }

 export default DishDetail;