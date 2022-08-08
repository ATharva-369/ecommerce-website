require ('dotenv').config()

const express = require('express')
const App = express()
App.use(express.json())
App.use(express.static('public'))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_ENV)

const storeItems = new Map([
    [1, {priceInPaisa: 36000, name : 'It End With Us'}],
    [2,{priceInPaisa: 30300, name:'Ugly Love'}]
])

App.post('/create-checkout-session',  async (req, res) => {
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            mode : 'payment',
            line_items : req.body.items.map(item=>{
                const storeItem = storeItems.get(item.id);
                return {
                    price_data : {
                        currency : 'inr',
                        product_data:{
                            name : storeItem.name
                        },
                        unit_amount : storeItem.priceInPaisa
                    },
                    quantity : item.quantity
                    }
            }),
            success_url : `${process.env.SERVER_URL}/success.html`,
            cancel_url : `${process.env.SERVER_URL}/cancel.html`
        })
        res.json({url : session.url})
    } 
    catch(e){
       res.status(500).json({error : e.message}) 
    }
})

App.listen(3000)