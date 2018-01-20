import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions'


import Header from './header'
import Landing from './landing'
import Survays from './survays'
import Dashboard from './dashboard'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return(
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/survays" component={Dashboard} />
            <Route exact path="/survays/new" component={Survays} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App);

// import React, { Component } from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';
// import { connect } from 'react-redux';
// import * as actions from '../actions';

// import Header from './header';
// const Dashboard = () => <h2>Dashboard</h2>;
// const SurveyNew = () => <h2>SurveyNew</h2>;
// const Landing = () => <h2>Landing</h2>;

// class App extends Component {
//   componentDidMount() {
//     this.props.fetchUser();
//   }

//   render() {
//     return (
//       <div className="container">
//         <BrowserRouter>
//           <div>
//             <Header />
//             <Route exact path="/" component={Landing} />
//             <Route exact path="/surveys" component={Dashboard} />
//             <Route path="/surveys/new" component={SurveyNew} />
//           </div>
//         </BrowserRouter>
//       </div>
//     );
//   }
// }

// export default connect(null, actions)(App);
