import { expect } from 'chai';
import Validation from '../../src/helpers/Validations';

describe('Validation module', () => {
  it('should return isInvalid, if params are empty ', () => {
    expect(Validation.validate([], {})).to.have.property('invalid').equal(true);
  });
  it('should return invalid, if params not match', () => {
    expect(Validation.validate(['email'], { name: 'Abhay' }))
      .to.have.property('invalid')
      .equal(true);
  });
  it('should return proper message, if params not match', () => {
    expect(Validation.validate(['age'], { name: 'Abhay' }))
      .to.have.property('fields')
      .deep.equal([{ field: 'age', message: 'Parameter age should not be empty' }]);
  });
  it('should throw error, if email not correct', () => {
    expect(Validation.validate(['email'], { email: 'a.com' }))
      .to.have.property('fields')
      .deep.equal([{ field: 'email', message: 'Please enter a valid email' }]);
  });

  it('should validate email', () => {
    expect(Validation.validate(['email'], { email: 'a@a.com' }))
      .to.have.property('invalid')
      .equal(false);
  });
});
