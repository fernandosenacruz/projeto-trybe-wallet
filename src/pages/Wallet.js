import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import getAPI from '../services/getAPI';
import { requestCurrencies, ximira } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.renderSelect = this.renderSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    console.log(this.state)
    getAPI()
      .then((result) => ximira({ ...this.state, result }));
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
    const { value } = this.state;
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
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currenciesTypes: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: (responseAPI) => dispatch(requestCurrencies(responseAPI)),
  xibil: (state) => dispatch(ximira(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
