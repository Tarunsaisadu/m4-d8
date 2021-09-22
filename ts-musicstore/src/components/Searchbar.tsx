import React from 'react'
import { useState,useEffect,ChangeEvent,FormEvent } from 'react'


interface Music {
    id: string;
    title: string;
    link: string;
    artist: {
      id: string;
      name: string;
      [picture: string]: string;
    };
    album: {
      id: string;
      title: string;
      name: string;
      [picture: string]: string;
      cover_small:string
    };
  }

export default function Searchbar() {
    const [userQuery, setuserQuery] = useState("");
    const [results, setResults] = useState<Music[]>([]);
   

 
    const updateUserQuery = (value: string) => {
        console.log("userQuery", "setuserQuery");
        setuserQuery(value as string);
      };

    const searchQuery = async () => {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/search?q=${userQuery}`
        );
        if (!response.ok) {
          console.error("something went wrong");
        }
        const fetchedSongs = await response.json();
        console.log(fetchedSongs);
        setResults(fetchedSongs.data);
        
      };

      return (
        <div className="form">
            <h1>search your fav albums</h1>
        <input
          value={userQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserQuery(e.target.value)}
       
        />
        <button className="btn btn-primary" onClick={searchQuery}>
          Search
        </button>

      {results.map((result, i) => {
        return (
          <div>
              <img src={result.album.cover_small}/>
              <h3> {result.album.title}</h3>
          </div>
        );
      })}
        </div>
    )
}
