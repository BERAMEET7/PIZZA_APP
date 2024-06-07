let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter =document.getElementById('cartCounter');
import { initAdmin } from './admin'

import { Notyf } from "notyf";

const notyf = new Notyf({
    duration: 1000,
    position: {
      x: 'right',
      y: 'top',
    },
    types: [
      {
        type: 'warning',
        background: 'orange',
        icon: {
          className: 'material-icons',
          tagName: 'i',
          text: 'warning'
        }
      },
      {
        type: 'error',
        background: 'indianred',
        duration: 2000,
        dismissible: true
      }
    ]
  });

// function updateCart(pizza){
//     axios.post('/update-cart',pizza).then(res =>{
//         console.log(res);
//     })
// }
function updateCart(pizza) {
    fetch('/update-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pizza)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
       let count = data.cart.totalQty;
       cartCounter.innerHTML=count;
       notyf.success('Item added to cart!'); 
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        notyf.error('Failed to add item to cart!');
    });
}



addToCart.forEach((btn) => {
    btn.addEventListener('click' , (e)=>{
        let pizza =JSON.parse(btn.dataset.pizza)
        updateCart(pizza);
    })
});

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}


initAdmin();