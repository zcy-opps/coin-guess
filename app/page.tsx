'use client'; // 必须加上这一行，因为我们要使用 state 和点击事件

import { useState } from 'react';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");

  // 连接钱包的逻辑 (Bonus Question 1)
  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error("连接失败", err);
      }
    } else {
      alert("请安装 MetaMask！");
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Coin Guess DApp</h1>

      {!walletAddress ? (
        // 初始状态：只显示连接按钮
        <button onClick={connectWallet} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Connect Wallet
        </button>
      ) : (
        // 连接成功后显示的内容 (Question 3 & 4)
        <div>
          <p>已连接账户: <strong>{walletAddress}</strong></p>
          <hr />
          
          {/* 玩家 1 区域: Make Bet */}
          <section>
            <h2>Player 1: Make a Bet</h2>
            <input type="number" placeholder="金额 (Ether)" />
            <button>Commit Bet (Hash)</button>
          </section>

          {/* 玩家 2 区域: Take Bet */}
          <section style={{ marginTop: '20px' }}>
            <h2>Player 2: Take the Bet</h2>
            <button>Guess Heads</button>
            <button>Guess Tails</button>
          </section>
        </div>
      )}
    </main>
  );
}