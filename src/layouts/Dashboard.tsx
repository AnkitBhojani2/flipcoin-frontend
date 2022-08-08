import React from "react";
import myGif from "../assets/images/myGif.gif";

const Dashboard = () => {
  return (
    <div className="main-dash">
      <div className="row flex flex-col lg:flex-row">
        <div className="col-2 flex justify-center items-center lg:justify-start">
          {/* <div className="gif">
            <img src={myGif} alt="" className="myGif w-56 lg:w-40" />
          </div> */}
        </div>

        <div className="col-5 mt-10 inner-dash">
          <div className="flex flex-col">
            {/* head and tail  */}
            <div className="head-tail flex flex-col md:flex-row justify-between gap-7">
              <button>TAILS</button>
              <button>HEADS</button>
            </div>

            {/* amounts  */}
            <div className="amounts grid grid-cols-3 gap-4 mt-3 ">
              <button>0.05 sol</button>
              <button>0.25 sol</button>
              <button>0.5 sol</button>
              <button>1 sol</button>
              <button>2 sol</button>
            </div>
          </div>

          <div className="flex justify-center mt-4 ">
            <button className="p-3 dig-btn">Double or Nothing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
