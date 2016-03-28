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
            isYes : false,
            isNo : false
        }
    }
    checkTheNextQuestion(arg){
        switch (arg){
            case 'Yes':
                this.setState({isYes:true, isNo:false});
                break;
            case 'No':
                this.setState({isYes:false, isNo:true});
                break;
            default:
                break;
        }
        this.props.callBackFunc && this.props.callBackFunc('Tools',arg);

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
                            showInputOnStart={true}>
                            Do you find it user friendly?
                        </ComboComp>
                    </div>
                    <div className="large-12 columns">
                        <ComboComp compIdentifier="LeastFavourite" callBackFunky={this.props.callBackFunc} showInputOnStart={true}>
                            Please mention some of the features you don't like about the above tool(s)
                        </ComboComp>
                    </div>
                </div>
            </If>
            <If condition={this.state.isNo}>
                <div>
                    <div className="large-12 columns">
                        <ComboComp compIdentifier="NoTools"
                                   labelsForRadio={['Yes','No']}
                                   callBackFunky={this.props.callBackFunc}
                                   showInputOnStart={true}>
                            Have you used other classroom or school management tools or applications?
                        </ComboComp>
                    </div>
                    <div className="large-12 columns">
                        <ComboComp compIdentifier="DreamTools"
                                   callBackFunky={this.props.callBackFunc}
                                   showInputOnStart={true}>
                            If there were to be a software available to improve your work flow and or productivity what features would you want it to have?
                        </ComboComp>
                    </div>
                </div>
            </If>
        </div>
    }
}

QuestionComponent.propTypes = {
    callBackFunc : React.PropTypes.func
};

export default QuestionComponent;