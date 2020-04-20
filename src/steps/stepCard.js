import React from "react";

import stepStyles from "./stepStyles.css";



class StepCard extends React.Component {


  goToPrev = () => {
    let val = +this.props.identity - 1;
    let pos = +this.props.index - 1;

    if (val < 1) {
      val = 1;
    }

    if (pos < 0) {
      pos = 0;
    }

    this.props.move(val, pos);
  };

  getToNext = () => {
    let val = +this.props.identity + 1;
    let pos = +this.props.index + 1;

    if (val > this.props.totalSteps) {
      val = val - 1;
    }

    if (pos + 1 > this.props.totalSteps) {
      pos = pos - 1;
    }

    this.props.move(val, pos);
    this.getFormValues();
  };

  getFormValues = () => {
    if(this.props.values && typeof(this.props.values)=="function"){
        this.props.values();
  
      }else{
        return
      }
   
  };


  submitForm = () => {
    if(this.props.submit && typeof(this.props.submit)=="function"){
        this.props.submit();
  
      }else{
        return
      }
   
      
}

  render() {
    return (
      <div
        className={`${this.props.setDisplay ? "hide" : "stepcard"}`}
        style={{
          display: `${this.props.setDisplay ? "block" : "none"}`
        }}
        key={this.props.identity}
      >
        <div className="card" key={this.props.identity}>
          <div className="card-body" key={this.props.identity}>
            <h5>{this.props.title}</h5>

            {Object.keys(this.props.stepsData).map(res =>
              res == this.props.identity ? (
                Object.keys(this.props.stepsData[res].input).map(data =>
                  this.props.stepsData[res].input[data].names.map((name, i) =>
                    data === "radio" ? (
                        
                      <div
                        className="form-group"
                        key={i}
                        style={{ display: "inline-block" }}
                      >
                        {i === 0 ? (
                          <label
                            htmlFor={`${name.id}`}
                            className="text-black"
                          >
                            {name.placeholder ? name.placeholder  : ""} &nbsp;
                            
                          </label>
                        ) : (
                          <label />
                        )}

                        <label className="custom-control custom-radio custom-control-inline">
                          <input
                            className="custom-control-input"
                            type="radio"
                            name="gender"
                            
                            defaultValue={`${name.id ? name.id : ""}`}
                            name={name.id ? name.id : ""}
                            onChange={this.getFormValues}
                          />
                          <span className="custom-control-label">
                            {name.label ? name.label : ""}
                          </span>
                        </label>
                      </div>
                    ) : data == "select" ? (
                      <div className="form-group">
                        <label htmlFor="c_diff_country" className="text-black">
                          {name.label ? name.label : ""}
                    
                        </label>
                        <select
                          name={`${name.id}`}
                          onChange={this.getFormValues}
                          className="form-control"
                        >
                          {name.placeholder ? (
                            <option val={name.placeholder}>
                              {name.placeholder}
                            </option>
                          ) : (
                            <div />
                          )}
                          {name.options.map(res => (
                            <option value={res}>{res}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="col form-group">
                        <label>{name.label ? name.label : ""}</label>
                        <input
                          type={`${data}`}
                          className="form-control"
                          placeholder={`${
                            name.placeholder ? name.placeholder : ""
                          }`}
                         
                          name={name.id ? name.id : ""}
                          onChange={this.getFormValues}
                        />
                      </div>
                    )
                  )
                )
              ) : (
                <div />
              )
            )}

    
            <button
           
            
              type="button"
              onClick={this.goToPrev}
              style={{background:"blue", color:"white"}}
              className="btn  btn-block prevbtn"
            >
              Previous
            </button>

            {
                this.props.currentStep === this.props.totalSteps? 
                <button
            
            
                type="button"
                onClick={this.submitForm}
                style={{background:"blue", color:"white"}}
                className="btn  btn-block nextbtn"
              >
                  submit
                
              </button>:
               <button
            
            
               type="button"
               onClick={this.getToNext}
               style={{background:"blue", color:"white"}}
               className="btn  btn-block nextbtn"
             >
                 Next
               
             </button>

            }

          
            </div>
          
        </div>
      </div>
    );
  }
}

export default StepCard;
