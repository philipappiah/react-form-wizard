import React from 'react';
import FormWizard from "react-form-wizard";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.getformValues = this.getformValues.bind(this);
  }
  state = {
    loaded: false,
    backgroundColor: {
      form: "#fff",
      activeStep: "blue",
      inActiveStep: "gray",
      previousButton: "blue",
      nextButton: "blue"
    },
    color: {
      form: "#000",
      previousButton: "white",
      nextButton: "white"
    },
    totalSteps: 2,
    steps: ["Add Profile Information",
      "Add Contact Details",
    ],
    stepsData: [
      {
        input: {
          type: "text",
          details: {
            total: 2,
            names: [{ id: "fullname", label: "Fullname", required: true },
            { id: "lastname", label: "Lastname" }],

          },
        },
        input: {
          type: "select",
          details: {
            id: "vat_status",
            label: "VAT Registered",
            options: ["Yes", "No"],
            placeholder: "Select VAT status"
          },
        }
      },
      {
        input: {
          type: "text",
          details: {
            total: 2,
            names: [{ id: "country", label: "Country" },
            { id: "region", label: "Region" }],
          }
        },
        input: {
          type: "textarea",
          details: {
            id: "termsAndAgreement",
            label: "Terms and Agreement",
            rows: "5",
            cols: "30",
            defaultValue: "This is our terms and agreement",
            readOnly: true
          }
        },
        input: {
          type: "checkbox",
          details: {
            id: "acceptterms",
            label: "I have read and accepted the agreement",
            checked: false
          }
        }
      },
    ],
  };

  componentDidMount = () => {
    this.setState({ loaded: true });
  };

  getformValues = (value) => {
    console.log(value);
  };

  render() {
    return (
      <div>
        <FormWizard
          steps={this.state.steps}
          stepsData={this.state.stepsData}
          totalSteps={this.state.totalSteps}
          data={this.getformValues}
          submit={this.getformValues}
          backgroundColor={this.state.backgroundColor}
          color={this.state.color}
        />
      </div>
    );
  }
}


export default App;