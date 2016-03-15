'use strict';
import React from 'react';

class If extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.condition === true){
            return this.props.children;
        }else{
            return null;
        }
    }
}
If.propTypes = {
    condition : React.PropTypes.bool.isRequired
};
export default If;