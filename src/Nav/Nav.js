// import grass from "../assets/svg/grass.svg";
// import Button from "@material-ui/core/Button";
// import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import StyledButton from "../Components/Button/Button";
import Grass from "../assets/svg/grass.svg";
import "./Nav.css";
const Nav = () => {

//   const styles = {
//     color:"white"
// }

  return (
    <div className="container">
      <div className="logo">
        <img className="grassIcon" alt="Application logo showing few grass strands" src={Grass}></img>
      </div>
      <div className="navLinks">
        <ul className="navItemsList">
          <Link className="linksRouter" to="/"><li className="navListItem">Home</li></Link>
          <li className="navListItem">Contact us</li>
          <li className="navListItem">About us</li>
        </ul>
        <div className="buttonKeeper">
          <Link to="/board" className="linksRouter" >
            <StyledButton className="button b" variant="outlined">
              Start
            </StyledButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
