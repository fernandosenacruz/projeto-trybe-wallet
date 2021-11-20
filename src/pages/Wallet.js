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
        <form>
          <fieldset>
            <label htmlFor="input-expense">
              Despesa
              <input
                data-testid="value-input"
                type="number"
                name="expense"
                value={  }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-description-expense">
              Descrição
              <input
                data-testid="description-input"
                type="text"
                name="description"
                value={  }
                onChange={ }
              />
            </label>
            <select
              name="currency"
              data-testid="currency-input"
            >
              <option>xelo</option>
            </select>
            <select
              name="method"
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
            <select
              name="tag"
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte' e 'Saúde</option>
            </select>
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          </fieldset>
        </form>
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
