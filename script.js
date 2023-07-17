console.log("Welcome to Spotify");

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems =Array.from(document.getElementsByClassName('songItem')); 
let songs = [
    {songName:"..ready for it", filePath: "songs/1.mp3", coverPath: "covers/one.png"},
    {songName:"Gorgeous", filePath: "songs/2.mp3", coverPath: "covers/two.png"},
    {songName:"Delicate", filePath: "songs/3.mp3", coverPath: "covers/three.png"},
    {songName:"Dont Blame Me", filePath: "songs/4.mp3", coverPath: "covers/four.png"},
    {songName:"Look What You Made Me Do", filePath: "songs/5.mp3", coverPath: "covers/five.png"},
    {songName:"I Did Something Bad", filePath: "songs/6.mp3", coverPath: "covers/six.png"},
    {songName:"King Of My Heart", filePath: "songs/7.mp3", coverPath: "covers/seven.png"},
    {songName:"End Game", filePath: "songs/8.mp3", coverPath: "covers/eight.png"},
    {songName:"Call It What You Want", filePath: "songs/9.mp3", coverPath: "covers/nine.png"},
    {songName:"New Years Day", filePath: "songs/10.mp3", coverPath: "covers/ten.jpeg"},
];

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

//audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity=0;
    }
});

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100; 
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    /*audioElement.src = `songs/${songIndex+1}.mp3`;*/
    audioElement.src = songs[songIndex-1].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
