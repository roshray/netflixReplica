import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/counter/userSlice'
import db from '../firebase'
import './PlansScreen.css'

function PlansScreen() {

    const [products, setProducts] = useState([])
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null)

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach( async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_perios_start: subscription.data().current_period_start.seconds
                })
            })
        })
    }, [user.uid])

    useEffect(() => {
        db.collection('products')
        .where('active', '==', true)
        .get()
        .then(querySnapshot => {
            const products = {}
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data()
                const priceSnap = await productDoc.ref.collection('prices').get()
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            })
            setProducts(products)
        })
    }, [])

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers').doc(user.uid).collection('checkout_sessions').add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        })

        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data()

            if(error){
                //Show error to customer
                alert(`An error occured: ${error.message}`)
            }

            if(sessionId) {
                //we have a session, let's redirect to checkout
                //init Stripe

                const stripe = await loadStripe("pk_test_51K3MpCSE2kv5bbd2Dw9rt9XVQnGaEt3HVaNwIjGykkblZwehNZF4lKTwXjI4SJjXWcGHkMLg9WfJxHzwpJ1b5oTu00wWja0DsZ")
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }   
    
    return(
        <div className='plansScreen'>

            <br />
            
            {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}

            {Object.entries(products).map(([productId, productData]) => {
                //add some logic to cehck if users subscription is active

                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)

                return (
                    <div key={productId} className={`${isCurrentPackage && "plansScreen__plan--disabled"} plansScreen__plan`}>
                        <div className='plansScreen__info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>  

                        <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>{isCurrentPackage ? 'Current Package' : 'Subscribe'}</button> 
                    </div>
                )
            })}
        </div>
    )
}

export default PlansScreen
