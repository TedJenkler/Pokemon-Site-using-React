import { useState, useEffect } from "react";
import React from "react";
import PokemonList from "./components/PokemonList";
import axios from "axios";
import Pagination from "./components/Pagination";

function App() {
  // State hook for pokemon list
  const [pokemon, setPokemon] = useState([]);
  // State hook for side swap
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  // Only get one single time (correct way)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
    setLoading(false)
    setNextPageUrl(res.data.next)
    setPrevPageUrl(res.data.previous)
    setPokemon(res.data.results.map(p => p.name))
  })

  return () => cancel()
  }, [currentPageUrl])

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if(loading) return "loading...";

  // map from an api
 // axios.get("https://pokeapi.co/api/v2/pokemon").then(res => {
  //  setPokemon(res.data.results.map(p => p.name))
//  })

  return (
    <>
      <PokemonList pokemon={pokemon}/>
      <Pagination 
      goToNextPage={nextPageUrl ? goToNextPage : null}
      goToPrevPage={nextPageUrl ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
