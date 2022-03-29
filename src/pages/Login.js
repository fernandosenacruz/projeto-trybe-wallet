import PropTypes from 'prop-types';
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
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
        <Box
          mt={2}
          mb={3}
          component="form"
          sx={{
            '& .MuiTextField-root': { 
              display: 'flex',
              m: 3,
              width: { xs: 'small', md: 'medium'},
              justifyContent: 'center' },
          }}
          noValidate
          autoComplete="off"
      >
        <label htmlFor="input-email">
          <TextField
            error
            name="email"
            type="email"
            id="outlined-error"
            label="Email"
            value={email}
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-password">
          <TextField
            error
            name="password"
            type="password"
            id="filled-error"
            label="Password"
            value={password}
            variant="filled"
            onChange={ this.handleChange }
          />
        </label>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined"
            type="button"
            disabled={ !isValid }
            onClick={ this.handleClick }
            sx={{ alignItems: 'center' }}
            >
              Entrar</Button>
        </Stack>                
      </Box>
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
