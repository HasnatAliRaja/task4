import "./Home.css";
import Illustration from "../assets/images/illustration.jpg";
import StyledButton from "../Components/Button/Button";
const Home = () => {
  return (
    <div className="homeContainer">
      <div className="gridContainer">
        <div className="leftSide">
          <div className="leftSideContent">
            <h1 className="textH1">
              <span className="textOrange">Design</span> and{" "}
              <span className="textPurple">plan</span> with a{" "}
              <span className="textWhite">collaborative</span> effort
            </h1>
            <span className="descriptionText">
              Create a board to start task assginment and planning which enables
              you to make a schedule.
            </span>
            <div className="spacer"></div>
            <StyledButton>Start</StyledButton>
          </div>
          <div className="orbBig"></div>
          <div className="orbMedium"></div>
          <div className="orbSmall"></div>
          <div className="bottomOrbOrange"></div>
          <div className="bottomOrbPurple"></div>
          <div className="bottomOrbTiny"></div>
          <div className="topOrbTiny"></div>
        </div>
        <div className="lineRight"></div>

        <div className="rightSide">
          <img
            className="illustration"
            alt="An Illustration showing individuals brainstorming around a table."
            src={Illustration}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
