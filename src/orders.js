import react from "react";


export default function Orders(props){
    const { orders } = props

    if(orders.length < 0){
        return (
            <p>'No orders yet!'</p>
            )
    }


    return (
        orders.map(ord =>{
            return(
                <div>
                    <p> {ord['name-input']}'s Order:</p>
                    <p> Size: {ord['size-dropdown']}</p>
                    <p> Toppings: {ord.toppings.length > 0 ? ord.toppings.join(', ') : 'none, you weirdo'}</p>
                    <p> Special instructions: {ord['special-text'].length > 0 ? ord['special-text'] : 'None'}</p>
                </div>
            )
        })
    )
}