import { expect } from 'chai';
import { Response } from 'express';
import GenerateResponse from '../../src/helpers/Response';

describe('Response Module', () => {
  it('should return response with 200, if all goods', () => {
    let res: Partial<Response>;
    res = {
      json: function (value) {
        return value;
      },
    };
    const response = new GenerateResponse(res as Response, 200, 'Success', {});
    expect(response.apiResponse()).to.have.deep.equal({
      status: 200,
      message: 'Success',
      result: {
        message: 'Success',
        data: {},
      },
    });
  });
  it('should return response with an error', () => {
    let res: Partial<Response>;
    res = {
      json: function (value) {
        return value;
      },
    };
    const response = new GenerateResponse(res as Response, 403, 'Validation Failed', {});
    expect(response.apiResponse()).to.have.deep.equal({
      status: 403,
      message: 'Validation Failed',
      result: {
        message: 'Validation Failed',
        data: {},
      },
    });
  });
  it('should return default response object, if statusCode not found', () => {
    let res: Partial<Response>;
    res = {
      json: function (value) {
        return value;
      },
    };
    const response = new GenerateResponse(res as Response, 503, 'Failed', {});
    expect(response.apiResponse()).to.have.deep.equal({
      status: 503,
      message: 'Failed',
      result: {
        message: 'Failed',
        data: null,
      },
    });
  });
});
