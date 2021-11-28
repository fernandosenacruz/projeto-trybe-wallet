import getAPI from '../services/getAPI';

// Coloque aqui suas actions
export const INPUT_EMAIL = 'INPUT_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DESCRIPTION_EXPENSE = 'DESCRIPTION_EXPENSE';
export const FETCH_EXCHANGE_RATES = 'FETCH_EXCHANGE_RATES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const inputEmail = (payload) => ({
  type: INPUT_EMAIL,
  payload,
});

export const requestCurrencies = (payload) => ({
  type: FETCH_EXCHANGE_RATES,
  payload,
});

export const saveExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const addExpense = (payload) => (dispath) => {
  getAPI().then((exchangeRates) => {
    payload.exchangeRates = exchangeRates;
    dispath(saveExpense(payload));
  });
};

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});
