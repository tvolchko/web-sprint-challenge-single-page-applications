import react from 'react'


export default function PizzaForm(props){
    const { 
        values,
        submit,
        change,
        disabled,
        errors
     } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
      }
    
    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
      }

    return (
        <div>
            <p>{errors['name-input']}</p>
            <form id='pizza-form' onSubmit={onSubmit}>
                <label>Your Name
                    <input
                        value={values['name-input']}
                        onChange={onChange}
                        name='name-input'
                        type='text'
                        id='name-input'
                    />
                </label>
                <label> Size
                    <select 
                        name='size-dropdown' 
                        onChange={onChange} 
                        value={values['size-dropdrown']}
                        id='size-dropdown'
                    > 
                        <option value={null}>- Select a Size -</option>
                        <option value='small'> Small </option>
                        <option value='medium'> Medium </option>
                        <option value='large'> Large </option>
                    </select>
                </label>
                <div>
                    <h4>Toppings</h4>
                <label> Pepperoni
                    <input
                        type='checkbox'
                        name='pepperoni'
                        checked={values.pepperoni}
                        onChange={onChange}
                    />
                </label>
                <label> Sausage
                    <input
                        type='checkbox'
                        name='sausage'
                        checked={values.sausage}
                        onChange={onChange}
                    />
                </label>
                <label> Onions
                    <input
                        type='checkbox'
                        name='onions'
                        checked={values.onions}
                        onChange={onChange}
                    />
                </label>
                <label> Green Peppers
                    <input
                        type='checkbox'
                        name='greenPeppers'
                        checked={values.greenPeppers}
                        onChange={onChange}
                    />
                </label>
                </div>
                <label> Special Requests
                    <input
                        value={values['special-text']}
                        onChange={onChange}
                        name='special-text'
                        type='text'
                        id='special-text'
                    />
                </label>
                <button id='order-button' disabled={disabled}> Submit Order </button>



            </form>


        </div>




    )


}