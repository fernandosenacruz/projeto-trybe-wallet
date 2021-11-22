import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import getAPI from '../services/getAPI';
import { requestCurrencies, addExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      accExpense: 0,
    };
    this.renderSelect = this.renderSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sumExpense = this.sumExpense.bind(this);
  }

  componentDidMount() {
    const { currencies } = this.props;
    getAPI()
      .then((result) => currencies(result));
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  sumExpense() {
    const { expensesValue } = this.props;
    const ximira = expensesValue
      .reduce((a, b) => a + (Number(b.value) * Number(b.exchangeRate[b.currency].ask)),
        0);
    this.setState({
      accExpense: ximira.toFixed(2),
    });
  }

  handleClick() {
    const { expense } = this.props;
    getAPI()
      .then((exchangeRate) => expense({ ...this.state, exchangeRate }))
      .then(() => this.sumExpense());
  }

  // leo falou que poderia fazer uma função para renderizar uma tag
  renderSelect() {
    const { currenciesTypes } = this.props;
    return (
      <>
        <select name="currency" data-testid="currency-input">
          {currenciesTypes
            .map((cur) => (cur !== 'USDT'
              ? (
                <option
                  key={ cur }
                  value={ cur }
                  data-testid={ cur }
                >
                  { cur }
                </option>)
              : null))}
        </select>
        <select name="method" data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select name="tag" data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte e Saúde</option>
        </select>
      </>
    );
  }

  render() {
    const { userEmail } = this.props;
    const { accExpense } = this.state;
    return (
      <>
        <header data-testid="email-field">
          {userEmail}
          <span data-testid="total-field">{ accExpense }</span>
          <span data-testid="header-currency-field"> BRL</span>
        </header>
        <form>
          <fieldset>
            <label htmlFor="input-expense">
              Despesa
              <input
                data-testid="value-input"
                type="number"
                name="value"
                // value={  }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-description-expense">
              Descrição
              <input
                data-testid="description-input"
                type="text"
                name="description"
                // value={  }
                onChange={ this.handleChange }
              />
            </label>
            { this.renderSelect() }
            <button type="button" onClick={ this.handleClick }>
              Adicionar despesa
            </button>
          </fieldset>
        </form>
      </>
    );
  }
}

Wallet.propTypes = {
  currencies: PropTypes.func.isRequired,
  currenciesTypes: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  expense: PropTypes.func.isRequired,
  expensesValue: PropTypes.shape({
    reduce: PropTypes.func,
  }).isRequired,
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currenciesTypes: state.wallet.currencies,
  expensesValue: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: (responseAPI) => dispatch(requestCurrencies(responseAPI)),
  expense: (state) => dispatch(addExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
