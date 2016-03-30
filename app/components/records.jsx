import React from 'react'
import Firebase from 'firebase'

class Records extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            recordItems : {}
        }
    }
    componentWillMount(){
        let self = this;
        self.firebaseRef = new Firebase('https://sizzling-fire-1284.firebaseio.com/survey_data');
        self.firebaseRef.onAuth(this._authDataCallback.bind(self));
    }
    componentWillUnmount(){
        this.firebaseRef.offAuth(this._authDataCallback.bind(this));
    }
    _authDataCallback(authData){
        const self = this;
        if(authData){
            //console.log('logged in as '+authData.uid);
            self.firebaseRef.on("value",function(data){
                self.setState({recordItems:data.val()});
            },function(errorObject){
                //console.log('error occurred ',errorObject);
            });
        }else{
            //console.log('not logged in');
        }
    }
    _renderRecordItems(){
        let self = this,
            itemsInAr = [];
        for (var property in self.state.recordItems){
            itemsInAr.push(self.state.recordItems[property]);
        }
        if(itemsInAr.length >=1){
            return itemsInAr.map((item,i)=>{
                return <tr key={i}>
                    <td>{i+1}</td>
                    <td>{item.TeacherAge}</td>
                    <td>{item.Sex}</td>
                    <td>{item.Subject}</td>
                    <td>{item.YearGroup}</td>
                    <td>{item.ComputingSkills}</td>
                    <td>{item.TeachingExp}</td>
                    <td>{item.dailyTasks}</td>
                    <td>{item.CapitaSIMS}</td>
                    <td>{item.uFriendly}</td>
                    <td>{item.Features}</td>
                    <td>{item.other}</td>
                </tr>
            });
        }
    }
    render(){
        return <div>
            <table>
                <thead>
                <tr>
                    <th width="10">Number</th>
                    <th width="200">Teacher Age</th>
                    <th width="400">Sex(Male or Female)</th>
                    <th width="150">Subject</th>
                    <th width="150">Year Group</th>
                    <th width="150">Computing Skills</th>
                    <th width="150">Teaching Experience</th>
                    <th width="150">Tasks</th>
                    <th width="350">Uses Capita SIMS</th>
                    <th width="150">Capita SIMS is user friendly</th>
                    <th width="350">Favourite features of CAPITA SIMS</th>
                    <th width="350">Uses other tools</th>
                </tr>
                </thead>
                <tbody>
                {this._renderRecordItems()}
                </tbody>
            </table>
        </div>
    }
}
export default Records;