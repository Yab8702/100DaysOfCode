import "./Calculator.css"; // Import the CSS file with custom styles

function Calculator() {
  return (
    <div>
      <h1>Calculator</h1>

      <div className="calculator-wrapper">
        <div>
          <button className="first">AC</button>
          <button className="first">+/-</button>
          <button className="first percentage">%</button>
          <button className="yellow">÷</button>
        </div>
        <div>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button className="yellow">×</button>
        </div>
        <div>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button className="yellow minus">-</button>
        </div>
        <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button className="yellow">+</button>
        </div>
        <div>
          <button className="zero">0</button>
          <button className="dot">.</button>
          <button className="yellow">=</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
