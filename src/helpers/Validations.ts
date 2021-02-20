import validator from 'validator';

// types
type IResponseParams = {
  [key: string]: string | Array<string>;
};
type IField = {
  field: string;
  message: string;
};

type IInvalidObj = {
  invalid: boolean;
  fields: Array<IField>;
};

class Validations {
  validate(fields: Array<string>, params: IResponseParams): IInvalidObj {
    let result: Array<IField> = [];
    let isInvalid: boolean = true;
    let errorObj: IInvalidObj = { invalid: false, fields: result };
    fields.forEach(async (key: string) => {
      if (params[key] && key) {
        isInvalid = false;
        errorObj = this.formatValidation(key, params, errorObj);
        isInvalid = errorObj.invalid;
        result = errorObj.fields;
      } else {
        isInvalid = true;
        result.push({ field: key, message: `Parameter ${key} should not be empty` });
      }
    });
    errorObj.invalid = isInvalid;
    errorObj.fields = result;
    return errorObj;
  }
  private formatValidation(key: string, params: IResponseParams, invalidObj: IInvalidObj) {
    if (key === 'email') {
      invalidObj = this.emailValidation(String(params[key]), invalidObj);
    }
    return invalidObj;
  }

  emailValidation(email: string, invalidObj: IInvalidObj): IInvalidObj {
    if (!validator.isEmail(email)) {
      invalidObj.invalid = true;
      const fields = [];
      fields.push({ field: 'email', message: 'Please enter a valid email' });
      invalidObj.fields = fields;
    }
    return invalidObj;
  }
}
export default new Validations();
