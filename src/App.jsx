import './App.css';
import {ModalWindow} from "./components/ModalWindow";
import {useEffect, useState} from "react";
import CharactersList from "./components/CharactersList";

function App() {
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [data, setData] = useState({});
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character");
  const [charactersData, setCharacterData] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(url).then(res => res.json()).then(data => {
      setData(data);
      setCharacterData([...data.results]);

      setHasPrev(!!data.info?.prev);
      setHasNext(!!data.info?.next);
    });
    setLoading(false);
  }, [url]);


  function handleNextClick(){
    setUrl(data.info.next);
  }

  function handlePrevClick(){
    setUrl(data.info.prev);
  }

  return (
      <>
        {loading ? (<h1>Loading...</h1>) : (<CharactersList charactersData={charactersData} />)}
        <button id="prevBtn" disabled={!hasPrev} onClick={handlePrevClick}>Previous page</button>
        <button id="nextBtn" disabled={!hasNext} onClick={handleNextClick}>Next page</button>
      </>
  );
}

export default App;
