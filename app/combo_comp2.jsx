import React from 'react';
import If from './if';
class ComboComp extends React.Component{
    constructor(props){
        super(props);
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
            case 'None':
                this.setState({leftState:true, rightState:false, showInput:false});
                this.props.callBackFunc && this.props.callBackFunc(label);
                break;
            case 'Other':
                this.setState({rightState:true, leftState:false, showInput:true});
                this.props.callBackFunc && this.props.callBackFunc(label);
                break;
            default:
                break;
        }
    }
    _renderRadioButtons(){
        if(this.props.labelsForRadio){
            return this.props.labelsForRadio.map((label, at)=>{
                return <div key={at} className="inlineRadio">
                    <input name={label} type="radio" checked={at === 0?this.state.leftState:this.state.rightState} onChange={this._radioButtonChange.bind(this,label)} />
                    <label htmlFor={label}>{label}</label>
                </div>
            });
        }
    }
    _onTextAreaChange(){
        this.props.callBackFunky && this.props.callBackFunky(this.props.compIdentifier, this.refs.textInputArea.value);
    }
    render(){
        return <div className="questionBox">
            <p>{this.props.children}</p>
            {this._renderRadioButtons()}
            <If condition={this.state.showInput}>
                <div>
                    <textarea onChange={this._onTextAreaChange.bind(this)} ref="textInputArea" className="combobox_input"/>
                </div>
            </If>
        </div>
    }
}
ComboComp.propTypes = {
    labelsForRadio : React.PropTypes.array,
    compIdentifier : React.PropTypes.string,
    callBackFunky : React.PropTypes.func,
    callBackFunc : React.PropTypes.func,
    showInputOnStart : React.PropTypes.bool
};
export default ComboComp;