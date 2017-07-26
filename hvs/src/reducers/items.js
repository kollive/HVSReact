export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}


export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;

        default:
            return state;
    }
}

export function message(state = [], action) {
    //debugger;
    switch (action.type) {
        case 'LOGIN_STATUS':
            return action.message;
        default:
            return state;
    }
}


/*
export default (state = {data: [], loading: false}, action = {}) => {
  switch (action.type) {
    case 'RECORDS/FETCH':
    case 'RECORDS/FETCH_FAILED':
      return {
          ...state,
          loading: true,
          data: []
      };
    case 'RECORDS/SET':
      return {
          ...state,
          loading: false,
          data: action.payload
      };
    default:
      return state;
  }
};
*/