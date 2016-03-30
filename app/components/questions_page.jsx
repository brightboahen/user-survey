/**
 * Created by brightboahen on 10/03/2016.
 */

import React from 'react'
import DropdownComp from './dropdown'
import RadioComp from './radioComp'
import QuestionComp from './question_comp'
import Firebase from 'firebase'
import Range from './range'
import RadioLabel from './radio_label'
import ComboComp from './combo_comp2'
import If from './if'

class QuestionsPage extends React.Component{

    constructor(props){
        super(props);
        this.brightHead = {
            TeacherAge:'',
            Sex:'',
            Subject:'',
            YearGroup:'',
            ComputingSkills:'',
            TeachingExp:'',
            dailyTasks:'',
            CapitaSIMS:'',
            uFriendly:'',
            Features:'',
            other:''
        };
        this.state = {
            isCapita : false,
            isNot : false
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
        if(this.brightHead.ComputingSkills !== ''){
            this.firebaseRef.push(this.brightHead);
            alert("Responses successfully submitted,thank you for taking part in this questionnaire - your responses are of great value");
            window.location.reload();
        }else{
            alert("Please fill in more questions");
        }
    }
    _radioControllerCallBack(args){
        console.log(args);
        const    self   =   this;
        switch (args){
            case 'Yes':
                self.setState({isCapita:true, isNot:false});
                break;
            case 'No':
                self.setState({isCapita:false, isNot:true});
                break;
            default:
                break;
        }
        self.brightHead.CapitaSIMS = args;
    }
    render(){
        return <div className="row">
            <div className="large-12 columns">
                <h4>
                    Thank you for deciding to take part in this survey.
                    Information gathered would be used in profiling teachers into different user groups
                    for productivity/classroom management software.
                </h4>
                <DropdownComp isMultiple={false}
                              compIdentifier="TeacherAge"
                              selectItems={['20-24','25-29','30-34','35-39','40-44','45-49','50-54','55-59','60-64','65-69']}
                              callBackFunc={this._pageCallback.bind(this)}>
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
                              selectItems={['English','Maths','Science','Drama','Design and Technology','History','Geography','Art and Design','Music','PE','Computing','Ancient and Modern Foreign Languages','Citizenship']} callBackFunc={this._pageCallback.bind(this)}>
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
            <div className="large-12 columns">
                <Range minValue={0} 
                       maxValue={10} 
                       rangeStep={1} 
                       callBackFunc={this._pageCallback.bind(this)}
                       compIdentifier="ComputingSkills">
                    On a scale of 1 - 10, please rate your computing skills
                </Range>
            </div>
            <div className="large-12 columns">
                <Range minValue={0}
                       maxValue={50}
                       rangeStep={1}
                       callBackFunc={this._pageCallback.bind(this)}
                       desText="Years" compIdentifier="TeachingExp">
                    How long have you been teaching?
                </Range>
            </div>
            <div className="large-12 columns">
                <ComboComp compIdentifier="dailyTasks"
                           callBackFunky={this._pageCallback.bind(this)}
                           showInputOnStart={true}>
                    What sort of tasks do you perform using a computer on a daily basis?
                </ComboComp>
            </div>
            <div className="large-12 columns">
                <RadioLabel labelsForRadio={["Yes","No"]}
                            compIdentifier="CapitaSIMS"
                            callBackFunc={this._radioControllerCallBack.bind(this)}>
                    Do you use Capita SIMS School Management Software at your school?
                </RadioLabel>
            </div>
            <If condition={this.state.isCapita}>
                <div className="large-12 columns">
                    <Range minValue={0} maxValue={5}
                           compIdentifier="uFriendly"
                           callBackFunc={this._pageCallback.bind(this)}
                           rangeStep={1}>
                        On a scale of 1 - 5, how easy is it to use for your daily tasks?
                    </Range>
                    <ComboComp compIdentifier="Features" callBackFunky={this._pageCallback.bind(this)}
                               showInputOnStart={true}>
                        Please mention some of the features you like about Capita SIMS tool
                    </ComboComp>
                </div>
            </If>
            <If condition={this.state.isNot}>
                <div className="large-12 columns">
                    <ComboComp compIdentifier="other"
                               callBackFunky={this._pageCallback.bind(this)}
                               showInputOnStart={true}>
                        Type in here any software or application that you use in completing your teaching tasks or
                        managing the classroom.
                    </ComboComp>
                </div>
            </If>
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