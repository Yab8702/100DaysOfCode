import "./Calculator.css";
import { useState } from "react";

function Calculator() {
  const [expression, setExpression] = useState("0");

  const handleNumberClick = (number) => {
    if (expression === "0") {
      setExpression(number);
    } else {
      setExpression((prevExpression) => prevExpression + number);
    }
  };

  const handleOperatorClick = (operator) => {
    if (operator === "=") {
      evaluateExpression();
    } else {
      setExpression((prevExpression) => prevExpression + operator);
    }
  };

  const evaluateExpression = () => {
    try {
      const result = eval(expression);
      setExpression(result);
    } catch (error) {
      setExpression("Error");
    }
  };

  const handleClear = () => {
    setExpression("0");
  };
  const handleNegative = () => {
    setExpression("");
    setExpression((prevExpression) => {
      if (prevExpression.startsWith("-")) {
        return prevExpression.slice(1);
      } else {
        return `-${prevExpression}`;
      }
    });
  };

  const handleDelete = () => {
    setExpression((prevExpression) => {
      if (prevExpression.length === 1) {
        return "0";
      } else {
        return prevExpression.slice(0, -1);
      }
    });
  };

  return (
    <div>
      <h1>Calculator</h1>

      <div className="calculator-wrapper">
        <div className="result-wrapper">
          <span>{expression}</span>
        </div>
        <div>
          <button onClick={handleClear} className="first">
            AC
          </button>
          <button onClick={handleDelete} className="first">
            DEL
          </button>
          <button
            onClick={() => handleOperatorClick("%")}
            className="first percentage"
          >
            %
          </button>
          <button onClick={() => handleOperatorClick("/")} className="yellow">
            ÷
          </button>
        </div>
        <div>
          <button onClick={() => handleNumberClick("7")}>7</button>
          <button onClick={() => handleNumberClick("8")}>8</button>
          <button onClick={() => handleNumberClick("9")}>9</button>
          <button onClick={() => handleOperatorClick("*")} className="yellow">
            ×
          </button>
        </div>
        <div>
          <button onClick={() => handleNumberClick("4")}>4</button>
          <button onClick={() => handleNumberClick("5")}>5</button>
          <button onClick={() => handleNumberClick("6")}>6</button>
          <button
            onClick={() => handleOperatorClick("-")}
            className="yellow minus"
          >
            -
          </button>
        </div>
        <div>
          <button onClick={() => handleNumberClick("1")}>1</button>
          <button onClick={() => handleNumberClick("2")}>2</button>
          <button onClick={() => handleNumberClick("3")}>3</button>
          <button onClick={() => handleOperatorClick("+")} className="yellow">
            +
          </button>
        </div>
        <div>
          <button onClick={() => handleNumberClick("0")} className="zero">
            0
          </button>
          <button onClick={() => handleNegative()}>NEG</button>
          <button onClick={() => handleNumberClick(".")} className="dot">
            .
          </button>
          <button onClick={() => handleOperatorClick("=")} className="yellow">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
