import React, { Component } from 'react';
import { Card, CardImg,  CardText, CardTitle, CardBody, ListGroup,Breadcrumb,BreadcrumbItem,Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Modal, ModalHeader,ModalBody,Label,Row,Col} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


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
        this.props.postComment(this.props.dishId, values.Rating, values.name, values.comment);
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

  renderDish(dish) {
      if(dish !==null){
          return(

              
                  <div className="col col-md-5 m-1">
                    <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
              <Card>
                  <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
              </FadeTransform>
              </div>
              
          );}
          else{
              return (
                  <div>

                  </div>
              );
          }
    
  }

  renderComments(comment,dish,postComment) {
      if(comment !==null){
          
        const com=comment.map((arr) => {
             return (
                 
                <Fade in>
                <ListGroup key={arr.id}>
                     
                <li  className="list-unstyled">
                <p>{arr.comment}</p>
                <p>-- {arr.author}, {arr.date}</p>
                </li>
                
                </ListGroup>
                </Fade>
                
                
            );
      });
      return (
          
              <div className="col-12 col-md-5 m-1">
              <h4>
                  Comments
              </h4>
              <Stagger in>
              {com}
              </Stagger>
              <CommentForm dishId={dish} postComment={postComment} />
          </div> 
          
      );
      
    }
      else {
          return(
            <div >
            </div>
          );
      }
  }

            render(){

                if (this.props.isLoading) {
                    return(
                        <div className="container">
                            <div className="row">            
                                <Loading />
                            </div>
                        </div>
                    );
                }
                else if (this.props.errMess) {
                    return(
                        <div className="container">
                            <div className="row">            
                                <h4>{this.props.errMess}</h4>
                            </div>
                        </div>
                    );
                }

                else if(this.props.dish !==null) {
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
                            {this.renderComments(comment,this.props.dish.id,this.props.postComment)}
                        </div>
                      
                     </div>
                ); }

            }

 }

 export default DishDetail;