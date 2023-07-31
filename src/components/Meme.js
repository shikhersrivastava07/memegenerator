import { useState ,useEffect } from "react";

export default function Meme() {
  // const [memeImage, setMemeImage] = useState("https://i.imgflip.com/30b1gx.jpg");

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/30b1gx.jpg",
  });

  const [allMemeImages, setAllMemeImages] = useState([]);

 useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeImages(data.data.memes))
}, [])


console.log(allMemeImages)

  function getMemeImage() {
   

    const randomNumber = Math.floor(Math.random() * allMemeImages.length);

    const url = allMemeImages[randomNumber].url;

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }


function handleChange(event)
{
  const {name,value}=event.target
  setMeme((prevMeme)=>{

    return {...prevMeme, [name]:value}
  })
}



  return (
    <>
      <main>
        <div className="form">
          <input
            type="text"
            className="form--inputs"
            placeholder="Upper Text"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          ></input>
          <input
            type="text"
            className="form--inputs"
            placeholder="Bottom Text"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          ></input>
        </div>

        <button className="form--button" onClick={getMemeImage}>
          Generate a new meme image
        </button>
      </main>
      <div className="meme--container">
        <img src={meme.randomImage} className="meme--image"></img>
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </>
  );
}
