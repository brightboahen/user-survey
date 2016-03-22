import React from 'react';

class RadioComp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            male : false,
            female : false
        }
    }
    _radioButtonChange(label){
        switch (label){
            case 'Male':
                this.setState({male:true, female:false});
                this.props.callBackFunc && this.props.callBackFunc('Sex',label);
                break;
            case 'Female':
                this.setState({male:false, female:true});
                this.props.callBackFunc && this.props.callBackFunc('Sex',label);
                break;
            default:
                break;
        }
    }
    _renderRadioLabels(){
        return this.props.radioItemLabels.map((label, at)=>{
            return<div className="inlineRadio" key={at}>
                <input name={label} type="radio" checked={at === 0?this.state.male:this.state.female} onChange={this._radioButtonChange.bind(this,label)}/>
                <label htmlFor={label}>{label}</label>
            </div>
        });
    }
    render(){
        return <div className="questionBox">
            <div>
                {this.props.children}
            </div>
            {this._renderRadioLabels()}
        </div>
    }
}
RadioComp.propTypes = {
    radioItemLabels : React.PropTypes.array.isRequired,
    callBackFunc : React.PropTypes.func
};
export default RadioComp;