import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header";


function Landing() {
  // Creating a function to connect user's wallet
  const [user, setUser] = useState()
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      // Checking if user have Metamask installed
      if (!ethereum) {
        // If user doesn't have Metamask installed, throw an error
        alert("Please install MetaMask");
        return;
      }

      // If user has Metamask installed, connect to the user's wallet
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // At last save the user's wallet address in browser's local storage
      localStorage.setItem("walletAddress", accounts[0]);
      setUser(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    var x = localStorage.getItem("walletAddress");
    setUser(x);
    if (user) {
      window.location.href = "/home"
    }
    
  }, [user])  
  

  return (
    <>
      {/* Creating a hero component with black background and centering everything in the screen */}
      <section className="relative bg-[url('https://repository-images.githubusercontent.com/299409710/b42f7780-0fe1-11eb-8460-e459acd20fb4')] flex flex-col h-full justify-center items-center">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="text-center pb-12 md:pb-16">
              <h1
                className="text-5xl text-white md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                Unlimited movies, TV shows, and more.{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-400">
                  Decentralized
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p
                  className="text-xl text-gray-400 mb-8"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  Ready to watch? Click connectWallet to create or restart your
                  membership,built on top of Polygon network, allow users to
                  watch videos, without worrying about their
                  privacy.
                </p>
                <button
                  className="items-center  bg-white rounded-full font-medium  p-4 shadow-lg"
                  onClick={() => {
                    // Calling the connectWallet function when user clicks on the button
                    connectWallet();
                  }}
                >
                  <span>Connect wallet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Landing;
