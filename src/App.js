import React, { useState, useEffect, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Create a style element for plain CSS
const styles = `
  :root {
    --primary-color: #334d87;
    --primary-dark: #1a3366;
    --secondary-color: #468f29;
    --secondary-dark: #2e6819;
    --accent-color: #9c27b0;
    --accent-dark: #7b1fa2;
    --success-color: #4caf50;
    --danger-color: #f44336;
    --warning-color: #ff9800;
    --gray-100: #f5f5f5;
    --gray-200: #eeeeee;
    --gray-300: #e0e0e0;
    --gray-700: #616161;
    --gray-800: #424242;
    --gray-900: #212121;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --radius: 8px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #f0f2f5;
  }

  .app-container {
    max-width: 1200px;
    margin: 20px auto;
    background-color: white;
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
  }

  .header {
    background: linear-gradient(to right, var(--primary-color), var(--primary-dark));
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .header h1 {
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 1.8rem;
  }

  .header h1 span {
    margin-right: 10px;
    font-size: 24px;
  }

  .btn-group {
    display: flex;
    gap: 8px;
  }

  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .btn-primary {
    background-color: var(--primary-color);
  }

  .btn-primary:hover {
    background-color: var(--primary-dark);
  }

  .btn-danger {
    background-color: var(--danger-color);
  }

  .btn-danger:hover {
    background-color: #d32f2f;
  }

  .btn-success {
    background-color: var(--success-color);
  }

  .btn-success:hover {
    background-color: #388e3c;
  }

  .btn-warning {
    background-color: var(--warning-color);
  }

  .btn-warning:hover {
    background-color: #f57c00;
  }

  .btn-accent {
    background-color: var(--accent-color);
  }

  .btn-accent:hover {
    background-color: var(--accent-dark);
  }

  .main-content {
    padding: 20px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .card {
    border: 1px solid var(--gray-300);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    margin-bottom: 20px;
  }

  .card-header {
    padding: 15px;
    font-weight: bold;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }

  .card-header-icon {
    margin-right: 8px;
    font-size: 1.2em;
  }

  .primary-header {
    background: linear-gradient(to right, var(--primary-color), var(--primary-dark));
    color: white;
  }

  .secondary-header {
    background: linear-gradient(to right, var(--secondary-color), var(--secondary-dark));
    color: white;
  }

  .accent-header {
    background: linear-gradient(to right, var(--accent-color), var(--accent-dark));
    color: white;
  }

  .warning-header {
    background: linear-gradient(to right, var(--warning-color), #f57c00);
    color: white;
  }

  .card-body {
    padding: 15px;
  }

  .form-group {
    display: flex;
    gap: 8px;
    margin-bottom: 15px;
  }

  .form-input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid var(--gray-300);
    border-radius: var(--radius);
    font-size: 1rem;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(51, 77, 135, 0.2);
  }

  select.form-input {
    background-color: white;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
  }

  @media (min-width: 768px) {
    .form-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .form-grid .full-width {
    grid-column: 1 / -1;
  }

  .list-item {
    padding: 12px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--gray-300);
    transition: background-color 0.2s;
  }

  .list-item:last-child {
    border-bottom: none;
  }

  .list-item:hover {
    background-color: var(--gray-100);
  }

  .list-item-name {
    cursor: pointer;
    font-weight: 500;
  }

  .list-item-name:hover {
    color: var(--primary-color);
  }

  .btn-delete {
    background-color: transparent;
    color: var(--danger-color);
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-delete:hover {
    background-color: rgba(244, 67, 54, 0.1);
  }

  .leaderboard-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    border-bottom: 1px solid var(--gray-300);
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .leaderboard-item:hover {
    background-color: var(--gray-100);
  }

  .leaderboard-item:last-child {
    border-bottom: none;
  }

  .leaderboard-rank {
    display: flex;
    align-items: center;
  }

  .rank-number {
    width: 24px;
    height: 24px;
    background-color: var(--gray-200);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 10px;
  }

  .trophy {
    color: #ffc107;
    margin-left: 5px;
  }

  .positive {
    color: var(--success-color);
    font-weight: bold;
  }

  .negative {
    color: var(--danger-color);
    font-weight: bold;
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    padding: 10px;
    background-color: var(--gray-100);
    border-top: 1px solid var(--gray-300);
  }

  .player-stats {
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-bottom: 20px;
  }

  .stat-card {
    padding: 15px;
    border-radius: var(--radius);
    color: white;
  }

  .stat-card-money {
    background: linear-gradient(to bottom right, #4caf50, #388e3c);
  }

  .stat-card-games {
    background: linear-gradient(to bottom right, #2196f3, #1976d2);
  }

  .stat-card-wins {
    background: linear-gradient(to bottom right, #9c27b0, #7b1fa2);
  }

  .stat-label {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 5px;
  }

  .history-title {
    margin-top: 25px;
    margin-bottom: 15px;
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .history-item {
    background-color: var(--gray-100);
    border: 1px solid var(--gray-300);
    border-radius: var(--radius);
    padding: 15px;
    margin-bottom: 10px;
  }

  .history-timestamp {
    font-size: 0.8rem;
    color: var(--gray-700);
    margin-bottom: 8px;
  }

  .history-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 8px;
  }

  .history-detail {
    font-weight: 500;
  }

  .history-result {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    margin-top: 8px;
  }

  .history-profit {
    background-color: rgba(76, 175, 80, 0.1);
    color: var(--success-color);
  }

  .history-loss {
    background-color: rgba(244, 67, 54, 0.1);
    color: var(--danger-color);
  }

  .history-meta {
    margin-top: 8px;
    font-size: 0.9rem;
    color: var(--gray-700);
  }

  .footer {
    text-align: center;
    padding: 15px;
    color: var(--gray-700);
    border-top: 1px solid var(--gray-300);
    font-size: 0.9rem;
  }

  .empty-state {
    padding: 20px;
    text-align: center;
    color: var(--gray-700);
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: var(--radius);
    position: relative;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    width: 800px;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    background: none;
    border: none;
    color: var(--gray-700);
  }

  .modal-close:hover {
    color: var(--gray-900);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 20px;
  }

  @media (min-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .stats-card {
    background: white;
    border-radius: var(--radius);
    padding: 15px;
    box-shadow: var(--shadow);
  }

  .stats-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: var(--primary-color);
  }

  .stats-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--gray-900);
  }

  .stats-label {
    font-size: 0.9rem;
    color: var(--gray-700);
  }

  .money-amount {
    font-weight: 600;
    color: var(--primary-color);
    margin-right: 10px;
  }

  .form-grid {
    display: grid;
    gap: 15px;
  }

  .form-grid .form-group {
    margin-bottom: 0;
  }

  .form-grid button {
    grid-column: 1 / -1;
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid var(--gray-200);
  }

  .list-item:last-child {
    border-bottom: none;
  }

  .list-item-name {
    cursor: pointer;
    font-weight: 500;
    color: var(--primary-color);
  }

  .list-item-name:hover {
    text-decoration: underline;
  }

  .btn-group {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;

// Helper function to fix floating point errors
const fixFloatingPoint = (number) => {
  // Convert to number in case it's a string, then round to 2 decimal places
  return Math.round((parseFloat(number) + Number.EPSILON) * 100) / 100;
};

// Format currency with two decimal places
const formatCurrency = (amount) => {
  return parseFloat(amount).toFixed(2);
};

const PlayerGraph = ({ player, transactions }) => {
  const data = {
    labels: player.history.map(h => new Date(h.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: player.name,
        data: player.history.map(h => h.netResult),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${player.name}'s Money Over Time`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line options={options} data={data} />;
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const [players, setPlayers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [moneyUpdate, setMoneyUpdate] = useState({
    playerId: "",
    amount: "",
    groupId: "",
    buyIn: "",
    position: "",
    notes: "",
  });
  const [leaderboard, setLeaderboard] = useState([]);
  const [detailedStats, setDetailedStats] = useState(null);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Move updateLeaderboard before useEffect and wrap in useCallback
  const updateLeaderboard = useCallback(() => {
    setLeaderboard([...players].sort((a, b) => b.totalMoney - a.totalMoney));
  }, [players]);

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players");
    const storedGroups = localStorage.getItem("groups");
    if (storedPlayers) setPlayers(JSON.parse(storedPlayers));
    if (storedGroups) setGroups(JSON.parse(storedGroups));
    updateLeaderboard();
  }, [updateLeaderboard]);

  const savePlayers = (updatedPlayers) => {
    // Fix any floating point errors in player data
    const fixedPlayers = updatedPlayers.map(player => ({
      ...player,
      totalMoney: fixFloatingPoint(player.totalMoney),
      history: player.history.map(game => ({
        ...game,
        amount: fixFloatingPoint(game.amount),
        buyIn: fixFloatingPoint(game.buyIn),
        netResult: fixFloatingPoint(game.netResult)
      }))
    }));
    
    setPlayers(fixedPlayers);
    localStorage.setItem("players", JSON.stringify(fixedPlayers));
    updateLeaderboard();
  };

  const saveGroups = (updatedGroups) => {
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  const addPlayer = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    if (
      players.some((p) => p.name.toLowerCase() === trimmedName.toLowerCase())
    ) {
      alert("Player already exists");
      return;
    }
    savePlayers([
      ...players,
      {
        name: trimmedName,
        totalMoney: 0,
        gamesPlayed: 0,
        winCount: 0,
        history: [],
      },
    ]);
  };

  const addGroup = (name) => {
    const newGroup = {
      name,
      members: [],
      totalMoney: 0,
      createdAt: new Date().toISOString(),
    };
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    saveGroups(updatedGroups);
  };

  const deletePlayer = (index) => {
    const newPlayers = players.filter((_, i) => i !== index);
    savePlayers(newPlayers);
  };

  const deleteGroup = (index) => {
    const newGroups = groups.filter((_, i) => i !== index);
    saveGroups(newGroups);
  };

  const saveTransactions = (updatedTransactions) => {
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const handleMoneyUpdate = (e) => {
    e.preventDefault();
    const { playerId, amount, groupId, buyIn, position, notes } = moneyUpdate;
    if (!playerId || !amount || !buyIn) {
      alert("Please select a player, enter an amount, and specify buy-in");
      return;
    }

    // Fix floating point errors by rounding to 2 decimal places
    const parsedAmount = fixFloatingPoint(amount);
    const parsedBuyIn = fixFloatingPoint(buyIn);
    const netResult = fixFloatingPoint(parsedAmount - parsedBuyIn);
    
    const timestamp = new Date().toISOString();
    const gameId = `${groupId}-${timestamp}`;

    const updatedPlayers = players.map((player, index) => {
      if (index === parseInt(playerId)) {
        // Fix potential floating point errors when adding to totalMoney
        const newTotalMoney = fixFloatingPoint(player.totalMoney + netResult);
        
        return {
          ...player,
          totalMoney: newTotalMoney,
          gamesPlayed: player.gamesPlayed + 1,
          winCount: netResult > 0 ? player.winCount + 1 : player.winCount,
          history: [
            ...player.history,
            {
              id: gameId,
              amount: parsedAmount,
              buyIn: parsedBuyIn,
              netResult: netResult,
              position,
              notes,
              timestamp,
            },
          ],
        };
      }
      return player;
    });

    const newTransaction = {
      player: players[parseInt(playerId)].name,
      amount: netResult,
      group: groups[parseInt(groupId)].name,
      date: timestamp,
    };

    setPlayers(updatedPlayers);
    setTransactions([newTransaction, ...transactions]);
    savePlayers(updatedPlayers);
    saveTransactions([newTransaction, ...transactions]);
    updateLeaderboard();

    if (detailedStats && parseInt(playerId) === players.indexOf(detailedStats)) {
      showPlayerStats(updatedPlayers[parseInt(playerId)]);
    }

    setMoneyUpdate({
      playerId: "",
      amount: "",
      groupId: "",
      buyIn: "",
      position: "",
      notes: "",
    });

    e.target.reset();
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const showPlayerStats = (player) => {
    handlePlayerClick(player);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const calculateGroupStats = (group) => {
    const groupTrans = transactions.filter(t => t.group === group.name);
    const totalMoney = groupTrans.reduce((acc, t) => acc + t.amount, 0);
    const memberCount = group.members.length;
    const averageTransaction = totalMoney / (groupTrans.length || 1);

    return {
      totalMoney,
      memberCount,
      transactionCount: groupTrans.length,
      averageTransaction,
      lastTransaction: groupTrans.length > 0
        ? new Date(groupTrans[groupTrans.length - 1].date).toLocaleDateString()
        : 'Never',
    };
  };

  return (
    <>
      <style>{styles}</style>
      
      <div className="app-container">
        <div className="header">
          <h1><span>♠️</span> Poker Stats Tracker</h1>
          <div className="btn-group">
            <button
              className="btn btn-primary"
              onClick={() => {
                const storedPlayers = JSON.parse(
                  localStorage.getItem("players") || "[]"
                );
                const storedGroups = JSON.parse(
                  localStorage.getItem("groups") || "[]"
                );
                setPlayers(storedPlayers);
                setGroups(storedGroups);
                updateLeaderboard();
                setDetailedStats(null);
                setPage(0);
              }}
            >
              Refresh Data
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to reset all data? This cannot be undone."
                  )
                ) {
                  localStorage.setItem("players", "[]");
                  localStorage.setItem("groups", "[]");
                  setPlayers([]);
                  setGroups([]);
                  setDetailedStats(null);
                  setLeaderboard([]);
                  setPage(0);
                  setMoneyUpdate({
                    playerId: "",
                    amount: "",
                    groupId: "",
                    buyIn: "",
                    position: "",
                    notes: "",
                  });
                }
              }}
            >
              Reset Data
            </button>
          </div>
        </div>

        <div className="main-content">
          <div className="grid">
            <div>
              <div className="card">
                <div className="card-header secondary-header">
                  <span className="card-header-icon">👥</span> Add Player
                </div>
                <div className="card-body">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.target.elements.name;
                      addPlayer(input.value);
                      input.value = "";
                    }}
                    className="form-group"
                  >
                    <input
                      name="name"
                      type="text"
                      placeholder="Player Name"
                      className="form-input"
                    />
                    <button type="submit" className="btn btn-success">
                      Add
                    </button>
                  </form>
                </div>
              </div>

              <div className="card">
                <div className="card-header accent-header">
                  <span className="card-header-icon">🎯</span> Players
                </div>
                <div className="card-body">
                  {players.length === 0 ? (
                    <div className="empty-state">No players added yet</div>
                  ) : (
                    players.map((player, index) => (
                      <div key={index} className="list-item">
                        <span
                          className="list-item-name"
                          onClick={() => showPlayerStats(player)}
                        >
                          {player.name}
                        </span>
                        <button
                          onClick={() => deletePlayer(index)}
                          className="btn-delete"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="card">
                <div className="card-header warning-header">
                  <span className="card-header-icon">👥</span> Add Group
                </div>
                <div className="card-body">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.target.elements.name;
                      addGroup(input.value);
                      input.value = "";
                    }}
                    className="form-group"
                  >
                    <input
                      name="name"
                      type="text"
                      placeholder="Group Name"
                      className="form-input"
                    />
                    <button type="submit" className="btn btn-warning">
                      Add
                    </button>
                  </form>
                </div>
              </div>

              <div className="card">
                <div className="card-header accent-header">
                  <span className="card-header-icon">🎲</span> Groups
                </div>
                <div className="card-body">
                  {groups.length === 0 ? (
                    <div className="empty-state">No groups added yet</div>
                  ) : (
                    groups.map((group, index) => (
                      <div key={index} className="list-item">
                        <span className="list-item-name" onClick={() => handleGroupClick(group)}>
                          {group.name}
                        </span>
                        <div className="btn-group">
                          <button className="btn btn-warning" onClick={() => {
                            const memberName = prompt('Enter member name:');
                            if (memberName) {
                              const updatedGroups = [...groups];
                              updatedGroups[index].members.push(memberName);
                              setGroups(updatedGroups);
                              saveGroups(updatedGroups);
                            }
                          }}>
                            Add Member
                          </button>
                          <button className="btn btn-danger" onClick={() => deleteGroup(index)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header primary-header">
              <span className="card-header-icon">💰</span> Update Money
            </div>
            <div className="card-body">
              <form onSubmit={handleMoneyUpdate} className="form-grid">
                <div className="form-group">
                  <select
                    value={moneyUpdate.playerId}
                    onChange={(e) =>
                      setMoneyUpdate({ ...moneyUpdate, playerId: e.target.value })
                    }
                    className="form-input"
                    required
                  >
                    <option value="">Select Player</option>
                    {players.map((player, index) => (
                      <option key={index} value={index}>
                        {player.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <select
                    value={moneyUpdate.groupId}
                    onChange={(e) =>
                      setMoneyUpdate({ ...moneyUpdate, groupId: e.target.value })
                    }
                    className="form-input"
                    required
                  >
                    <option value="">Select Group</option>
                    {groups.map((group, index) => (
                      <option key={index} value={index}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Amount (Cashout)"
                    value={moneyUpdate.amount}
                    onChange={(e) =>
                      setMoneyUpdate({ ...moneyUpdate, amount: e.target.value })
                    }
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Buy-in Amount"
                    value={moneyUpdate.buyIn}
                    onChange={(e) =>
                      setMoneyUpdate({ ...moneyUpdate, buyIn: e.target.value })
                    }
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    placeholder="Position (e.g., 1st, 2nd)"
                    value={moneyUpdate.position}
                    onChange={(e) =>
                      setMoneyUpdate({ ...moneyUpdate, position: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    placeholder="Notes"
                    value={moneyUpdate.notes}
                    onChange={(e) =>
                      setMoneyUpdate({ ...moneyUpdate, notes: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-header accent-header">
              <span className="card-header-icon">🏆</span> Leaderboard
            </div>
            <div className="card-body">
              {leaderboard.length === 0 ? (
                <div className="empty-state">No player data available</div>
              ) : (
                <>
                  <div>
                    {leaderboard
                      .slice(page * pageSize, (page + 1) * pageSize)
                      .map((player, index) => (
                        <div
                          key={index}
                          className="leaderboard-item"
                          onClick={() => showPlayerStats(player)}
                        >
                          <div className="leaderboard-rank">
                            <span className="rank-number">{page * pageSize + index + 1}</span>
                            {player.name}
                            {index === 0 && page === 0 && <span className="trophy">🏆</span>}
                          </div>
                          <span
                            className={
                              player.totalMoney >= 0 ? "positive" : "negative"
                            }
                          >
                            ${formatCurrency(player.totalMoney)}
                          </span>
                        </div>
                      ))}
                  </div>

                  <div className="pagination">
                    <button
                      onClick={() => setPage(Math.max(0, page - 1))}
                      disabled={page === 0}
                      className="btn btn-primary"
                      style={{ opacity: page === 0 ? 0.5 : 1 }}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={(page + 1) * pageSize >= leaderboard.length}
                      className="btn btn-primary"
                      style={{ opacity: (page + 1) * pageSize >= leaderboard.length ? 0.5 : 1 }}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {detailedStats && (
            <div className="card player-stats">
              <div className="card-header primary-header">
                <span className="card-header-icon">📊</span> {detailedStats.name}'s Stats
                <button
                  onClick={() => setDetailedStats(null)}
                  className="btn-delete"
                  style={{ marginLeft: 'auto', color: 'white' }}
                >
                  ✕
                </button>
              </div>
              <div className="card-body">
                <div className="stats-grid">
                  <div className="stat-card stat-card-money">
                    <div className="stat-label">Total Money</div>
                    <div className="stat-value">${formatCurrency(detailedStats.totalMoney)}</div>
                  </div>
                  <div className="stat-card stat-card-games">
                    <div className="stat-label">Games Played</div>
                    <div className="stat-value">{detailedStats.gamesPlayed}</div>
                  </div>
                  <div className="stat-card stat-card-wins">
                    <div className="stat-label">Wins</div>
                    <div className="stat-value">{detailedStats.winCount}</div>
                  </div>
                </div>

                <div className="history-title">
                  <span style={{ marginRight: '8px' }}>📅</span> Game History
                </div>

                {detailedStats.history.length === 0 ? (
                  <div className="empty-state">No game history available</div>
                ) : (
                  <div>
                    {detailedStats.history.map((game, index) => (
                      <div key={index} className="history-item">
                        <div className="history-timestamp">
                          {new Date(game.timestamp).toLocaleString()}
                        </div>
                        <div className="history-details">
                          <div className="history-detail">Buy-in: ${formatCurrency(game.buyIn)}</div>
                          <div className="history-detail">Cashout: ${formatCurrency(game.amount)}</div>
                        </div>
                        <div
                          className={`history-result ${
                            game.netResult >= 0 ? "history-profit" : "history-loss"
                          }`}
                        >
                          {game.netResult >= 0 ? "Profit" : "Loss"}: $
                          {formatCurrency(Math.abs(game.netResult))}
                        </div>
                        {game.position && (
                          <div className="history-meta">
                            Position: {game.position}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="footer">
          Designed with ♠️ by Param Sampat
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedPlayer ? (
          <div>
            <h2>{selectedPlayer.name}'s Statistics</h2>
            <div className="stats-grid">
              <div className="stats-card">
                <div className="stats-title">Current Balance</div>
                <div className="stats-value">{formatCurrency(selectedPlayer.totalMoney)}</div>
              </div>
              <div className="stats-card">
                <div className="stats-title">Games Played</div>
                <div className="stats-value">{selectedPlayer.gamesPlayed}</div>
              </div>
              <div className="stats-card">
                <div className="stats-title">Win Count</div>
                <div className="stats-value">{selectedPlayer.winCount}</div>
              </div>
              <div className="stats-card">
                <div className="stats-title">Win Rate</div>
                <div className="stats-value">
                  {selectedPlayer.gamesPlayed > 0
                    ? `${((selectedPlayer.winCount / selectedPlayer.gamesPlayed) * 100).toFixed(1)}%`
                    : '0%'}
                </div>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <PlayerGraph player={selectedPlayer} transactions={transactions.filter(t => t.player === selectedPlayer.name)} />
            </div>
          </div>
        ) : selectedGroup ? (
          <div>
            <h2>{selectedGroup.name}'s Statistics</h2>
            <div className="stats-grid">
              <div className="stats-card">
                <div className="stats-title">Total Group Money</div>
                <div className="stats-value">{formatCurrency(calculateGroupStats(selectedGroup).totalMoney)}</div>
              </div>
              <div className="stats-card">
                <div className="stats-title">Members</div>
                <div className="stats-value">{calculateGroupStats(selectedGroup).memberCount}</div>
              </div>
              <div className="stats-card">
                <div className="stats-title">Total Transactions</div>
                <div className="stats-value">{calculateGroupStats(selectedGroup).transactionCount}</div>
              </div>
              <div className="stats-card">
                <div className="stats-title">Average Transaction</div>
                <div className="stats-value">
                  {formatCurrency(calculateGroupStats(selectedGroup).averageTransaction)}
                </div>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <h3>Group Members</h3>
              <div className="list-group">
                {selectedGroup.members.map((member, index) => (
                  <div key={index} className="list-item">
                    <span>{member}</span>
                    <span>{formatCurrency(
                      transactions
                        .filter(t => t.player === member && t.group === selectedGroup.name)
                        .reduce((acc, t) => acc + t.amount, 0)
                    )}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default App;