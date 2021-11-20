import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      // currencies: [],
      // expenses: [],
    };
  }

  componentDidMount() {}

  render() {
    const { userEmail } = this.props;
    return (
      <>
        <header data-testid="email-field">
          {userEmail}
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        {/* <select name="selecti">
          <option
            data-testid="header-currency-field"
            value={}
          >
            ximira
          </option>
        </select> */}
      </>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

// const mapDispatchToProps = (dispatch) => ({
//   xibil: (state) => dispatch(algumaFuncao(state)),
// });

export default connect(mapStateToProps)(Wallet);
