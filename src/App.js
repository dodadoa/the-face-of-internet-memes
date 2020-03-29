import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

const GIPHY_API = 'https://api.giphy.com/v1/gifs/search'
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY
const GIFS_LIMIT = 50

function App() {

  const [gifs, setGifs] = useState([])
  const [searching, setSearching] = useState('green')
  const [searchValue, setSearchValue] = useState('')
  const [bgGif, setBgGif] = useState('')

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const gifEndpoint = `${GIPHY_API}?api_key=${API_KEY}&q=${searching}&limit=${GIFS_LIMIT}&offset=0&rating=G&lang=en`
    const fetch = async () => {
      try {
        const result =  await axios.get(gifEndpoint)
        await setGifs(result.data.data)
        await setBgGif(result.data.data[0])
      } catch(error) {
        console.log(error)
      }
    }
    fetch() 
  }, [searching])

  useEffect(() => {
    setTimeout(() => {
      const shuffledGifs = shuffle(gifs)
      setGifs(shuffledGifs)
    }, 3000)
  })

  const boxStyle = () => ({
    width: window.innerWidth / GIFS_LIMIT,
    height: window.innerHeight,
    // objectFit: 'none',
    // maxHeight: '100%',
  })

  const wrapperStyle = {
    position: 'fixed',
    top: 0,
    display: 'flex',
    flexWrap: 'wrap',
    zIndex: 2
  }

  const handleOnClick = async () => {
    await setSearching(searchValue)
  }

  const background = {
    position: 'fixed',
    zIndex: 1,
    top: 0,
    left: 0,
    width: window.innerWidth,
    height: window.innerHeight
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          bgGif && <img 
            style={background}
            src={bgGif.images.downsized_large.url}
            alt="gif"
          />
        }
        <div style={wrapperStyle}>
          {
            gifs.map((gif) => (
              <img 
                ket={gif.id}
                style={boxStyle()}
                src={gif.images.downsized_large.url} 
                alt="gif"
              />
            ))
          }
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            zIndex: 3,
            left: '45%',
          }}
        >
          <input 
            onChange={e => setSearchValue(e.target.value)} 
            value={searchValue}
          />
          <button onClick={handleOnClick}>
            search 
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
