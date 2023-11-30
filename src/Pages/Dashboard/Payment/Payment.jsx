import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import HeaderTitles from "../../HeaderTitles/HeaderTitles";
import { Helmet } from "react-helmet-async";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    return (
        <div>
            <Helmet>
                <title>Meal Management | Payment</title>
            </Helmet>
            <HeaderTitles heading={'Payment'}></HeaderTitles>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;