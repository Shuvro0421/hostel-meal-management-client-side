import usePackages from "../../components/hooks/usePackages";
import Package from "./Package";


const Packages = () => {
    const [packages] = usePackages()
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 m-5">
            {
                packages.map((packageItem , index) =><Package key={index} packageItem={packageItem}></Package>)
            }
        </div>
    );
};

export default Packages;