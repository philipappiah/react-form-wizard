import React from "react";
import StepCard from "./steps/stepCard";
import { FormWizardProps, KeyValueMap } from "./types";
import "./steps/bootstrap.css"
import "./steps/stepStyles.css";

class FormWizard extends React.Component<FormWizardProps> {
  state = {
    currentStep: 1,
    visited_arr: [] as boolean[]
  };

  componentDidMount = () => {
    this.state.visited_arr[0] = true;
    for (let i = 1; i < this.props.totalSteps; i++) {
      this.state.visited_arr[i] = false;
    }
  };

  setCurrentStep = (i: number) => {
    this.setState({ currentStep: i + 1 });
    this.setColor(i);
  };

  setColor = (index: number) => {

    if (this.state.visited_arr[index]) {

      for (let i = index + 1; i < this.props.totalSteps; i++) {
        let element = document.getElementsByClassName("stepValue")[i] as HTMLElement;
        if (this.state.visited_arr[i]) {
          element.style.backgroundColor =
            this.props.backgroundColor?.inActiveStep || "gray";
          this.state.visited_arr[i] = false

        }
      }

    } else {

      this.state.visited_arr[index] = true;

      for (let i = 0; i < this.props.totalSteps; i++) {

        let element = document.getElementsByClassName("stepValue")[i] as HTMLElement;
        if (this.state.visited_arr[i]) {
          element.style.backgroundColor =
            this.props.backgroundColor?.activeStep ||
            "blue";

        } else {
          element.style.backgroundColor =
            this.props.backgroundColor?.inActiveStep ||
            "gray";
        }
      }
    }


  };



  getAllValues = () => {

    let dataObj: KeyValueMap = {};

    var len = document.getElementsByTagName("input").length;
    var selectlen = document.getElementsByTagName("select").length;
    var txtarealen = document.getElementsByTagName("textarea").length;


    for (let i = 0; i < len; i++) {
      if (document.getElementsByTagName("input")[i].type == "checkbox") {


        dataObj[

          document.getElementsByTagName("input")[i].name
        ] = document.getElementsByTagName("input")[i].checked




      } else if (document.getElementsByTagName("input")[i].files) {

        dataObj[

          document.getElementsByTagName("input")[i].name
        ] = document.getElementsByTagName("input")[i].files;
      } else {
        dataObj[

          document.getElementsByTagName("input")[i].name
        ] = document.getElementsByTagName("input")[i].value;

      }

    }

    let txtareaNames = [];
    for (let x = 0; x < txtarealen; x++) {
      txtareaNames.push(document.getElementsByTagName("textarea")[x].name);
    }

    if (txtarealen > 0) {
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

    if (this.props.data && typeof (this.props.data) == "function") {
      this.props.data(this.getAllValues());
    }


  };

  submitValues = () => {

    if (this.props.submit && typeof (this.props.submit) == "function") {
      this.props.submit(this.getAllValues())

    }
  }




  render() {
    return (

      <div>
        {
          this.props.steps && this.props.stepsData && this.props.totalSteps ?
            <div>
              <div>
                {Object.keys(this.props.steps).map((res, i) => (
                  <span key={i} className="nextStep ">
                    <p
                      className="stepValue"
                      key={i}
                      style={{ backgroundColor: `${res == "1" ? "blue" : "gray"}` }}
                      onClick={() => this.setCurrentStep(i)}
                    >
                      {res}
                    </p>{" "}
                    {this.props.steps[i]}{" "}
                  </span>
                ))}
              </div>

              {Object.keys(this.props.steps).map((res, i) =>
                res == this.state.currentStep.toString() ? (
                  <div key={res}>
                    <StepCard
                      title={this.props.steps[i]}
                      stepsData={this.props.stepsData}
                      key={res}
                      totalSteps={this.props.totalSteps}
                      index={i}
                      move={this.setCurrentStep.bind(this)}
                      values={this.values.bind(this)}
                      submit={this.submitValues.bind(this)}
                      identity={res}
                      currentStep={this.state.currentStep}
                      setDisplay={true}
                      backgroundColor={this.props.backgroundColor}
                      color={this.props.color}
                    />
                  </div>
                ) : (
                  <div key={res}>
                    <StepCard
                      title={this.props.steps[i]}
                      stepsData={this.props.stepsData}
                      key={res}
                      index={i}
                      totalSteps={this.props.totalSteps}
                      values={this.values.bind(this)}
                      submit={this.submitValues.bind(this)}
                      identity={res}
                      setDisplay={false}
                      currentStep={this.state.currentStep}
                      backgroundColor={this.props.backgroundColor}
                      color={this.props.color}
                    />
                  </div>
                )
              )}
            </div> : <div className="center-card" style={{ marginTop: "20%" }}>No Steps provided</div>
        }
      </div>
    );
  }
}

export default FormWizard;
