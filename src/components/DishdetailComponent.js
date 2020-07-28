import React, { Component } from 'react';
import { Card, CardImg,  CardText, CardTitle, CardBody, ListGroup,Breadcrumb,BreadcrumbItem,Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Modal, ModalHeader,ModalBody,Label,Row,Col} from 'reactstrap';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component{
    constructor(props) {
        super(props);
        
        this.toggleComment=this.toggleComment.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = {
          isCommentOpen:false
        };
      }

      toggleComment() {
        this.setState({
          isCommentOpen: !this.state.isCommentOpen
        });
      }

      handleSubmit(values) {
          this.toggleComment();
        // console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // values.preventDefault();
        this.props.addComment(this.props.dishId, values.Rating, values.name, values.comment);
    }

    render()
    {
        return(
            <div>
            <Modal isOpen={this.state.isCommentOpen} toggle={this.toggleComment}>
            <ModalHeader className="hcolor" toggle={this.toggleComment}>Submit Comment</ModalHeader>
            <ModalBody className="bcolor">
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                     <Row className="form-group">
                            <Label  htmlFor="Rating" md={12}>Rating</Label>
                                <Col md={{size: 12}}>
                                    <Control.select model=".Rating" id="Rating" name="contactType"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="Your Name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required,minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".Your Name"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                    <Button type="submit" value="submit" color="primary">Submit</Button>
                </LocalForm>
            </ModalBody>
        </Modal>
            
            <Button outline className="btn btn-md " onClick={this.toggleComment}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            </div>

        );
    }
}


 class DishDetail extends Component{
//      constructor(props){
//          super(props);
    
//     this.toggleComment=this.toggleComment.bind(this);
//     this.handleSubmit=this.handleSubmit.bind(this);
    
//     this.state = {
//       isCommentOpen:false
//     };
//   }

//   toggleComment() {
//     this.setState({
//       isCommentOpen: !this.state.isCommentOpen
//     });
//   }

//   handleSubmit(values) {
//       this.toggleComment();
//     console.log('Current State is: ' + JSON.stringify(values));
//     alert('Current State is: ' + JSON.stringify(values));
//     // event.preventDefault();
// }

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

  renderComments(comment,dish,addComment) {
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
              <CommentForm dishId={dish} addComment={addComment} />
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
                //  const addComment=this.props.addComment;
                return (
                    <div className="container">
          
    
                    {/* <div className="container"> */}
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
                            {this.renderComments(comment,this.props.dish.id,this.props.addComment)}
                        </div>
                        {/* <Modal isOpen={this.state.isCommentOpen} toggle={this.toggleComment}>
            <ModalHeader  toggle={this.toggleComment}>Submit Comment</ModalHeader>
            <ModalBody >
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                     <Row className="form-group">
                            <Label  md={12}>Rating</Label>
                                <Col md={{size: 12}}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="Your Name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".Your Name" id="Your Name" name="Your Name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required,minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".Your Name"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                    <Button type="submit" value="submit" color="primary">Submit</Button>
                </LocalForm>
            </ModalBody>
        </Modal> */}
                     </div>
                );

            }

 }

 export default DishDetail;