import axios from 'axios';
//axios is for making AJAX requests
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => { //It is an async piece of code
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data});
  };

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
  
};
