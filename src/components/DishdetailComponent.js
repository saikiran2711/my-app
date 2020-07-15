import React, { Component } from 'react';
import { Card, CardImg,  CardText, CardTitle, CardBody, ListGroup,} from 'reactstrap';

 class DishDetail extends Component{
     constructor(props)
     {
        super(props);

        this.state={

        }

     }

  renderDish(dish) {
      if(dish != null){
          return(
              <Card>
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
          );}
          else{
              return (
                  <div></div>
              )
          }
    
  }

  renderComments(comment) {
      if(comment != null){
        
            const com=comment.comments.map((arr) => {

            return (
                
                <div>
                    
                <ListGroup
                 key={arr.id}>
                <li className="list-unstyled">
                <p>{arr.comment}</p>
                <p>-- {arr.author}, {arr.datenyear}</p>
                </li>
                </ListGroup>
                </div>
            )
      });
      return (
          <div>
              <h4>
                  Comments
              </h4>
              {com}
          </div>
          
      );
    }
      else {
          return(

            <div>

            </div>
          )
      }
  }

            render(){

                const dish=this.props.selected;
                return (
                    <div className="row">
                        <div className="col col-md-5 m-1">
                        
                            {this.renderDish(dish)}
                        </div>
                        <div className="col col-md-5 m-1">
                            {/* <h4>Comments</h4> */}
                            {this.renderComments(dish)}
                        </div>
                    </div>
                )

            }

 }

 export default DishDetail;