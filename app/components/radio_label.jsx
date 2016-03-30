import React from 'react'

export default class RadioLabel extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            firstRadio : false,
            lastRadio : false
        }
    }
    _radioClicked(label,name){
        const   self    =   this,
                radioEL =   self.refs[label];
        switch (label){
            case 'firstRadio':
                self.setState({firstRadio:true,lastRadio:false});
                break;
            case 'lastRadio':
                self.setState({firstRadio:false,lastRadio:true});
                break;
            default:
                break;
        }
        self.props.callBackFunc && self.props.callBackFunc(name);
        console.log(this.state);
    }
    render(){
        const   self    =   this,
            firstLabel  =   self.props.labelsForRadio[0],
            secondLabel =   self.props.labelsForRadio[1];
        return<div className="questionBox">
            {this.props.children}
            <div>
                <input name={firstLabel}
                       onChange={this._radioClicked.bind(this,'firstRadio',firstLabel)}
                       checked={self.state.firstRadio}
                       ref="firstRadio"
                       type="radio"/>
                <label htmlFor={firstLabel}>{firstLabel}</label>
                <input name={secondLabel}
                       onChange={this._radioClicked.bind(this,'lastRadio',secondLabel)}
                       checked={self.state.lastRadio}
                       ref="lastRadio"
                       type="radio"/>
                <label htmlFor={secondLabel}>{secondLabel}</label>
            </div>
        </div>
    }
}
RadioLabel.propTypes = {
    labelsForRadio : React.PropTypes.array.isRequired,
    callBackFunc : React.PropTypes.func
};