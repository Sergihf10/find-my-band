import React from 'react';
import { useContext } from 'react';
import { formContext } from '../Create_Acc_Parent/ParentForm';
import './FormBasicInfo.css';
import { Link } from 'react-router-dom';
import { formContextInterface } from '../Create_Acc_Parent/ParentForm';

const FormBasicInfo: React.FC = () => {
  //reference the context of parent componnent
  const context = useContext(formContext) as formContextInterface;

  //TODO:
  //  Make the handleSubnit function update context state x
  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const form = event.currentTarget;
      const formElements = form.elements as typeof form.elements & {
        firstName: { value: string };
        lastName: { value: string };
        bday: { value: string };
        email: { value: string };
        password: { value: string };
      };
      //Grabbing inputs
      const firstNameInput = formElements.firstName.value;
      const lastNameInput = formElements.lastName.value;
      const bdayInput = new Date(formElements.bday.value);
      let bdayISO = bdayInput.toISOString();
      const emailInput = formElements.email.value;
      const passwordInput = formElements.password.value;

      //Updating State
      context.setUserObj({
        ...context.userObj,
        firstName: firstNameInput,
        lastName: lastNameInput,
        bday: bdayISO,
        email: emailInput,
        password: passwordInput,
      });

      context.setPage((page) => page + 1);
    } catch (err) {
      console.log(' : : : error submitting basic info : : : ', err);
    }
  }

  return (
    <div className="basic-info-form">
      <form className="form basicform" onSubmit={handleSubmit}>
        <h2 className="top-text">To get started, we need some basic info:</h2>
        <p>First Name</p>
        <input type={'text'} name="firstName" className="form-input"></input>
        <p>Last Name</p>
        <input type={'text'} name="lastName" className="form-input"></input>
        <p>Birthday</p>
        <input type="date" name="bday" className="form-input"></input>
        <p>Email</p>
        <input type={'email'} name="email" className="form-input"></input>
        <p>Password</p>
        <input type={'password'} name="password" className="form-input"></input>
        <div className="buttons">
          <Link to="/login" className="loginhref">
            <button className="back-btn">Back to Login</button>
          </Link>
          <button type="submit" className="next-btn">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBasicInfo;
