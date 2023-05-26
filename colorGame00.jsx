const Board = () => {
    const [countMovements, setCountMovements] = React.useState(1);
    const [player, setPlayer] = React.useState(0);
    let status = `Player: ${player}`;

    return (
        <div className="game-board" 
        onClick={ (e) => {
            setPlayer(countMovements % 2);
            status = `Player: ${player}`;
            setCountMovements(countMovements + 1);
        }}>
            <div id="info">
                <h1>{status}</h1>
            </div>
        </div>
    )
}

ReactDOM.render(<Board></Board>, document.getElementById('root'));