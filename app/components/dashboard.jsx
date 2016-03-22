import React from 'react'
import Firebase from 'firebase'
import { Link, browserHistory } from 'react-router'
import If from './if'

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            auth : null
        }
    }
    componentWillMount(){
        const self = this;
        self.firebaseRef = new Firebase('https://sizzling-fire-1284.firebaseio.com/');
        self.setState({auth:self.firebaseRef.getAuth()});
        let uid = window.sessionStorage.getItem('user');
    }
    loginButtonClicked(){
        const self = this;
        if(self.refs.em.value !== ''&& self.refs.pw.value !== ''){
            self.firebaseRef.authWithPassword({
                email:self.refs.em.value,
                password:self.refs.pw.value
            },(error, authData)=>{
                if(error){
                    console.error("Login failed ",error);
                }else{
                    console.log("Authenticated successfully with payload ",authData);
                    const path = '/records';
                    browserHistory.push(path);
                    self.setState({uidSet:authData});
                }
            });
        }else{
            alert('Please provide a valid login details');
        }
    }
    render(){
        return <div className="row">
            <div className="small-12 large-12 columns">
                <If condition={this.state.auth === null}>
                    <form>
                        <fieldset>
                            <legend>Login</legend>
                            <div className="row">
                                <div className="small-12 large-12 columns">
                                    <input ref="em" type="email" placeholder="Enter email"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 large-12 columns">
                                    <input ref="pw" type="password" placeholder="Enter Password"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 large-12 columns">
                                    <input className="large button" type="button"  value="Login" onClick={this.loginButtonClicked.bind(this)}/>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </If>
            </div>
            <If condition={this.state.auth !== null && this.state.auth.uid !== null}>
                <div className="small-12 large-12 columns">
                    {this.props.children}
                </div>
            </If>
        </div>
    }
}
export default Dashboard;