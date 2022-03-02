import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const bloques = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [letterWin, setLetterWin] = useState(null);
  const [Letter, setLetter] = useState("X");

  const winCombinations = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
    [3, 5, 7],
  ];

  const checkParity = () => {
    const very = bloques.every(
      (el) => document.getElementById(el).textContent.trim().length > 0
    );
    if (very && letterWin === null) {
      setLetterWin(false);
    }
  };

  const handlerClick = (e) => {
    if (e.target.textContent.trim().length < 1) {
      e.target.textContent = Letter;
      setLetter(Letter === "X" ? "O" : "X");
      return;
    }
  };
  const clear = () => {
    bloques.forEach((num) => {
      const bloque = document.getElementById(num);
      bloque.textContent = "";
      bloque.style.pointerEvents = "auto";
      //pointer Events vuelve a habilitar el onClick
    });
    setLetterWin(null);
  };

  const checkWinner = () => {
    winCombinations.forEach((letter) => {
      const [L1, L2, L3] = letter;

      const box1 = document.getElementById(L1).textContent.trim();
      const box2 = document.getElementById(L2).textContent.trim();
      const box3 = document.getElementById(L3).textContent.trim();

      if (box1.length > 0 && box2.length > 0 && box3.length > 0) {
        if (box1 === box2 && box3 === box2) {
          setLetterWin(box2);
        } else {
          checkParity();
        }
      }
    });
  };
  if (typeof letterWin === "string" || letterWin === false) {
    bloques.forEach(
      (id) => (document.getElementById(id).style.pointerEvents = "none")
      //Pointer Event deshabilita el onClick
    );
  }
  useEffect(() => {
    checkWinner();
  }, [Letter]);

  return (
    <div className="App">
      <h1>TA-TE-TI - React</h1>
      <div style={{ height: "3rem", margin: "5px" }}>
        {typeof letterWin === "string" && <h2>Winner {letterWin}</h2>}
        {letterWin === false && <h2>EMPATE</h2>}
      </div>
      <section>
        {bloques.map((x) => (
          <div key={x} id={x} onClick={handlerClick}></div>
        ))}
      </section>
      <button type="button" onClick={clear}>
        clear
      </button>
    </div>
  );
}

export default App;
