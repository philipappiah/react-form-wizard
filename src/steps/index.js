import React from "react";
import StepCard from "./stepCard";
import bootstrap from "./bootstrap.css"
import stepStyles from "./stepStyles.css";


class StepForm extends React.Component {
  state = {
    totalSteps: 4,
    steps: {
      1: "Add Seller Information",
      2: "Add Business Information",
      3: "How do we pay you?",
      4: "Summary"
    },
    stepsData: {
      1: {
        input: {
          text: {
            total: 2,
            names: ["fullname", "lastname"],
            required: true
          },
          email: {
            total: 1,
            names: ["email"],
            required: true
          },
          password: {
            total: 1,
            names: ["password"],
            required: true
          },
          radio: {
            total: 2,
            names: ["male", "female"]
          }
        }
      },
      2: {
        input: {
          text: {
            total: 2,
            names: ["country", "region"]
          },
          email: {
            total: 1,
            names: ["contact"]
          }
        }
      }
    },
    colorArray: [],
    isactive: false,
    currentStep: 1
  };

 

  setCurrentStep = (value, i) => {
    this.setState({ currentStep: value });
    this.setColor(i);
  };

  setColor = index => {
    document.getElementsByClassName("stepValue")[index].style.backgroundColor =
      "blue";


     
    for (
      let x = index + 1;
      x < document.getElementsByClassName("stepValue").length;
      x++
    ) {
      document.getElementsByClassName("stepValue")[x].style.backgroundColor =
        "gray";
    }
  };



  getAllValues = () => {
    let dataObj = {};
    
    var len = document.getElementsByTagName("input").length;
    var selectlen = document.getElementsByTagName("select").length;

    for (let i = 0; i < len; i++) {
        if(document.getElementsByTagName("input")[i].files){
         
            dataObj[
          
                document.getElementsByTagName("input")[i].name
              ] = document.getElementsByTagName("input")[i].files;
        }else{
            dataObj[
          
                document.getElementsByTagName("input")[i].name
              ] = document.getElementsByTagName("input")[i].value;

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
        
      <div >
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
            <div key={i}>
              <StepCard
                title={this.props.steps[res]}
                stepsData={this.props.stepsData}
                key={i}
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
            <div key={i}>
              <StepCard
                title={this.props.steps[res]}
                stepsData={this.props.stepsData}
                key={i}
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
        </div>:<div className="center-card" style={{marginTop:"20%"}}>No Steps or total steps provided to component</div>
  }
      </div>
    );
  }
}

export default StepForm;
