import React from "react";
import Steps from "./steps";

class App extends React.Component {
  state = {
    loaded: false,
    totalSteps: 4,
    steps: {
      1: "Add Seller Information",
      2: "Add Business Information",
      3: "How do we pay you?",
      4: "Summary",
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
          email: {
            total: 1,
            names: [{ id: "email", label: "Email", placeholder: "Email" }],
            required: true,
          },
          password: {
            total: 1,
            names: [{ id: "password", label: "Password" }],
            required: true,
          },
          radio: {
            total: 2,

            names: [
              { id: "male", label: "Male", placeholder: "Gender" },
              { id: "female", label: "Female" },
            ],
          },

          select: {
            total: 1,
            names: [
              {
                id: "country",
                label: "Country",
                options: ["Ghana", "USA", "Nigeria"],
                placeholder: "Select your country",
              },
            ],
          },

          file: {
            total: 1,
            names: [{ id: "profile-photo", label: "Photo" }],
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

  getformValues = (value) => {
    console.log(value);
  };

  render() {
    return (
      <div>
        <Steps
          steps={this.state.steps}
          stepsData={this.state.stepsData}
          totalSteps={this.state.totalSteps}
          data={this.getformValues}
        />
      </div>
    );
  }
}

export default App;
