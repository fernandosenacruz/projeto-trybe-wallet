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

  // Gabi e Henrique ajudaram com a lógica do bracket notation para pegar o b.currency
  sumExpense() {
    const { expensesValue } = this.props;
    const ximira = expensesValue
      .reduce((a, b) => a + (Number(b.value) * Number(b.exchangeRates[b.currency].ask)),
        0);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      accExpense: ximira.toFixed(2),
    });
  }

  handleClick() {
    const { expense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    getAPI()
      .then((exchangeRates) => expense({
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates }))
      .then(() => this.sumExpense());
  }

  // leo falou que poderia fazer uma função para renderizar uma tag
  renderSelect() {
    const { currenciesTypes, id } = this.props;
    return (
      <>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            data-testid="currency-input"
            id="currency"
            onChange={ this.handleChange }
          >
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
        </label>
        <select
          name="method"
          data-testid="method-input"
          id={ id }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          id={ id }
          onChange={ this.handleChange }
        >
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
    const { accExpense, value, description } = this.state;
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
                value={ value }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-description-expense">
              Descrição
              <input
                data-testid="description-input"
                type="text"
                name="description"
                value={ description }
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
  id: PropTypes.number.isRequired,
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
