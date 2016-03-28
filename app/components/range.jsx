import React from 'react'

export default class Range extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            currentRange : 0
        }
    }
    componentWillMount(){
        const defaultRange = this.props.maxValue / 2;
        this.setState({currentRange:defaultRange});
    }
    _rangeInputChange(){
        const self = this;
        console.log(self.refs.rangeVal.value);
        self.setState({currentRange:self.refs.rangeVal.value});
    }
    render(){
        return <div className="questionBox">
            {this.props.children}
            <div>
                <input onChange={this._rangeInputChange.bind(this)}
                       ref="rangeVal"
                       type="range"
                       min={this.props.minValue}
                       max={this.props.maxValue}
                       step={this.props.rangeStep}/>
                <span style={{marginLeft: 20+'px'}}>
                    {this.state.currentRange+' '+(this.props.desText !== undefined ? this.props.desText:'')}
                </span>
            </div>
        </div>
    }
}

Range.propTypes = {
    minValue    :   React.PropTypes.number.isRequired,
    maxValue    :   React.PropTypes.number.isRequired,
    rangeStep   :   React.PropTypes.number.isRequired,
    desText     :   React.PropTypes.string
};