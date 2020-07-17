import axios from 'axios';
//axios is for making AJAX requests
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => { //It is an async piece of code
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data});
  };
