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
            isNone : false,
            isOther : false
        }
    }
    checkTheNextQuestion(arg){
        switch (arg){
            case 'None':
                this.setState({isNone:true, isOther:false});
                break;
            case 'Other':
                this.setState({isOther:true, isNone:false});
                break;
            default:
                break;

        }
        this.props.callBackFunc && this.props.callBackFunc('Tools',arg);

    }
    render(){
        return <div>
            <div className="large-12 columns">
                <ComboComp compIdentifier="currentTools" labelsForRadio={['None','Other']} callBackFunc={this.checkTheNextQuestion.bind(this)} callBackFunky={this.props.callBackFunc}>
                    What type of tools, websites or applications do you use on a daily basis to aid your teaching? If you do please enter select 'Other' and write them below, if not select "None"
                </ComboComp>
            </div>
            <If condition={this.state.isOther}>
                <div>
                    <div className="large-12 columns">
                        <ComboComp compIdentifier="FavouriteFeatures" callBackFunky={this.props.callBackFunc} showInputOnStart={true}>
                            Please mention some of the features you like about the above tool(s)
                        </ComboComp>
                    </div>
                    <div className="large-12 columns">
                        <ComboComp compIdentifier="LeastFavourite" callBackFunky={this.props.callBackFunc} showInputOnStart={true}>
                            Please mention some of the features you don't like about the above tool(s)
                        </ComboComp>
                    </div>
                </div>
            </If>
            <If condition={this.state.isNone}>
                <div>
                    <div className="large-12 columns">
                        <ComboComp compIdentifier="NoTools" callBackFunky={this.props.callBackFunc} showInputOnStart={true}>
                            Why don't you use any tools?
                        </ComboComp>
                    </div>
                    <div className="large-12 columns">
                        <ComboComp compIdentifier="DreamTools" callBackFunky={this.props.callBackFunc} showInputOnStart={true}>
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