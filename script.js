console.log('Spotify app')

let song

async function requestAccessToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(clientId + ':' + clientSecret)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
  if (res.ok) {
    const data = await res.json()
    return data.access_token
  } else window.alert('Bad Request')
}

async function requestSongInfo(track, artist) {
  const res = await fetch(`https://api.spotify.com/v1/search?q=${track},${artist}&type=track,artist`, {
    method: "GET",
    headers: {
      Authorization : `Bearer ${await requestAccessToken()}`
    }
  })
  if (res.ok) {
    const data = await res.json()
    return data.tracks.items[0].preview_url
  } else window.alert('Bad Request')
}

// ( async () => await requestSongInfo('fame','david bowie'))()


const newFigure = document.createElement('figure')
newFigure.id = 'fig6'
const img = document.createElement('img')
img.class = 'gallery-img'
img.alt = 'fame - david bowie'
img.src = './static/images/hardball.jpg'

newFigure.appendChild(img)
document.querySelector('.gallery').appendChild(newFigure)

const images = document.getElementsByTagName('img')

console.log(images)

for(const image of images){
  image.addEventListener('click', async () => {
    const {track, artist} = getTrackAndArtist(image)
    const url = await requestSongInfo(track, artist)
    if (song) {
      stopSong()
    }
    playSong(url)
  })
}

function getTrackAndArtist(imageNode){
  const [track, artist] = imageNode.alt.split(' - ')
  return { track, artist }
}


function playSong(url) { 
  song = new Audio(url)
  song.volume = .5
  song.play()
}

function stopSong(){
  song.pause()
}

// const stopBtn = document.querySelector('#stop-btn')

// stopBtn.addEventListener('click', stopSong)

