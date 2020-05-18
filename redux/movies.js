import * as ActionTypes from './ActionTypes';

export const movies = (state = {
    isLoading: true,
    errMess: null,
    movies: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_MOVIES:
            return { ...state, isLoading: false, errMess: null, movies: action.payload };

        case ActionTypes.MOVIES_LOADING = 'MOVIES_LOADING':
            return { ...state, isLoading: true, errMess: null, movies: [] }

        case ActionTypes.MOVIES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};