import "./App.css";
import Calculator from "./components/Calculator.tsx";
import Header from "./components/Header.tsx";

function App() {
  return (
    <>
      <Header />
      <Calculator />
      <p className="p-3 text-sm text-gray-400">
        This calculator is for informational purposes only. I do not guarantee accuracy
        and am not responsible for any decisions made based on its results. Use at your
        own risk.
      </p>
    </>
  );
}

export default App;
