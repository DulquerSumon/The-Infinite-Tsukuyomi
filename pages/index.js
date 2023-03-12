/* eslint-disable operator-linebreak */
import Head from "next/head";
import { useContext } from "react";
import { Web3Context } from "../context/contextProvider";

const Home = () => {
  const { winner, status, entranceFee, enter } = useContext(Web3Context);

  return (
    <>
      <Head>
        <title>The Infinite Tsukuyomi</title>
        <meta name="description" content="WEB3  Lottery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="text-white flex flex-col pt-2  justify-around space-y-20 items-center">
        <div className="flex flex-row space-x-52 lg:space-x-60">
          <div className="text-red-900 ml-10 font-bold font-serif">
            Current Entrance Fee: {entranceFee}
          </div>
          <div className="font-bold font-serif mr-10 text-red-900">
            Status:{" "}
            {status && status.toString() === "0" ? "OPEN" : "CALCULATING"}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-72 h-60 bg-blue-600 hover:bg-blue-700 text-center rounded-2xl shadow-xl">
          <p className="text-center font-serif text-purple-400">
            Don&apos;t fall into Infinite dreams about winning Jackpots
          </p>
          <button
            type="button"
            onClick={() => enter()}
            className="w-36 h-40 text-center font-serif font-extrabold rounded-xl shadow-2xl hover:bg-slate-500 bg-slate-400"
          >
            Participate & Break The Infinite Tsukuyomi
          </button>
          <p className="font-bold text-pink-500">Make it Real...</p>
        </div>
        <div className="text-red-900 font-serif font-bold">
          The Most Recent Winner is:{" "}
          {winner &&
            `${winner.slice(0, 13)}...${winner.slice(winner.length - 13)}`}
        </div>
      </div>
    </>
  );
};
export default Home;
