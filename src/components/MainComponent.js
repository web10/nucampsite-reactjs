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

const mapStateToProps = state => {
  return{
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions
  }
}

class Main extends Component {
  render() {
    const HomePage = () =>{
        return(<Home/>)          
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
              <Route 
                path ='/contactus' 
                component={Contact} />
              <Route exact 
                path='/directory' 
                render={() =><Directory  
                campsites={this.props.campsites}/>} />
              <Redirect to='/home' />
          </Switch>
          <Footer/>
      </div>
    );
  }
};

export default withRouter(connect(mapStateToProps)(Main));
