import React from 'react';

class DropdownComp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            itemsComplete : false
        }
    }

    _multiItemSelected(){
        this.props.callBackFunc && this.props.callBackFunc(this.props.compIdentifier, this.refs.multiSelect.value);
    }

    renderSelectItems(){
        if (this.props.selectItems !== undefined){
            return this.props.selectItems.map((item,index) =>{
                return<option ref={item} key={index} value={item} >{item}</option>;
            });
        }
    }

    render(){
        return <div className="questionBox">
            <div>{this.props.children}</div>
            <select ref="multiSelect" onChange={this._multiItemSelected.bind(this)}>
                {this.renderSelectItems()}
            </select>
        </div>
    }
}
DropdownComp.propTypes = {
    selectItems : React.PropTypes.array.isRequired,
    compIdentifier : React.PropTypes.string,
    isMultiple  : React.PropTypes.bool,
    callBackFunc : React.PropTypes.func
};
export default DropdownComp;