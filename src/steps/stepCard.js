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

submitData = (e) =>{
  e.preventDefault();

  this.getToNext()

}

showSubmitBtn = () =>{
  let truthArr = this.props.showSubmit;
  let i = 0;
  truthArr.forEach(val=>{
    if(val) i++;
  })

  if(i === this.props.totalSteps){
    return true;
  }
  return false;
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

            <form  onSubmit={this.submitData} key={this.props.identity}>

            {Object.keys(this.props.stepsData).map(res =>
              res == this.props.identity ? (
                Object.keys(this.props.stepsData[res].input).map(data =>
                  this.props.stepsData[res].input[data].details.map((name, i) =>
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
                            {name.placeholder ? name.placeholder : ""}
                          </label>
                        ) : (
                          <label />
                        )}

                        <label className="custom-control custom-radio custom-control-inline">
                          <input
                            className="custom-control-input"
                            type="radio"
                            name="gender"
                            required={`${name.required ? 'required':''}`}
                            
                            
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
                      <div className="form-group" key={i}>
                        <label htmlFor="c_diff_country" className="text-black">
                          {name.label ? name.label : ""}
                          
                        </label>
                        <select
                         style={{height:"10%"}}
                          name={`${name.id}`}
                          onChange={this.getFormValues}
                          className="form-control"
                          required={`${name.required ? 'required':''}`}
                        >
                          {name.placeholder ? (
                            <option val={name.placeholder}>
                              {name.placeholder}
                            </option>
                          ) : (
                            <option></option>
                          )}
                          {name.options.map((res,i) => (
                            <option key={i} value={res}>{res}</option>
                          ))}
                        </select>
                      </div>
                    ) : data == "textarea" ?  (
                      <div className="form-group" key={i}>
                      <label htmlFor={`${name.id}`} className="text-black">
                        {name.label ? name.label : ""}
                      </label>
                      <textarea
                        name={`${name.id ? name.id :""}`}
                        id={`${name.id ? name.id:""}`}
                        required={`${name.required ? 'required':''}`}
                        readOnly={`${name.readOnly ? "readOnly":""}`}
                        cols={name.cols ? name.cols: 10}
                        rows={name.rows ? name.rows : 5}
                        className="form-control"
                      
                        onChange={this.getFormValues}
                        placeholder={`${name.placeholder ? name.placeholder :""}`}
                        defaultValue={`${name.defaultValue ? name.defaultValue:""}`}
                      />
                    </div>
                    ) : data == "checkbox" ?
                    ( 
                      <div className="form-group" key={i}>
                    <label
                      htmlFor={`${name.id ? name.id:""}`}
                      className="text-black"
                      
                    >
                      <input
                        type="checkbox"
                        defaultValue={`${name.defaultValue ? name.defaultValue:""}`}
                        required={`${name.required ? 'required':''}`}
                        name={`${name.id ? name.id :""}`}
                        id={`${name.id ? name.id:""}`}
                        onChange={this.getFormValues}
                      />{" "}
                      {name.label}
                    </label>  </div>): (
                      <div className="col form-group" key={i}>
                        <label>{name.label ? name.label : ""}</label>
                        <input
                          type={`${data}`}
                          className="form-control"
                          style={{height:"10%"}}
                          required={`${name.required ? 'required':''}`}
                          readOnly={`${name.readOnly ? true:""}`}
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
                <div key={res} />
              )
            )}

    
            <button
           
            
              type="button"
              onClick={this.goToPrev}
              style={{background:"blue", color:"white"}}
              className="actionbuttons  btn-block prevbtn"
            >
              Prev
            </button>

            {
                this.props.currentStep === this.props.totalSteps? 
                <button
            
            
                type="button"
                onClick={this.submitForm}
                style={{background:"blue", color:"white"}}
                className="actionbuttons  btn-block nextbtn"
              >
                  submit
                
              </button>:
               <button
            
            
               type="submit"
              
               style={{background:"blue", color:"white"}}
               className="actionbuttons  btn-block nextbtn"
             >
                 Next
               
             </button>

            }
            </form>

          
            </div>
          
        </div>
      </div>
    );
  }
}

export default StepCard;

