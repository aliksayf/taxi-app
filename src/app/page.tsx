'use client'

import { NextPage } from 'next'
import Home from './components/screens/home/Home'
import { Provider } from 'react-redux';
import { store } from './store/store';

const HomePage: NextPage = () => {
  return (
  <Provider store={store}>
    <Home/>
  </Provider>
)}

export default HomePage;
