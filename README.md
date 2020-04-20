
react-form-wizard comes bundle with bootstrap 


### `example forms`
[alt text](https://github.com/philipappiah/react-form-wizard.git/public/img/image_1.png)

## Available Scripts

In the project directory, you can run:

### `npm install react-form-wizard`

Usage in component.<br />


```
import FormWizard from "react-form-wizard" 


state = {
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


  render () {
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
      )
  }
```




###  `The component requires the following props` <br />
 - steps = {number of steps}
 - stepsData = {data to be shown on form e.g inputs, their names and types} 
 - totalSteps = {number of steps} 
 



### `The component also return the following as props` <br />
 - data = {returns current form values}
 - submit = {returns final form values} 

 




This project will continue to be maintained and it is expected to include more features.<br />


### `This component is a react component`

