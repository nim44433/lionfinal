import React, { useEffect, useRef, useState } from 'react';
import Animate from '../Components/Animate';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Address } from '../Components/Address';
import Exchanges from '../Components/Exchanges';
import { CiNoWaitingSign } from 'react-icons/ci';

const Airdrop = () => {
  const { selectedExchange } = useUser();
  const [showExchange, setShowExchange] = useState(false);
  const locations = useNavigate();
  const [backLos, setBackLos] = useState(true);

  const [openInfoTwo, setOpenInfoTwo] = useState(false);
  const infoRefTwo = useRef(null);

  const handleClickOutside = (event) => {
    if (infoRefTwo.current && !infoRefTwo.current.contains(event.target)) {
      setOpenInfoTwo(false);
    }
  };

  useEffect(() => {
    if (openInfoTwo) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openInfoTwo]);

  useEffect(() => {
    const handleBackButtonClick = () => {
      locations('/'); // Navigate to /home without refreshing the page
      setBackLos(false);
    };

    if (backLos) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);
    } else {
      window.Telegram.WebApp.BackButton.hide();
      window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
    }

    return () => {
      window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
    };
  }, [backLos, setBackLos, locations]);

  const openExchange = () => {
    setShowExchange(true);
  };

  return (
    <Animate>
      <div className="w-full flex justify-center items-center flex-col space-y-3">
        <div className="w-full flex items-center justify-center pt-8 pb-3">
          <img alt="daxy" src="/prem.svg" className="w-[100px]" />
        </div>

        <div className="w-full flex items-center justify-center pb-1">
          <Address />
        </div>

        <div className="w-full flex items-center justify-center pb-3">
          <button
            onClick={() => setOpenInfoTwo(true)}
            className="w-[74%] font-medium bg-cards px-4 py-[15px] text-primary text-[13px] space-x-1 rounded-full flex items-center justify-center"
          >
            <img src="/withdraw.svg" alt="withdraw" className="w-[16px] h-[16px]" />
            <span>Withdraw to wallet</span>
          </button>
        </div>
      </div>

      <div
        className={`${
          openInfoTwo === true ? 'visible' : 'invisible'
        } fixed top-[-12px] bottom-0 left-0 z-40 right-0 h-[100vh] bg-[#00000042] flex justify-center items-center backdrop-blur-[6px] px-4`}
      >
        <div
          ref={infoRefTwo}
          className={`${
            openInfoTwo === true ? 'opacity-100 mt-0 ease-in duration-300' : 'opacity-0 mt-[100px]'
          } w-full bg-modal !bottom-0 relative rounded-[16px] flex flex-col justify-center p-8`}
        >
          <div className="w-full flex justify-center flex-col items-center space-y-3">
            <div className="w-full items-center justify-center flex flex-col space-y-2">
              <span className="w-[50px] flex items-center">
                <CiNoWaitingSign size={50} className="text-bronze" />
              </span>
              <p className="font-medium">not available yet</p>
            </div>
            <h3 className="font-medium text-center text-[20px] text-[#ffffff] pt-2 pb-2 uppercase">
              LOCKED!
            </h3>
            <p className="pb-6 text-[14px] w-full text-center">
              Withdrawal will be unlocked when token launch and airdrop distributed, make sure you connect your wallet to be eligible for withdrawal!
            </p>
          </div>

          <div className="w-full flex justify-center">
            <button
              onClick={() => setOpenInfoTwo(false)}
              className="bg-btn4 text-[#000] w-fit py-[10px] px-6 flex items-center justify-center text-center rounded-[12px] font-medium text-[16px]"
            >
              Back to wallet
            </button>
          </div>
        </div>
      </div>

      <Exchanges showExchange={showExchange} setShowExchange={setShowExchange} />
    </Animate>
  );
};

export default Airdrop;
