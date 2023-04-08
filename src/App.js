import Obituaries from "./Obituaries";

function App() {


  return (
    <>
      <div id="header">
        <div className="headerDiv"></div>
        <div className="headerDiv">
          <h1 id="title">The Last Show</h1>
        </div>
        <div className="headerDiv">
          <button id="addButton">+ New Obituary</button>
        </div>
      </div>
      <div id="main">
        <Obituaries />
      </div>
    </>
  );
}

export default App;
