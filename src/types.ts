export type KeyValueMap = {
    [key: string]: any;
  }
  

  export type backgroundColorType = {
    form:string;
    activeStep:string;
    inActiveStep:string;
    previousButton:string;
    nextButton:string;
  }
  
  export type colorType = {
    form:string;
    previousButton:string;
    nextButton:string;
  }
  
  export type FormWizardProps = {
    totalSteps:number;
    data:(value: KeyValueMap) => void;
    submit:(value: KeyValueMap) => void;
    steps:string[];
    stepsData: KeyValueMap;
    backgroundColor?:backgroundColorType;
    color?:colorType
  
  }

  export type StepProps = {
    identity:string;
    index: number;
    move?: (value:number,index:number) => void;
    totalSteps: number;
    submit: ()=> void;
    setDisplay: boolean;
    values: () => void;
    stepsData: KeyValueMap;
    currentStep: number;
    title:string;
    backgroundColor?:backgroundColorType;
    color?:colorType
  
  }
  