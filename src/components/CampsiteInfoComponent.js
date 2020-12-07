import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, 
    Breadcrumb, BreadcrumbItem, 
    Button, Form,
    Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control } from 'react-redux-form';

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            rating: '',
            author: '',
            text: '',
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.formSubmit = this.formSubmit.bind(this);

    }

    toggleModal(){
        console.log('modal is supposed to open');
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    formSubmit(){
        console.log(`FORM SUBMITTED: 
            Rating=${this.state.rating}, 
            Author=${this.state.author},
            Comments=${this.state.text}`);
        alert(`${this.state.rating}`) 
            
        }
            

    render() {
        return(
            <>
            <Button className="fa-lg" outline onClick={this.toggleModal}>Add Comments</Button>
            <Modal isOpen={this.state.isModalOpen}>
                <ModalHeader toggle={this.toggleModal}>Comment Form</ModalHeader>    
                <ModalBody> 
                     <LocalForm>
                        <div className="form-group">
                            <Control.select 
                                id="rating" 
                                name="rating"
                                model=".rating"
                                placeholder="Rating"
                                className="form-control"
                            >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                            </Control.select>

                        </div>
                        
                        <div className="form-group">
                            <Control.text 
                                id="author" 
                                name="author"
                                model=".author"
                                placeholder="Author"
                                className="form-control"
                            />
                        </div>
                    
                        <div className="form-group">
                            <Control.textarea 
                                id="comments" 
                                name="comments" 
                                rows={6}
                                model=".text"
                                placeholder="Comments"
                                className="form-control"
                            /> 
                        </div>    
                        <button 
                            className="form-control btn-lg"
                            onClick={this.formSubmit}
                        >
                            Submit Comments
                        </button>
                    </LocalForm> 
                    </ModalBody>  
                </Modal>
            </>
        )
    }
}
function RenderComments({comments}) {
    if(comments){
        return (
            <div className="col-md-5 m-1" >
                <h4>Comments</h4>
                {comments.map( comment => { 
                    return (
        
                        <div key="{comment.id}">
                            <p>{comment.text}</p>
                            <p>{comment.author} {" "}
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>   
                            ) 
                    })
                }
                <CommentForm/>
            </div>
        )
    } else {
        return(<div></div>)       
    }
}

function RenderCampsite({campsite}) {
    return(
                <div className="col-md-5 m-1">
                    <Card key="{campsite.id">
                        <CardImg top src={campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardTitle> {campsite.name} </CardTitle>
                            <CardText> {campsite.description} </CardText>
                        </CardBody>
                    </Card>
                </div>

            )
}
    
function CampsiteInfo(props) {
    if(props.campsite){
        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem ><Link to="/diretory">Directory </Link></BreadcrumbItem>
                    <BreadcrumbItem active> {props.campsite.name}</BreadcrumbItem>
                </Breadcrumb>
                <h2>{props.campsite.name}</h2>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
               
            </div>
        )
    } else {
        return (<div></div>)
    }
}    
    
export default CampsiteInfo;
