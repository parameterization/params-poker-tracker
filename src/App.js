import React, { useState, useEffect } from "react";

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
`;

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

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players");
    const storedGroups = localStorage.getItem("groups");
    if (storedPlayers) setPlayers(JSON.parse(storedPlayers));
    if (storedGroups) setGroups(JSON.parse(storedGroups));
    updateLeaderboard();
  }, []);

  const updateLeaderboard = () => {
    setLeaderboard([...players].sort((a, b) => b.totalMoney - a.totalMoney));
  };

  const savePlayers = (updatedPlayers) => {
    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
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
    const trimmedName = name.trim();
    if (!trimmedName) return;
    if (
      groups.some((g) => g.name.toLowerCase() === trimmedName.toLowerCase())
    ) {
      alert("Group already exists");
      return;
    }
    saveGroups([
      ...groups,
      {
        name: trimmedName,
        totalPot: 0,
        gamesPlayed: 0,
        history: [],
      },
    ]);
  };

  const deletePlayer = (index) => {
    const newPlayers = players.filter((_, i) => i !== index);
    savePlayers(newPlayers);
  };

  const deleteGroup = (index) => {
    const newGroups = groups.filter((_, i) => i !== index);
    saveGroups(newGroups);
  };

  const handleMoneyUpdate = (e) => {
    e.preventDefault();
    const { playerId, amount, groupId, buyIn, position, notes } = moneyUpdate;
    if (!playerId || !amount || !buyIn) {
      alert("Please select a player, enter an amount, and specify buy-in");
      return;
    }

    const parsedAmount = parseFloat(amount);
    const parsedBuyIn = parseFloat(buyIn);
    const netResult = parsedAmount - parsedBuyIn;
    const timestamp = new Date().toISOString();
    const gameId = `${groupId}-${timestamp}`;

    const updatedPlayers = players.map((player, index) => {
      if (index === parseInt(playerId)) {
        return {
          ...player,
          totalMoney: player.totalMoney + netResult,
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

    savePlayers(updatedPlayers);
    updateLeaderboard();

    if (
      detailedStats &&
      parseInt(playerId) === players.indexOf(detailedStats)
    ) {
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
  };

  const showPlayerStats = (player) => {
    setDetailedStats(player);
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
                        <span className="list-item-name">{group.name}</span>
                        <button
                          onClick={() => deleteGroup(index)}
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
          </div>

          <div className="card">
            <div className="card-header primary-header">
              <span className="card-header-icon">💰</span> Update Money
            </div>
            <div className="card-body">
              <form onSubmit={handleMoneyUpdate} className="form-grid">
                <select
                  value={moneyUpdate.playerId}
                  onChange={(e) =>
                    setMoneyUpdate({ ...moneyUpdate, playerId: e.target.value })
                  }
                  className="form-input"
                >
                  <option value="">Select Player</option>
                  {players.map((player, index) => (
                    <option key={index} value={index}>
                      {player.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Amount (Cashout)"
                  value={moneyUpdate.amount}
                  onChange={(e) =>
                    setMoneyUpdate({ ...moneyUpdate, amount: e.target.value })
                  }
                  className="form-input"
                />

                <select
                  value={moneyUpdate.groupId}
                  onChange={(e) =>
                    setMoneyUpdate({ ...moneyUpdate, groupId: e.target.value })
                  }
                  className="form-input"
                >
                  <option value="">Select Group</option>
                  {groups.map((group, index) => (
                    <option key={index} value={index}>
                      {group.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Buy-in Amount"
                  value={moneyUpdate.buyIn}
                  onChange={(e) =>
                    setMoneyUpdate({ ...moneyUpdate, buyIn: e.target.value })
                  }
                  className="form-input"
                />

                <input
                  placeholder="Position (e.g., 1st, 2nd)"
                  value={moneyUpdate.position}
                  onChange={(e) =>
                    setMoneyUpdate({ ...moneyUpdate, position: e.target.value })
                  }
                  className="form-input"
                />

                <input
                  placeholder="Notes"
                  value={moneyUpdate.notes}
                  onChange={(e) =>
                    setMoneyUpdate({ ...moneyUpdate, notes: e.target.value })
                  }
                  className="form-input"
                />

                <div className="full-width">
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Update Money
                  </button>
                </div>
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
                            ${player.totalMoney}
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
                    <div className="stat-value">${detailedStats.totalMoney}</div>
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
                          <div className="history-detail">Buy-in: ${game.buyIn}</div>
                          <div className="history-detail">Cashout: ${game.amount}</div>
                        </div>
                        <div
                          className={`history-result ${
                            game.netResult >= 0 ? "history-profit" : "history-loss"
                          }`}
                        >
                          {game.netResult >= 0 ? "Profit" : "Loss"}: $
                          {Math.abs(game.netResult)}
                        </div>
                        {game.position && (
                          <div className="history-meta">
                            Position: {game.position}
                          </div>
                        )}
                        {game.notes && (
                          <div className="history-meta">
                            Notes: {game.notes}
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
    </>
  );
};

export default App;