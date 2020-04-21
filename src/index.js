import React from "react";
import StepCard from "./steps/stepCard";
import bootstrap from "./steps/bootstrap.css"
import stepStyles from "./steps/stepStyles.css";

var _visited_arr = []

class FormWizard extends React.Component {
  state = {
   

    currentStep: 1
  };

  componentDidMount = () => 
  {
    _visited_arr[0] = true;
   for(let i = 1; i < this.props.totalSteps; i++){
    _visited_arr[i] = false;
   }
  };

  setCurrentStep = (value, i) => {
    this.setState({ currentStep: i + 1 });
    this.setColor(i);
  };

  setColor = index => {

   
    
    if(_visited_arr[index]){

      for(let i = index+1; i < this.props.totalSteps ; i++){
        if(_visited_arr[i]){
          document.getElementsByClassName("stepValue")[i].style.backgroundColor =
        "gray";
        _visited_arr[i] = false
  
        }
      }

    }else{

    _visited_arr[index] = true;
   

    

    for(let i = 0; i < this.props.totalSteps ; i++){
      if(_visited_arr[i]){
        document.getElementsByClassName("stepValue")[i].style.backgroundColor =
      "blue";

      }else{
        document.getElementsByClassName("stepValue")[i].style.backgroundColor =
        "gray";
      }
    }
  }
  

  };



  getAllValues = () => {
    let dataObj = {};
    
    var len = document.getElementsByTagName("input").length;
    var selectlen = document.getElementsByTagName("select").length;
    var txtarealen = document.getElementsByTagName("textarea").length;


    for (let i = 0; i < len; i++) {
      if(document.getElementsByTagName("input")[i].type == "checkbox"){
       
         
          dataObj[
          
            document.getElementsByTagName("input")[i].name
          ] = document.getElementsByTagName("input")[i].checked

        
        

      }else if(document.getElementsByTagName("input")[i].files){
         
            dataObj[
          
                document.getElementsByTagName("input")[i].name
              ] = document.getElementsByTagName("input")[i].files;
        }else{
            dataObj[
          
                document.getElementsByTagName("input")[i].name
              ] = document.getElementsByTagName("input")[i].value;

        }
     
    }

    let txtareaNames = [];
    for(let x = 0; x < txtarealen; x++){
      txtareaNames.push(document.getElementsByTagName("textarea")[x].name);
    }

    if(txtarealen > 0){
      for (let i = 0; i < txtarealen; i++) {
        dataObj[txtareaNames[i]] = document.getElementsByTagName("textarea")[
          i
        ].value;
      }

    }

    let selectNames = [];

    for (let x = 0; x < selectlen; x++) {
      selectNames.push(document.getElementsByTagName("select")[x].name);
    }

    if (selectlen > 0) {
      for (let i = 0; i < selectlen; i++) {
        dataObj[selectNames[i]] = document.getElementsByTagName("select")[
          i
        ].value;
      }
    }

    return dataObj;


  }

  values = () => {

    if(this.props.data && typeof(this.props.data == "function")){
        this.props.data(this.getAllValues());

    }else{
        return
    }
    
    
  };

  submitValues = () =>{
  

    if(this.props.submit && typeof(this.props.submit)=="function"){
        this.props.submit(this.getAllValues())
  
      }else{
        return
      }
  }


  

  render() {
    return (
        
      <div>
          {
            this.props.steps && this.props.stepsData && this.props.totalSteps ?
            <div>
            
        
        <div className="center-card">
          {Object.keys(this.props.steps).map((res, i) => (
            <span key={i} className="nextStep ">
              <p
                className="stepValue"
                key={i}
                style={{ backgroundColor: `${res == 1 ? "blue" : "gray"}` }}
                onClick={() => this.setCurrentStep(res, i)}
              >
                {res}
              </p>{" "}
              {this.props.steps[res]}{" "}
            </span>
          ))}
        </div>

        {Object.keys(this.props.steps).map((res, i) =>
          res == this.state.currentStep ? (
            <div key={res}>
              <StepCard
                title={this.props.steps[res]}
                stepsData={this.props.stepsData}
                key={res}
                totalSteps={this.props.totalSteps}
                index={i}
                move={this.setCurrentStep.bind(this)}
                values={this.values.bind(this)}
                submit = {this.submitValues.bind(this)}
                identity={res}
                currentStep={this.state.currentStep}
                setDisplay={true}
              />
            </div>
          ) : (
            <div key={res}>
              <StepCard
                title={this.props.steps[res]}
                stepsData={this.props.stepsData}
                key={res}
                index={i}
                totalSteps={this.props.totalSteps}
                values={this.values.bind(this)}
                submit = {this.submitValues.bind(this)}
                identity={res}
                setDisplay={false}
                currentStep={this.state.currentStep}
              />
            </div>
          )
        )}
        </div>:<div className="center-card" style={{marginTop:"20%"}}>No Steps provided</div>
  }
      </div>
    );
  }
}

export default FormWizard;
