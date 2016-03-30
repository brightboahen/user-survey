import React from 'react';
import If from './if';
import RadioLabel from './radio_label'
class ComboComp extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            leftState : false,
            rightState : false,
            showInput : false
        };

    }
    componentWillMount(){
        if(this.props.showInputOnStart){
            this.setState({showInput:true});
        }
    }
    _radioButtonChange(label){
        switch (label){
            case 'Yes':
                this.setState({leftState:true, rightState:false});
                this.props.callBackFunc && this.props.callBackFunc(label);
                break;
            case 'No':
                this.setState({rightState:true, leftState:false});
                this.props.callBackFunc && this.props.callBackFunc(label);
                break;
            default:
                break;
        }
    }
    _renderRadioButtons(){
        const   self    =   this;
        console.log(self.props);
        return <RadioLabel {...self.props}
            callBack={this._radioButtonChange.bind(this)}/>
    }
    _onTextAreaChange(){
        this.props.callBackFunky && this.props.callBackFunky(this.props.compIdentifier, this.refs.textInputArea.value);
    }
    render(){
        return <div className="questionBox">
            <p>{this.props.children}</p>
            {<If condition={this.state.showInput}>
                <div>
                    <textarea onChange={this._onTextAreaChange.bind(this)} ref="textInputArea" className="combobox_input"/>
                </div>
            </If>}
        </div>
    }
}
ComboComp.propTypes = {
    compIdentifier : React.PropTypes.string,
    callBackFunky : React.PropTypes.func,
    callBackFunc : React.PropTypes.func,
    showInputOnStart : React.PropTypes.bool
};
export default ComboComp;