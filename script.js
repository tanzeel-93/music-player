// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
{
	name: "Nadeem Mohammed -Catch-Me",
	artist: "Nadeem Mohammed",
	image: "https://i.ytimg.com/vi/FoPUUStwjIs/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBO32DCAp62qdif8raixYYgXS8Nrg",
	path: "nasheed/catchme.m4a"
},
{
	name: "Nadeem Mohammed -Forgive-Me ",
	artist: "Nadeem Mohammed",
	image: "https://i.ytimg.com/vi/jIuGuAm72MA/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBsqazMFTlmDUx21WEOdB14sgyVzg",
    
	path: "nasheed/forgiveme.m4a"
},
{
	name: "Nadeem Mohammed - La Ilaha Illallah ",
	artist: "Nadeem Mohammed",
	image: "https://i.ytimg.com/vi/z1nEwbl6Ai8/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDwSHLMxk5m2khpjlqF19LVyFolXQ",
	path: "nasheed/lailahaillalah.m4a",
},
{
	name: "Wedding Nasheed ",
	artist: "Muhammed al Muqit",
	image: "https://i.ytimg.com/vi/ivrumxRUz_Y/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCLm6T0ioSYccofQPRmAujGXOF5sQ",
	path: "nasheed/wedding.m4a",
},
{
	name: "The way of Tears - Muhammed al Muqit ",
	artist: "Muhammed al Muqit",
	image: "https://i.ytimg.com/vi/YiSQ_db-Dcw/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCGcK9-yXcMsIXlnK3j15dCAEjt8Q",
	path: "nasheed/wayoftears.m4a",
},
{
	name: "The Beauty of Existence - Heart Touching Nasheed",
	artist: "Muhammed al Muqit",
	image: "https://i.ytimg.com/vi/NrsCej6SVxM/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAgKDqcBXLpKw-dmgfTAELQH6ZoSA",
	path: "nasheed/the-beauty-of-existence.webm",
},
{
	name: "Al Hamdulillah - Beautiful Nasheed Thanks To Allah ",
	artist: " Omar Esa",
	image: "https://i.ytimg.com/vi/mD81D8o8cMs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDE-5RGgbn6V1ytu7Kut-eLcRqxDA",
	path: "nasheed/al-hamdulillah.mp3",
},
{
	name: "Forgive Me Allah - Astagfirullah | Heart Touching Nasheed",
	artist: " Omar Esa",
	image: "https://i.ytimg.com/vi/caeTvZrlVTo/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBTcGHVoCbesKpLqaU_6acWRf5j-A",
	path: "nasheed/Astagfirullah.webm",
},
{
	name: "My Hope (Allah) Nasheed By Muhammad al Muqit ",
	artist: " Muhammad al Muqit",
	image: "https://i.ytimg.com/vi/slkyMimmb1M/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA8fxQtKJf-YbApTFphbsHpAPaJww",
	path: "nasheed/my-hope-allah.webm",
},
];
function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    
    track_art.style.backgroundImage = 
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = 
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    updateTimer = setInterval(seekUpdate, 1000);
    
    curr_track.addEventListener("ended", nextTrack);
    
    random_bg_color();
    }
    
    function random_bg_color() {
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    document.body.style.background = bgColor;
    }
    
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }
    function playpauseTrack() {
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        curr_track.play();
        isPlaying = true;
        
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        curr_track.pause();
        isPlaying = false;
        
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        }
        
        function nextTrack() {
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        loadTrack(track_index);
        playTrack();
        }

        

        function seekTo() {
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }

            


    loadTrack(track_index);
