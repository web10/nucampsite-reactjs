import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Directory from './DirectoryComponents';
import { CAMPSITES } from "../shared/campsites";
import { PARTNERS } from "../shared/partners";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import CampsiteInfo from './CampsiteInfoComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      partners: PARTNERS,
      comments: COMMENTS,
      promotions: PROMOTIONS
        }
    }

    
  render() {

    const HomePage = () =>{
        return(<Home/>)
                
    }

      return (
          <div>
              <Header/>
              <Switch>
                  <Route path='/home' component={HomePage} /> 
                  
            
                  <Route exact path='/aboutus' render={() => <About partners={this.state.partners}/>}/>
                  <Route path ='/contactus' component={Contact} />
                  <Route exact path='/directory' render={() =><Directory  campsites={this.state.campsites}/>} />
                  <Redirect to='/home' />
              </Switch>
              <Footer/>
          </div>
      );
  }
}

export default Main;
