'use client'

import React, { useState } from 'react';

// 解决 Question 4 中的全局类型定义问题
declare global {
  interface Window {
    ethereum?: any;
  }
}

const CoinFlipForm = () => {
  
  // 状态变量：用于跟踪教材中提到的玩家选择和钱包连接状态
  const [selectedOption, setSelectedOption] = useState('heads');
  const [password, setPassword] = useState('');
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState('Not connected');

  // 修复：为 event 参数添加显式类型以解决 Vercel 编译错误
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // 实现 Bonus Question 1: 连接钱包并切换按钮显示
  const handleConnect = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        setConnected(true);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // 以下为教材 Question 3 要求的合约交互占位逻辑
  const handleMakeBet = () => {
    console.log("Making bet with selection:", selectedOption);
    // 逻辑：将密码作为 nonce, 调用 getHash 并执行 makeBet
  };

  const handleGuess = () => {
    console.log("Submitting guess...");
    // 逻辑：调用合约的 takeBet 函数
  };

  const handleReveal = () => {
    console.log("Revealing result...");
    // 逻辑：调用合约的 reveal 函数
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10 text-black">
      <h1 className="text-2xl text-center font-bold mb-6">Coin Flip DApp</h1>
      
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Account:</label>
        <p className="text-sm break-all bg-gray-100 p-2 rounded">{account}</p>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Status: No Bet</label>
      </div>

      {/* 玩家选择区域 - 对应合约的 choice 参数 */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Heads or Tails:</label>
        <select value={selectedOption} onChange={handleOptionChange} className="w-full px-4 py-2 border rounded-md">
          <option value="heads">Heads (True)</option>
          <option value="tails">Tails (False)</option>
        </select>
      </div>

      {/* 密码输入：对应合约的 nonce 参数 */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Password (Nonce):</label>
        <input 
          type="text" 
          value={password} 
          onChange={handlePasswordChange} 
          placeholder="Enter a secret number"
          className="w-full px-4 py-2 border rounded-md" 
        />
      </div>

      <div className="flex flex-col gap-3">
        {!connected ? (
          <button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Connect Wallet
          </button>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            <button onClick={handleMakeBet} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Make Bet (Player 1)
            </button>
            <button onClick={handleGuess} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Guess (Player 2)
            </button>
            <button onClick={handleReveal} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              Reveal Result
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinFlipForm;