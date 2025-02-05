import React, { useState, useEffect } from "react";

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
    <div className="p-4">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">🃏 Poker Stats Tracker</h1>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">👥 Add Player</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements.name;
                addPlayer(input.value);
                input.value = "";
              }}
              className="flex gap-2"
            >
              <input
                name="name"
                type="text"
                placeholder="Player Name"
                className="flex-grow p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">🎯 Players</h2>
            <div className="border rounded">
              {players.map((player, index) => (
                <div
                  key={index}
                  className="p-2 flex justify-between items-center hover:bg-gray-50 border-b last:border-b-0"
                >
                  <span
                    className="cursor-pointer"
                    onClick={() => showPlayerStats(player)}
                  >
                    {player.name}
                  </span>
                  <button
                    onClick={() => deletePlayer(index)}
                    className="text-red-500 px-2 py-1 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">👥 Add Group</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements.name;
                addGroup(input.value);
                input.value = "";
              }}
              className="flex gap-2"
            >
              <input
                name="name"
                type="text"
                placeholder="Group Name"
                className="flex-grow p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">🎲 Groups</h2>
            <div className="border rounded">
              {groups.map((group, index) => (
                <div
                  key={index}
                  className="p-2 flex justify-between items-center hover:bg-gray-50 border-b last:border-b-0"
                >
                  <span>{group.name}</span>
                  <button
                    onClick={() => deleteGroup(index)}
                    className="text-red-500 px-2 py-1 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">💰 Update Money</h2>
        <form
          onSubmit={handleMoneyUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl"
        >
          <select
            value={moneyUpdate.playerId}
            onChange={(e) =>
              setMoneyUpdate({ ...moneyUpdate, playerId: e.target.value })
            }
            className="p-2 border rounded"
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
            className="p-2 border rounded"
          />

          <select
            value={moneyUpdate.groupId}
            onChange={(e) =>
              setMoneyUpdate({ ...moneyUpdate, groupId: e.target.value })
            }
            className="p-2 border rounded"
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
            className="p-2 border rounded"
          />

          <input
            placeholder="Position (e.g., 1st, 2nd)"
            value={moneyUpdate.position}
            onChange={(e) =>
              setMoneyUpdate({ ...moneyUpdate, position: e.target.value })
            }
            className="p-2 border rounded"
          />

          <input
            placeholder="Notes"
            value={moneyUpdate.notes}
            onChange={(e) =>
              setMoneyUpdate({ ...moneyUpdate, notes: e.target.value })
            }
            className="p-2 border rounded"
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">🏆 Leaderboard</h2>
        <div className="border rounded">
          {leaderboard
            .slice(page * pageSize, (page + 1) * pageSize)
            .map((player, index) => (
              <div
                key={index}
                className="p-2 flex justify-between items-center hover:bg-gray-50 border-b last:border-b-0 cursor-pointer"
                onClick={() => showPlayerStats(player)}
              >
                <span>{player.name}</span>
                <span
                  className={
                    player.totalMoney >= 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  ${player.totalMoney}
                </span>
              </div>
            ))}
        </div>

        <div className="flex justify-between mt-2">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={(page + 1) * pageSize >= leaderboard.length}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {detailedStats && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{detailedStats.name}'s Stats</h2>
            <button
              onClick={() => setDetailedStats(null)}
              className="text-gray-500 px-2 py-1 rounded hover:bg-gray-100"
            >
              Close
            </button>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Total Money:</strong> ${detailedStats.totalMoney}
            </p>
            <p>
              <strong>Games Played:</strong> {detailedStats.gamesPlayed}
            </p>
            <p>
              <strong>Wins:</strong> {detailedStats.winCount}
            </p>
          </div>

          <h3 className="text-lg font-bold mt-4 mb-2">Game History</h3>
          <div className="border rounded divide-y">
            {detailedStats.history.map((game, index) => (
              <div key={index} className="p-2">
                <div className="text-sm text-gray-600">
                  {new Date(game.timestamp).toLocaleString()}
                </div>
                <div className="text-gray-600">
                  Buy-in: ${game.buyIn} / Cashout: ${game.amount}
                </div>
                <div
                  className={
                    game.netResult >= 0
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {game.netResult >= 0 ? "Profit" : "Loss"}: $
                  {Math.abs(game.netResult)}
                </div>
                {game.position && (
                  <div className="text-sm text-gray-600">
                    Position: {game.position}
                  </div>
                )}
                {game.notes && (
                  <div className="text-sm text-gray-600">
                    Notes: {game.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="text-center text-gray-600 py-4 mt-8 border-t">
        Designed with ♠️ by Param Sampat
      </div>
    </div>
  );
};

export default App;