// write a function to retrive a blob of json
// make an ajax request by using the 'fetch' function
// http://rallycoding.herokuapp.com/api/music_albums

// function fetchAlbums() {
//   fetch('http://rallycoding.herokuapp.com/api/music_albums')
//     .then(res => res.json()) //return a promis with res obj, and convirt res to a json to ready to use
//     .then(json => console.log(json)) // do whatever we want with json data
// }

// async function fetchAlbums() {
//   const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
//   const json = await res.json() 
  
//   console.log(json)
// }

const fetchAlbums = async () => {
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
  const json = await res.json() 
  
  console.log(json)
}

fetchAlbums();