/**
 * Created by brightboahen on 10/03/2016.
 */

import React from 'react';
import DropdownComp from './dropdown';
import RadioComp from './radioComp';
import QuestionComp from './question_comp';
import Firebase from 'firebase';

class QuestionsPage extends React.Component{

    constructor(props){
        super(props);

        this.brightHead = {
            TeacherAge:'',
            Sex:'',
            Subject:'',
            YearGroup:'',
            Tools:'',
            FavouriteFeatures:'',
            LeastFavourite:'',
            NoTools:'',
            DreamTools:'',
            currentTools:''

        }
    }

    componentWillMount(){
        this.firebaseRef = new Firebase('https://sizzling-fire-1284.firebaseio.com/survey_data');
        //this.firebaseRef.on("child_added",function(snapshot){
        //    console.log(snapshot.val());
        //}.bind(this));
    }

    componentWillUnmount(){
        this.firebaseRef.off();
    }

    _pageCallback(key,val){
        this.brightHead[key] = val;
    }

    _submitButtonClicked(){
        if(this.brightHead.YearGroup !== ''){
            this.firebaseRef.push(this.brightHead);
            alert("Responses successfully submitted,thank you");
        }else{
            alert("Please fill in more questions");
        }
    }

    render(){
        return <div className="row">
            <div className="large-12 columns">
                <DropdownComp isMultiple={false} compIdentifier="TeacherAge" selectItems={['20-24','25-29','30-34','35-39','40-44','45-49','50-54','55-59','60-64','65-69']} callBackFunc={this._pageCallback.bind(this)}>
                    Please select your age group
                </DropdownComp>
            </div>
            <div className="large-12 columns">
                <RadioComp radioItemLabels={['Male','Female']} callBackFunc={this._pageCallback.bind(this)}>
                    Sex ( Male or Female )
                </RadioComp>
            </div>
            <div className="large-12 columns">
                <DropdownComp isMultiple={true}
                              compIdentifier = "Subject"
                              selectItems={['English','Maths','Science','Design and Technology','History','Geography','Art and Design','Music','PE','Computing','Ancient and Modern Foreign Languages','Citizenship']} callBackFunc={this._pageCallback.bind(this)}>
                    Please select the subject(s) that you teach - to select multiple subjects hold down 'Ctrl' key and click on subjects on windows or 'Cmd' key and click if you are on a Mac.
                </DropdownComp>
            </div>
            <div className="large-12 columns">
                <DropdownComp isMultiple={true} selectItems={['Year 1','Year 2','Year 3','Year 4','Yeah 5','Yeah 6','Yeah 7','Year 8','Year 9','Year 10','Year 11']}
                              compIdentifier="YearGroup"
                              callBackFunc={this._pageCallback.bind(this)}>
                    Please select the year group that you teach - to select multiple year groups hold down 'Ctrl' key and click on subjects on windows or 'Cmd' key and click if you are on a Mac.
                </DropdownComp>
            </div>
            <QuestionComp callBackFunc={this._pageCallback.bind(this)}/>
            <div className="large-12 columns">
                <input type="button" value="Submit" className="large button" onClick={this._submitButtonClicked.bind(this)}/>
            </div>
        </div>
    }
}
QuestionsPage.propTypes = {
    title : React.PropTypes.string
};
export default QuestionsPage;