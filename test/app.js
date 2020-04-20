import React from 'react';
import FormWizard from "react-form-wizard";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.getformValues = this.getformValues.bind(this);
  }
  state = {
    loaded: false,
    totalSteps: 4,
    steps: {
      1: "Add Profile Information",
      2: "Add Contact Details",
    },
    stepsData: {
      1: {
        input: {
          text: {
            total: 2,

            names: [
              { id: "fullname", label: "Fullname", required: true },
              { id: "lastname", label: "Lastname" },
            ],
            required: true,
          },
        },
      },
      2: {
        input: {
          text: {
            total: 2,
            names: [
              { id: "country", label: "Country" },
              { id: "region", label: "Region" },
            ],
          },
          email: {
            total: 1,
            names: [{ id: "contact", label: "Contact" }],
          },
        },
      },
    },
  };

  componentDidMount = () => {
    this.setState({ loaded: true });
  };

  getformValues = (value) => {
    console.log(value);
  };

  getStep = (value) => {
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
        />
      </div>
    );
  }
}


export default App;