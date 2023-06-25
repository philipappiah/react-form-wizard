import React from "react";
import { StepProps } from '../types';
import "./stepStyles.css";

class StepCard extends React.Component<StepProps> {


  goToPrev = () => {
    let val = +this.props.identity - 1;
    let pos = +this.props.index - 1;

    if (val < 1) {
      val = 1;
    }

    if (pos < 0) {
      pos = 0;
    }
    if (this.props.move != undefined) {
      this.props.move(val, pos);
    }
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

    if (this.props.move != undefined) {
      this.props.move(val, pos);
    }
    this.getFormValues();
  };

  getFormValues = () => {
    this.props.values();
  };


  submitForm = () => {
    this.props.submit();
  }

  submitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.getToNext()

  }


  render() {
    return (
      <div
        className={`${this.props.setDisplay ? "hide" : "stepcard"}`}
        style={{
          display: `${this.props.setDisplay ? "block" : "none"}`,
          backgroundColor: this.props.backgroundColor?.form || "#fff",
          color: this.props.color?.form || "#000"
        }}
        key={this.props.identity}
      >
        <div className="card" key={this.props.identity}>
          <div className="card-body" key={this.props.identity}>
            <h5>{this.props.title}</h5>

            <form onSubmit={this.submitData} key={this.props.identity}>

              {Object.keys(this.props.stepsData).map(res =>
                res == this.props.identity.toString() ? (
                  Object.keys(this.props.stepsData[res].input).map(data =>
                    this.props.stepsData[res].input[data].details.map((props: any, i: number) =>
                      this.props.stepsData[res].input[data].type === "radio" ? (

                        <div
                          className="form-group"
                          key={i}
                          style={{ display: "inline-block" }}
                        >
                          {i === 0 ? (
                            <label
                              htmlFor={`${props.id}`}
                              className="text-black"
                            >
                              {props.placeholder || ""}
                            </label>
                          ) : (
                            <label />
                          )}

                          <label className="custom-control custom-radio custom-control-inline">
                            <input
                              className="custom-control-input"
                              type="radio"
                              required={props.required}
                              defaultValue={`${props.id || ""}`}
                              name={props.id || ""}
                              onChange={this.getFormValues}
                            />
                            <span className="custom-control-label">
                              {props.label || ""}
                            </span>
                          </label>
                        </div>
                      ) : this.props.stepsData[res].input[data].type == "select" ? (
                        <div className="form-group" key={i}>
                          <label htmlFor="c_diff_country" className="text-black">
                            {props.label || ""}

                          </label>
                          <select
                            style={{ height: "10%" }}
                            name={`${props.id}`}
                            onChange={this.getFormValues}
                            className="form-control"
                            required={props.required || false}
                          >
                            {props.options ? (
                              <option value={props.placeholder || ""}>
                                {props.placeholder || ""}
                              </option>
                            ) : (
                              <option></option>
                            )}
                            {props.options.map((val: string, i: number) => (
                              <option key={i} value={val}>{val}</option>
                            ))}
                          </select>
                        </div>
                      ) : this.props.stepsData[res].input[data].type == "textarea" ? (
                        <div className="form-group" key={i}>
                          <label htmlFor={`${props.id}`} className="text-black">
                            {props.label || ""}
                          </label>
                          <textarea
                            name={`${props.id || ""}`}
                            id={`${props.id || ""}`}
                            required={props.required}
                            readOnly={props.readOnly}
                            cols={props.cols || 10}
                            rows={props.rows || 5}
                            className="form-control"

                            onChange={this.getFormValues}
                            placeholder={`${props.placeholder || ""}`}
                            defaultValue={`${props.defaultValue || ""}`}
                          />
                        </div>
                      ) : data == "checkbox" ?
                        (
                          <div className="form-group" key={i}>
                            <label
                              htmlFor={`${props.id || ""}`}
                              className="text-black"

                            >
                              <input
                                type="checkbox"
                                defaultValue={`${props.defaultValue || ""}`}
                                required={props.required || false}
                                name={`${props.id || ""}`}
                                id={`${props.id || ""}`}
                                onChange={this.getFormValues}
                                checked={props.checked || false}
                              />{" "}
                              {props.label}
                            </label>  </div>) : (
                          <div className="col form-group" key={i}>
                            <label>{props.label || ""}</label>
                            <input
                              type={`${data}`}
                              className="form-control"
                              style={{ height: "10%" }}
                              required={props.required || false}
                              readOnly={props.readOnly || false}
                              placeholder={props.placeholder || ''}
                              name={props.id}
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
                style={{ background: this.props.backgroundColor?.previousButton || "blue", color: this.props.color?.previousButton || "white" }}
                className="actionbuttons  btn-block prevbtn"
              >
                Prev
              </button>

              {
                this.props.currentStep === this.props.totalSteps ?
                  <button


                    type="button"
                    onClick={this.submitForm}
                    style={{ background: "blue", color: "white" }}
                    className="actionbuttons  btn-block nextbtn"
                  >
                    submit

                  </button> :
                  <button


                    type="submit"

                    style={{ background: this.props.backgroundColor?.nextButton || "blue", color: this.props.color?.nextButton || "white" }}
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

