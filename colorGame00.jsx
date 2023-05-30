const Square = ({ id, player, newState, marks, win }) => {
  const [status, setStatus] = React.useState(null);
  const palet = ["red", "blue"];

  const handleClick = (e) => {
    if(win !== null) return;
      
    if(status !== null) return;
    let objPlayer = newState({ id: id, player: player });
    setStatus(objPlayer);
    e.target.style.background = palet[player];
  };

  return (
    <button id={id} onClick={handleClick}>
      <h1>{marks[status]}</h1>
    </button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(0);
  const [state, setState] = React.useState(Array(9).fill(null));
  const [win, setWin] = React.useState(null);

  const marks = ["X", "O"];
  const nextPlayer = () => (player + 1) % 2;
  let status = win===null ? `Turn of player ${marks[player]}` : `Winner is ${marks[win]}`;

  const renderSquare = (id) => {
    return (
      <Square
        id={id}
        player={player}
        marks={marks}
        newState={newState}
        win={win}
      ></Square>
    );
  };

  const newState = (ob) => {
    setPlayer(nextPlayer());
    state[ob.id] = ob.player;
    setState(state);
    return player;
  };

  React.useEffect(() => {
    const win = checkWin();
    if (win != null) {
      setWin(win);
    }
  }, [status]);

  const checkWin = () => {
    const w = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < w.length; i++) {
      const [a, b, c] = w[i];
      if (state[a] != null && state[a] == state[b] && state[a] == state[c])
        return state[a];
    }

    return null;
  };

  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1>{status}</h1>
      </div>
    </div>
  );
};

ReactDOM.render(<Board></Board>, document.getElementById("root"));
