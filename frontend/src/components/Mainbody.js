import React from "react";
function Mainbody() {
  return (
    <div className="container background-container">
      <div className="robotText">
        <h1 className="title">Robot Reservation<br />System</h1>
        <h6><span>Automation is the competitive adventage you need. Reserve any kind of university robots and information systems, expand your knowladge, make your daily taskes easier
          and broaden your horizons.</span></h6>
        <hr className="new2" />
        <h6><span>Learn more how to reserve and use them</span></h6>
        <a href="https://www.universal-robots.com/"><button id="learnMore">Learn more</button></a>
      </div>
      <img className="robotImg" src="https://media.giphy.com/media/PgKWL5QUrpwO5KqtAX/giphy.gif" alt="robot" />
    </div>
  );
}
export default Mainbody;
