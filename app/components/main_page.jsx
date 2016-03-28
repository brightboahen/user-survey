import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import QuestionsPage from './questions_page'
import Dashboard from './dashboard'
import Records from './records'
import MainComp from './main_component'

class MainPage extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        //console.log(browserHistory);
    }
    render(){
        return <Router history={browserHistory}>
                <Route path="/" component={QuestionsPage}/>
                <Route path="/dashboard" component={Dashboard}>
                    <Route path="/records" component={Records}/>
                </Route>
            <Route path="/main" component={MainComp}/>
            </Router>
    }
}

export default MainPage;
