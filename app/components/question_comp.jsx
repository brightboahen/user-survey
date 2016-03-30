/**
 * Created by brightboahen on 10/03/2016.
 */

import React from 'react';
import ComboComp from './combo_comp2';
import If from './if';

class QuestionComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isYes       :   false,
            isNo        :   false,
            isFriendly  :   false,
            notFriendly :   false,
            isTools     :   false,
            noTools     :   false
        }
    }
    checkTheNextQuestion(arg){
        switch (arg){
            case 'Yes':
                console.log('is yes');
                this.setState({isYes:true, isNo:false});
                break;
            case 'No':
                this.setState({isYes:false, isNo:true});
                break;
            default:
                break;
        }
        //this.props.callBackFunc && this.props.callBackFunc('Tools',arg);
        console.log(arg);
        console.log(this.state);
    }
    _checkUserFriendly(arg){
        switch (arg){
            case 'Yes':
                this.setState({isFriendly : true, notFriendly : false});
                break;
            case 'No':
                this.setState({isFriendly : false, notFriendly : true});
                break;
            default:
                break;
        }
    }
    _otherToolsUsed(arg){
        switch (arg){
            case 'Yes':
                this.setState({isTools : true, noTools : false});
                break;
            case 'No':
                this.setState({noTools : true, isTools : false});
                break;
            default:
                break;
        }
    }
    render(){
        return <div>
            <div className="large-12 columns">
                <ComboComp
                    compIdentifier="currentTools"
                    labelsForRadio={['Yes','No']}
                    callBackFunc={this.checkTheNextQuestion.bind(this)}
                    callBackFunky={this.props.callBackFunc}>
                    Do you use Capita SIMS school management application at your school?
                </ComboComp>
            </div>
            <If condition={this.state.isYes}>
                <div>
                    <div className="large-12 columns">
                        <ComboComp
                            compIdentifier="FavouriteFeatures"
                            callBackFunky={this.props.callBackFunc}
                            labelsForRadio={['Yes','No']}
                            callBackFunc={this._checkUserFriendly.bind(this)}>
                            Do you find it user friendly?
                        </ComboComp>
                    </div>
                </div>
            </If>
            <If condition={this.state.isFriendly}>
                <div className="large-12 columns">
                    <ComboComp compIdentifier="LeastFavourite" callBackFunky={this.props.callBackFunc}
                               showInputOnStart={true}>
                        Please mention some of the features you don't like about the above tool(s)
                    </ComboComp>
                </div>
            </If>
            <If condition={this.state.isNo}>
                <div>
                    <div className="large-12 columns">
                        <ComboComp compIdentifier="NoTools"
                                   labelsForRadio={['Yes','No']}
                                   callBackFunc={this._otherToolsUsed.bind(this)}
                                   callBackFunky={this.props.callBackFunc}>
                            Have you used other classroom or school management tools or applications?
                        </ComboComp>
                    </div>
                </div>
            </If>
            <If condition={this.state.isTools && this.state.isNo}>
                <div className="large-12 columns">
                    <ComboComp compIdentifier="DreamTools"
                               callBackFunky={this.props.callBackFunc}
                               showInputOnStart={true}>
                        Please provide the name of the classroom management application(s)
                    </ComboComp>
                </div>
            </If>
        </div>
    }
}

QuestionComponent.propTypes = {
    callBackFunc : React.PropTypes.func
};

export default QuestionComponent;