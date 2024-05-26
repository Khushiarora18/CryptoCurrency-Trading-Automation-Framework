import React from "react";

//INTERNAL IMPORT

import { Footer } from "../index";
const Home = () => {
  return (
    <div className="techwave_fn_content">
      <div className="techwave_fn_page">
        <div className="techwave_fn_home">
          <div className="section_home">
            <div className="section_left">
              <div className="techwave_fn_title_holder">
                <h1 className="title">Automate Your Crypto Trading</h1>

                <p className="desc">
                  Crypto Trading Financial Bot For Buying and Sell Crypto
                </p>
              </div>

              <div className="techwave_fn_interactive_list">
                <ul>
                  <li>
                    <div className="item">
                      <a>
                        <span className="icon">
                          <img
                            src="img/lighticon/light-19.png"
                            className="fn__svg"
                            alt=""
                          />
                        </span>
                        <h2 className="title"> Buy Any Token </h2>
                        <p className="desc">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Minima cupiditate labore beatae, quas natus
                          pariatur ex quisquam corrupti aliquam, asperiores ut
                          similique molestias maxime laborum laboriosam quos,
                          praesentium quam dignissimos.
                        </p>
                        <span className="arrow">
                          <img
                            src="img/lighticon/light-22.png"
                            className="fn__svg"
                            alt=""
                          />
                        </span>
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="item">
                      <a>
                        <span className="icon">
                          <img
                            src="img/lighticon/light-16.png"
                            className="fn__svg"
                            alt=""
                          />
                        </span>
                        <h2 className="title"> Sell Any Token </h2>
                        <p className="desc">
                          {" "}
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Eveniet cupiditate accusamus recusandae expedita
                          impedit accusantium omnis beatae voluptates, harum
                          numquam magnam nihil excepturi iure quis eligendi.
                          Sunt eveniet eius necessitatibus.
                        </p>
                        <span className="arrow">
                          <img
                            src="img/lighticon/light-22.png"
                            className="fn__svg"
                            alt=""
                          />
                        </span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="section_right">
              <div className="company_info">
                <img src="img/light-logo.png" alt="" />
                <p className="fn__animated_text"> lorem okjhgvcx oiuhygfd </p>
                <hr />
                <div className="fn__members">
                  <div className="active item">
                    <span className="circle"></span>
                    <span className="text">1111111 Online</span>
                  </div>
                  <div className="item">
                    <span className="circle"></span>
                    <span className="text">23645833 Members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
