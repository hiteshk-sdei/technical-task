import { loadStripe } from '@stripe/stripe-js'

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      'pk_test_51NM3mWSJBi2Pph3i9MqhhZl9nVeNcKfxLKqJFbGXvF0NynJQhiTz2UUf9SFKGyzm5RDYavCnBDi4bGmqi6rVdt9j00nobPRuOm',
    )
  }
  return stripePromise
}

export default getStripe
