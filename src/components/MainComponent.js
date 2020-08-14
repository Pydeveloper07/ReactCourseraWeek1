import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import ContactUs from './ContactUsComponent';
import AboutUs from './AboutUsComponent';
import {Switch, Route, Redirect} from 'react-router-dom';
import DISHES from '../shared/dishes';
import COMMENTS from '../shared/comments';
import LEADERS from '../shared/leaders';
import PROMOTIONS from '../shared/promotions';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render(){
    const HomePage = () => {
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
            promotion={this.state.promotions.filter((prom) => prom.featured)[0]}
            leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }
    const DishWithId = ({match}) => {
      return (
        <DishDetail dish={this.state.dishes.filter((dish) => parseInt(match.params.dishId) === dish.id)[0]} 
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId))} />
      );
    }
    return (
    <div>
      <Header />
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} /> 
        <Route path='/menu/:dishId' component={DishWithId} />
        <Route exact path='/contactUs' component={ContactUs} />
        <Route path='/aboutUs' component={() => <AboutUs leaders={this.state.leaders} />} />
        <Redirect to='/home' />
      </Switch>
      <Footer /> 
    </div>
  );
  }
}

export default Main;
