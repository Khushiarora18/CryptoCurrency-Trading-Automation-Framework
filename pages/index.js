import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ethers } from "ethers";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import {
  Header,
  Footer,
  Loader,
  Login,
  MovingSubmenu,
  Preloader,
  Search,
  SideBar,
  Signup,
  useTimeout,
  AddNetwork,
  AddTokenPair,
  Home,
  Networks,
  Price,
  Profile,
  Setting,
  TopExchangeTokens,
  TradeTokens,
  Trading,
} from "../components/index";

import { CONTEXT } from "../context/context";

const index = () => {
  const {
    TRADING_BOT,
    topTokens,
    trading,
    tradingCount,
    length,
    setTradingCount,
    setLoader,
    loader,
  } = useContext(CONTEXT);

  //STATE VARIABLE
  const [activeComponent, setActiveComponent] = useState("Home");
  const [membershipType, setMembershipType] = useState("Premium");
  const [authBackEndID, setAuthBackEndID] = useState("");
  const [networks, setNetworks] = useState({});
  const [networkName, setNetworkName] = useState();

  //NOTIFICATION
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });

  useEffect(() => {
    const userBackEndID = localStorage.getItem("CryptoBot_Backend");
    const auth = localStorage.getItem("CryptoAUT_TOKEN");
    const network = JSON.parse(localStorage.getItem("activeNetwork"));

    setNetworks(network);
    setNetworkName(network?.networkName);

    if (auth == null || userBackEndID == null) {
      setActiveComponent("Signup");
    } else {
      setActiveComponent("Home");
      setAuthBackEndID(userBackEndID);
    }
  }, []);

  //BUY MEMBERSHIP FUNCTION
  const buyMemberShip = async (memberType, price) => {
    notifySuccess("Transaction is processing..");
    setMembershipType(memberType);
    setLoader(true);

    const provider = new ethers.JsonRpcProvider(
      `https://rpc.ankr.com/polygon_amoy`
    );
    const wallet = new ethers.Wallet(`0x${networks?.privateKey}`, provider);
    const amountToSend = ethers.parseUnits(price.toString(), "ether");

    const transaction = {
      to: "0xF0D3ec3727421Df93EafB5d75aAC3CEE4774Da67", //wallet address
      value: amountToSend,
    };

    //SIGN THE TRANSACTION
    const signedTransaction = await wallet.sendTransaction(transaction);

    const receipt = await signedTransaction.wait();

    console.log(receipt);
    try {
      if (receipt) {
        const res = await axios({
          method: "PATCH",
          url: "/api/v1/user/buyMembership",
          withCredentials: true,
          data: {
            membershipType: memberType,
            userID: authBackEndID,
          },
        });

        if (res.statusText == "OK") {
          localStorage.setItem("USER_MEMBERSHIP", memberType);
          notifySuccess("Payment Successful! Welcome to Pro Membership");
          setLoader(false);
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
      notifyError("Transaction Failed!");
    }
  };

  return (
    <div>
      <MovingSubmenu />
      <Preloader />
      {activeComponent == "Signup" ? (
        <Signup
          axios={axios}
          setActiveComponent={setActiveComponent}
          notifyError={notifyError}
          notifySuccess={notifySuccess}
        />
      ) : (
        <div className="techwave_fn_wrapper">
          <div className="techwave_fn_wrap">
            <Search />
            <Header
              networkName={networkName}
              setActiveComponent={setActiveComponent}
            />
            <SideBar setActiveComponent={setActiveComponent} />
            {
              activeComponent == "Home" ? (
                <Home />
              ) : activeComponent == "Trade Tokens" ? (
                <TradeTokens />
              ) : activeComponent == "Top Exchange Tokens" ? (
                <TopExchangeTokens />
              ) : activeComponent == "Networks" ? (
                <Networks
                  networkName={networkName}
                  setNetworkName={setNetworkName}
                  notifyError={notifyError}
                  notifySuccess={notifySuccess}
                />
              ) : activeComponent == "Add Network" ? (
                <AddNetwork axios={axios} />
              ) : activeComponent == "Trading" ? (
                <Trading
                  axios={axios}
                  trading={trading}
                  tradingCount={tradingCount}
                  length={length}
                  setTradingCount={setTradingCount}
                  setActiveComponent={setActiveComponent}
                  notifySuccess={notifySuccess}
                />
              ) : activeComponent == "Pricing" ? (
                <Price
                  buyMemberShip={buyMemberShip}
                  setMembershipType={setMembershipType}
                />
              ) : activeComponent == "Profile" ? (
                <Profile
                  setActiveComponent={setActiveComponent}
                  notifyError={notifyError}
                  notifySuccess={notifySuccess}
                />
              ) : activeComponent == "Setting" ? (
                <Setting
                  notifyError={notifyError}
                  notifySuccess={notifySuccess}
                  axios={axios}
                />
              ) : activeComponent == "Add Token Pair" ? (
                <AddTokenPair />
              ) : (
                ""
              ) /* Add a default case for the ternary operator */
            }
          </div>
        </div>
      )}

      {activeComponent == "Login" ? (
        <Login
          setActiveComponent={setActiveComponent}
          axios={axios}
          notifyError={notifyError}
          notifySuccess={notifySuccess}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default index;
