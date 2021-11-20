// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

cosnt wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case :
      return {
        ...state,
        currencies: action ,
        expenses: action ,
      };  
    default:
      return state;
  }
};

export default wallet;