import React, {useState, useEffect} from "react";
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
// import schema from '../validation/formSchema';
import * as yup from 'yup';
import PizzaForm from "./PizzaForm";
import pizzaSchema from "./PizzaShema";
import Orders from "./orders";


  const initialForm = {
    'name-input': '',
    'size-dropdown': null,
    'pepperoni': false,
    'sausage': false,
    'onions': false,
    'greenPeppers': false,
    // toppings: [],
    'special-text': '',
  }
  const initialErrors = {
    name: '',
    size: '',
  }
  const initialOrders = [];
  const initialDisable = true;

const App = () => {
  const [formValues, setFormValues] = useState(initialForm)
  const [orders, setOrders] = useState(initialOrders)
  const [disabled, setDisabled] = useState(initialDisable)
  const [formErrors, setFormErrors] = useState(initialErrors)

  const postOrder = newOrder => {
    axios.post('https://reqres.in/api/orders', newOrder)
      .then(resp => {
        setOrders([ resp.data, ...orders ]);
      }).catch(err => console.error(err))
      .finally(() => {
        setFormValues(initialForm)
        
      })
  }

  const validate = (name, value) => {
    yup.reach(pizzaSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newOrder = {
      'name-input': formValues['name-input'].trim(),
      'size-dropdown': formValues['size-dropdown'],
      'special-text': formValues['special-text'],
      toppings: [
        'pepperoni', 
        'sausage', 
        'onions', 
        'greenPeppers'
      ]
      .filter(topping => !!formValues[topping]),
    }
    postOrder(newOrder);
  }

  useEffect(() => {
    pizzaSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <>
    <header>
      <h1>Lambda Eats</h1>
      <p>Buy some gotdang 'za</p>
    </header>
      <nav>
        <Route exact path='/'>
          <Link to={`/pizza`}>
            <button id='order-pizza'>Order Now</button>
          </Link>
        </Route>
      </nav>
      <div>
        <Route path='/pizza'>
          <PizzaForm 
            disabled={disabled} 
            change={inputChange}
            submit={formSubmit}
            values={formValues}
            errors={formErrors}
          />
        </Route>
      </div>
      <div>
        <Orders orders={orders}/>
      </div>
      {/* <img src='/Pizza.jpg'/> */}
    </>
  );
};
export default App;
