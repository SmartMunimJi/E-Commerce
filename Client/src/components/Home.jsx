import {Link} from "react-router";

const Home = () =>{
    return (
        <div>
            <h1>
                E-commerce web 
            </h1>
            <p>
                purchase from all categories of electronics on just a click 
            </p>
            <Link className="btn btn-primary" to="/login">
                    Login Here
            </Link>
        </div>
    );
};

export default Home;