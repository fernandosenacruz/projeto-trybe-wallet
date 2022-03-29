import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { inputEmail } from '../actions';
import Header from '../components/Header';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    },
    () => { this.validate(); });
  }

  validate() {
    const { password, email } = this.state;
    const MAGIC_NUMBER = 6;
    const REGEX = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/; // full stack overflow :) https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const VALID_EMAIL = REGEX.test(String(email));
    const VALID_PASSWORD = password.length >= MAGIC_NUMBER;
    if (VALID_PASSWORD && VALID_EMAIL) {
      this.setState({
        isValid: true,
      });
    } else {
      this.setState({
        isValid: false,
      });
    }
  }

  handleClick() {
    const { history, getEmail } = this.props;
    const { email } = this.state;
    getEmail(email);
    history.push('./carteira');
  }

  render() {
    const { email, password, isValid } = this.state;
    return (
      <>
        <Header/>      
        <form>
          <fieldset>
            <legend>Login</legend>
            <label htmlFor="input-email">
              Email:
              <input
                type="email"
                name="email"
                value={ email }
                data-testid="email-input"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-password">
              Password:
              <input
                type="password"
                name="password"
                value={ password }
                data-testid="password-input"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              disabled={ !isValid }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </fieldset>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (state) => dispatch(inputEmail(state)),
});

Login.propTypes = {
  getEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
