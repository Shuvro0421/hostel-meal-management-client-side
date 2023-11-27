import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePackages from "../../components/hooks/usePackages";
import HeaderTitles from "../HeaderTitles/HeaderTitles";
import PackageCheckOut from "./PackageCheckOut";

const PackagePayment = () => {
  // TODO: add publishable key
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  const [packageBox, setPackageBox] = useState(null); // Initialize as null
  const { id } = useParams();
  const [packages] = usePackages();

  useEffect(() => {
    const findPackages = packages.find(
      (singlePackage) => singlePackage._id === id
    );
    setPackageBox(findPackages);
  }, [id, packages]);

  // Check if packageBox is null or undefined before destructure
  if (!packageBox) {
    return <div className="text-orange-500">Loading...</div>
  }

  return (
    <div>
      <HeaderTitles heading={"Package Pay"}></HeaderTitles>
      <Elements stripe={stripePromise}>
        <PackageCheckOut packageBox={packageBox}></PackageCheckOut>
      </Elements>
    </div>
  );
};

export default PackagePayment;
