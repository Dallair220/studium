import '../styles/App.css';
import Test from './Test';

function App() {
  return (
    <div className="container">
      <div className="header">
        <h1>League Ladder</h1>
      </div>
      <div className="content">
        <Test />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
