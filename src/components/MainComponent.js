import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Directory from './DirectoryComponents';
import CampsiteInfo from './CampsiteInfoComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';

const mapStateToProps = state => {
  return{
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions
  }
}

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      campsites: CAMPSITES,
      comments: COMMENTS,
      partners: PARTNERS,
      promotions: PROMOTIONS
    }
  };

  

  render() {
    const HomePage = () =>{
        return(
          <Home
            campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
            promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
            partner={this.state.partners.filter(partner => partner.featured)[0]}
          />
        )          
    }

    const CampsiteWithId = ({match}) => {
      return (
        <CampsiteInfo 
          campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
          comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
          // the "+" converts a string to a number
        />
      )
    }
    
    return (
      <div>
          <Header/>
          <Switch>
              <Route 
                path='/home' 
                component={HomePage} /> 
              <Route exact 
                path='/aboutus' 
                render={() => <About partners={this.props.partners}/>} />
                {/* use the render method if you need to pass in props to the component */}
              <Route 
                path ='/contactus' 
                component={Contact} />
              <Route exact 
                path='/directory' 
                render={() =><Directory campsites={this.props.campsites}/>} />
                {/* use the render method if you need to pass in props to the component */}
              <Route 
                path='/directory/:campsiteId' 
                component ={CampsiteWithId} />
                {/* the colon grabs the data after / in the url, stores as parameter "campsiteId" and
                attaches it to route.state.match.params object, which is automatically avail to the component*/}
              <Redirect to='/home' />
          </Switch>
          <Footer/>
      </div>
    );
  }
};

export default withRouter(connect(mapStateToProps)(Main));
