


//Notes
const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("heade p"),
closeIcon = popupBox.querySelector("heade i"),
titleTag = popupBox.querySelector(".id"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Note";
    addBtn.innerText = "Add Note";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

function showNotes() {
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note">
                      <div class="detail">
  <p>${note.title}
  
  
  <button class="copy" onclick="copyText('span${id}')"><i class="fa-regular fa-clone fa-fade"></i>  </button>
  <span id="span${id}">${filterDesc}</span>
</div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note";
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
    description = descTag.value.trim();

    if(title || description) {
        let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear();

        let noteInfo = {title, description, date: `${month} ${day}, ${year}`}
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});

function copyText(elementId) {
        var textToCopy = document.getElementById(elementId);
        var text = textToCopy.textContent;

        var tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

}

//sershe999

  const frInput = document.getElementById('fro');
 const klItems = document.querySelectorAll('#klo lk');
    
    
    frInput.addEventListener('input', function() { const frValue = frInput.value.toLowerCase();

klItems.forEach(item => { const text = item.textContent.toLowerCase(); item.style.display = text. includes (frValue) ?
'block': 'none';

});
});
//music
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
        name: "Track A",
        artist: "Music",
        image: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg",
        path: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3",
},
{
        name: "Track B",
        artist: "Music",
        image: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_2.jpg",
        path: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3"
},
{
        name: "Track C",
        artist: "Music",
        image: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_3.jpg",
        path: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3"
},
{
        name: "Track D",
        artist: "Music",
        image: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_4.jpg",
        path: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3"
},
{
        name: "Track E",
        artist: "Music",
        image: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_5.jpg",
        path: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3"
},
{        name: "Track One",
                artist: "Music",
                image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
                path: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3"
        },
{
        name: "Track Tow",
        artist: "Music",
        image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
        path: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3"
},

{
        name: "Track Three",
        artist: "Music",
        image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
        path: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3"
},
{
        name: "Track Four",
        artist: "Music",
        image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
        path: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3"
},

{
        name: "Track Five",
        artist: "Music",
        image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
        path: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3"
},

{
        name: "Track Six",
        artist: "Music",
        image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
        path: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3"
       
},

{
        name: "Track Seven",
        artist: "Music",
        image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
        path: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3"
},

{
        name: "Track Eight",
        artist: "Music",
        image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
        path: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3"
        
},

{
        name: "Track Nine",
        artist: "Music",
        image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
        path: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3"
},
];


function loadTrack(track_index) {
// Clear the previous seek timer
clearInterval(updateTimer);
resetValues();

// Load a new track
curr_track.src = track_list[track_index].path;
curr_track.load();

// Update details of the track
track_art.style.backgroundImage =
	"url(" + track_list[track_index].image + ")";
track_name.textContent = track_list[track_index].name;
track_artist.textContent = track_list[track_index].artist;
now_playing.textContent =
	"PLAYING " + (track_index + 1) + " OF " + track_list.length;

// Set an interval of 1000 milliseconds
// for updating the seek slider
updateTimer = setInterval(seekUpdate, 1000);

// Move to the next track if the current finishes playing
// using the 'ended' event
curr_track.addEventListener("ended", nextTrack);

// Apply a random background color
random_bg_color();
}

function random_bg_color() {
// (for getting lighter colors)

}

// Function to reset all values to their default
function resetValues() {
curr_time.textContent = "00:00";
total_duration.textContent = "00:00";
seek_slider.value = 0;
}

function playpauseTrack() {
// Switch between playing and pausing
// depending on the current state
if (!isPlaying) playTrack();
else pauseTrack();
}

function playTrack() {
// Play the loaded track
curr_track.play();
isPlaying = true;

// Replace icon with the pause icon
playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
// Pause the loaded track
curr_track.pause();
isPlaying = false;

// Replace icon with the play icon
playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
// Go back to the first track if the
// current one is the last in the track list
if (track_index < track_list.length - 1)
	track_index += 1;
else track_index = 0;

// Load and play the new track
loadTrack(track_index);
playTrack();
}

function prevTrack() {
// Go back to the last track if the
// current one is the first in the track list
if (track_index > 0)
	track_index -= 1;
else track_index = track_list.length - 1;

// Load and play the new track
loadTrack(track_index);
playTrack();
}
function seekTo() {
// Calculate the seek position by the
// percentage of the seek slider
// and get the relative duration to the track
seekto = curr_track.duration * (seek_slider.value / 100);

// Set the current track position to the calculated seek position
curr_track.currentTime = seekto;
}

function setVolume() {
// Set the volume according to the
// percentage of the volume slider set
curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
let seekPosition = 0;

// Check if the current track duration is a legible number
if (!isNaN(curr_track.duration)) {
	seekPosition = curr_track.currentTime * (100 / curr_track.duration);
	seek_slider.value = seekPosition;

	// Calculate the time left and the total duration
	let currentMinutes = Math.floor(curr_track.currentTime / 60);
	let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
	let durationMinutes = Math.floor(curr_track.duration / 60);
	let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

	// Add a zero to the single digit time values
	if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
	if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
	if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
	if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

	// Display the updated duration
	curr_time.textContent = currentMinutes + ":" + currentSeconds;
	total_duration.textContent = durationMinutes + ":" + durationSeconds;
}
}
function showMusicList() {
        // Generate a string representation of the music list
        let musicListString = "Music List:\n";
        for (let i = 0; i < track_list.length; i++) {
                musicListString += `${i + 1}. ${track_list[i].name} - ${track_list[i].artist}\n`;
        }

        // Prompt the user to enter the number of the track they want to play
        let userInput = prompt(musicListString + "Enter the number of the track you want to play:");

        // Validate user input
        if (userInput !== null && userInput !== "") {
                let selectedTrackIndex = parseInt(userInput) - 1;

                // Check if the selected index is valid
                if (!isNaN(selectedTrackIndex) && selectedTrackIndex >= 0 && selectedTrackIndex < track_list.length) {
                        // Load and play the selected track
                        track_index = selectedTrackIndex;
                        loadTrack(track_index);
                        playTrack();
                } else {
                        alert("Invalid track selection. Please enter a valid track number.");
                }
        }
}





function uploadMusic() {
        let fileInput = document.getElementById("fileInput");

        if (fileInput.files.length > 0) {
                let audioFile = fileInput.files[0];
                let imageFile = fileInput.files[1];

                if (audioFile.type.includes("audio")) {
                        let defaultImage = "https://artists.apple.com/assets/artist-og-share-c766a5950ae664ea9073ede99da0df1094ae1a24bee32b86ab9e43e7e02bce2e.jpg"; // Ø§Ø³ØªØ¨Ø¯Ù Ø¨Ø±Ø§Ø¨Ø· Ø§ÙØµÙØ±Ø© Ø§ÙØ§ÙØªØ±Ø§Ø¶ÙØ© Ø§ÙØ®Ø§ØµØ© Ø¨Ù

                        let hasImage = imageFile && imageFile.type.includes("image");
                        let imagePath = hasImage ? URL.createObjectURL(imageFile) : defaultImage;

                        track_list.unshift({
                                name: audioFile.name.replace(/\.[^/.]+$/, ""),
                                artist: "Music",
                                image: imagePath,
                                path: URL.createObjectURL(audioFile)
                        });

                        loadTrack(0);
                } else {
                        // ÙØªÙ Ø§ÙØªØ¹Ø§ÙÙ ÙØ¹ Ø­Ø§ÙØ© Ø¹Ø¯Ù Ø§Ø®ØªÙØ§Ø± ÙÙÙ ØµÙØªÙ
                }

                fileInput.value = "";
        } else {
                // ÙØªÙ Ø§ÙØªØ¹Ø§ÙÙ ÙØ¹ Ø­Ø§ÙØ© Ø¹Ø¯Ù Ø§Ø®ØªÙØ§Ø± Ø£Ù ÙÙÙ
        }
}

document.getElementById("fileInput").addEventListener("change", uploadMusic);

// ØªØ­ÙÙÙ Ø§ÙÙØ³Ø§Ø± Ø§ÙØ£ÙÙ Ø¹ÙØ¯ Ø¨Ø¯Ø¡ Ø§ÙØªØ´ØºÙÙ
loadTrack(0);
// ØªÙ Ø§ÙØ­ÙØ§Ø¸ Ø¹ÙÙ Ø¨Ø§ÙÙ Ø§ÙÙÙØ¯ ÙÙØ§ ÙÙ

// ØªÙ Ø§ÙØ­ÙØ§Ø¸ Ø¹ÙÙ Ø¨Ø§ÙÙ Ø§ÙÙÙØ¯ ÙÙØ§ ÙÙ
// ØªÙ Ø§ÙØ­ÙØ§Ø¸ Ø¹ÙÙ Ø¨Ø§ÙÙ Ø§ÙÙÙØ¯ ÙÙØ§ ÙÙ






//
//crono
// Load the first track in the tracklist
let loginHistory = [];
        let sessionIntervalId;
        let sessionStartTime;

        let storedHistory = localStorage.getItem('loginHistory');
        if (storedHistory) {
            loginHistory = JSON.parse(storedHistory);
            const loginHistoryList = document.getElementById('loginHistory');
            loginHistory.forEach(function (date) {
                const listItem = document.createElement('lp');
                listItem.innerText = date;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function () {
                    loginHistory = loginHistory.filter(d => d !== date);
                    loginHistoryList.removeChild(listItem);
                    localStorage.setItem('loginHistory', JSON.stringify(loginHistory));
                });

                listItem.appendChild(deleteButton);

                loginHistoryList.insertBefore(listItem, loginHistoryList.firstChild);
            });
        }

        function updateLoginTime() {
            const loginHistoryList = document.getElementById('loginHistory');
            const currentTime = new Date().toLocaleString();

            loginHistory.push(currentTime);

            const listItem = document.createElement('lp');
            listItem.innerText = currentTime;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                loginHistory = loginHistory.filter(d => d !== currentTime);
                loginHistoryList.removeChild(listItem);
                localStorage.setItem('loginHistory', JSON.stringify(loginHistory));
            });

            listItem.appendChild(deleteButton);

            loginHistoryList.insertBefore(listItem, loginHistoryList.firstChild);

            localStorage.setItem('loginHistory', JSON.stringify(loginHistory));
        }

        function updateSessionTime() {
            const currentTime = Date.now();
            const elapsedTime = (currentTime - sessionStartTime) / 1000;
            document.getElementById('sessionTime').textContent = elapsedTime.toFixed(2) + " seconds";
        }

        function startSessionTimer() {
            sessionStartTime = Date.now();
            clearInterval(sessionIntervalId);
            sessionIntervalId = setInterval(updateSessionTime, 100);
            updateLoginTime();
        }

        startSessionTimer();

        const clearHistoryButton = document.getElementById('clearHistoryButton');
        clearHistoryButton.addEventListener('click', function () {
            const loginHistoryList = document.getElementById('loginHistory');
            loginHistoryList.innerHTML = '';
            loginHistory = [];
            localStorage.removeItem('loginHistory');
        });




//flow 
  
  
  
  
  
  const target = {
          clicked: 0,
          currentFollowers: 0,
          btn: document.querySelector(".btn"),
          fw: document.querySelector("span.followers")
  };
  
  const follow = () => {
          target.clicked += 2;
          target.btn.innerHTML = 'Following <i class="fas fa-user-times"></i>';
  
          if (target.clicked % 5 === 1) {
                  target.currentFollowers -= 1;
                  target.btn.innerHTML = 'Follow <i class="fas fa-user-plus"></i>';
          } else {
                  target.currentFollowers += 1;
          }
  
          target.fw.textContent = target.currentFollowers;
          target.btn.classList.toggle("follow");
  }
  
//post
const imageInput = document.getElementById('imageInput');
                const imagePreviewContainer = document.getElementById('imagePreviewContainer');
                
                // Load images from local storage if available
                for (let i = localStorage.length - 1; i >= 0; i--) {
                  const key = localStorage.key(i);
                  if (key && key.startsWith('savedImage')) {
                    const savedImage = localStorage.getItem(key);
                    if (savedImage) {
                      createImageElement(savedImage, key);
                    }
                  }
                }
                
                function createImageElement(src, key) {
                  const imageContainer = document.createElement('div');
                  imageContainer.classList.add('image-container');
                
                  const image = document.createElement('img');
                  image.src = src;
                
                  const deleteButton = document.createElement('button');
                  deleteButton.textContent = 'Delete';
                  deleteButton.addEventListener('click', function() {
                    imagePreviewContainer.removeChild(imageContainer);
                    // Remove the image and additional content from local storage
                    localStorage.removeItem(key);
                  });
                
                  const additionalHTM = `
      <div class="poii">
           <img id="profilee" src="ph/14.png" alt="logo">
           <input type="file" id="imgee" accept="image/*" onchange="uploadImage()">
           <pp  ><n id="usernameDisplay" onclick="updateUsername()">WORLOX!</n><svg  class="uname-verified" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1350.03 1326.16">
                                            <defs><style></style></defs>
                              
                                              
                                              <g id="Layer_3" data-name="Layer 3">
                                                  <polygon class="cls-1" points="0 747.37 120.83 569.85 70.11 355.04 283.43 292.38 307.3 107.41 554.93 107.41 693.66 0 862.23 120.83 1072.57 126.8 1112.84 319.23 1293.35 399.79 1256.05 614.6 1350.03 793.61 1197.87 941.29 1202.35 1147.15 969.64 1178.48 868.2 1326.16 675.02 1235.17 493.77 1315.72 354.99 1133.73 165.58 1123.29 152.16 878.64 0 747.37"/></g>
                                              <g id="Layer_2" data-name="Layer 2">
                                                  <path class="cls-12" d="M755.33,979.23s125.85,78.43,165.06,114c34.93-36,234.37-277.22,308.24-331.94,54.71,21.89,85,73.4,93,80.25-3.64,21.89-321.91,418.58-368.42,445.94-32.74-3.84-259-195.16-275.4-217C689.67,1049.45,725.24,1003.85,755.33,979.23Z" transform="translate(-322.83 -335.95)"/></g>
                                          </svg>    
                                                  
                                              </pp>
           <asdd><a>•••</a></asdd>
   </div>
                  `;
                  
                  const additionalHTML = `<div class="post-content">
                                                <div class="reaction-wrapper">
                                                        <div class="like">
                                                                <label class="container">
                                                                        <input checked="checked" type="checkbox">
                                                                        <div class="checkmark">
                                                                                <svg viewBox="0 0 256 256">
                                                                                        <rect fill="none" height="256" width="256"></rect>
                                                                                        <path class="lok" d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path>
                                                                                </svg>
                                                                        </div>
                                                                </label>
                                                        </div>
                                                        <a onclick="toggleMen()" class="comment">
                                                                <svg height="24" role="img" viewBox="0 0 48 48" width="24">
                                                                        <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path>
                                                                </svg>
                                                        </a>
                                                        <a  class="transfer">
                                                                <svg height="24" viewBox="0 0 48 48" width="24">
                                                                        <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                                                                </svg>
                                                        </a>
                                                        <a class="signet">
                                                                <label class="containe">
                                                                        <input type="checkbox" checked="checked">
                                                                        <svg class="save-regular" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                                                                                <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path>
                                                                        </svg>
                                                                        <svg class="save-solid" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                                                                                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
                                                                        </svg>
                                                                </label>
                                                        </a>
                                                </div>
                                                         <p  class="post-time">2 minutes ago </p>   
                   
                                       </div>
                                                
             
               
`;
                           imageContainer.innerHTML += additionalHTM;

                  imageContainer.appendChild(image);
        imageContainer.innerHTML += additionalHTML;

                
                  // Add the new image container at the beginning
                  imagePreviewContainer.prepend(imageContainer);
                }
                
                imageInput.addEventListener('change', function(e) {
                        const files = e.target.files;
                        for (let i = 0; i < files.length; i++) {
                                const file = files[i];
                                if (file) {
                                        const reader = new FileReader();
                                        reader.onload = function(e) {
                                                const key = `savedImage${localStorage.length}`;
                                                createImageElement(e.target.result, key);
                                                // Save the image to local storage with a unique key
                                                localStorage.setItem(key, e.target.result);
                                        };
                                        reader.readAsDataURL(file);
                                }
                        }
                
                        // Move the new images to the top
                        const imageContainers = document.querySelectorAll('.image-container');
                        imageContainers.forEach(container => {
                                imagePreviewContainer.prepend(container);
                        });
                });
                
                deleteAllButton.addEventListener('click', function() {
                        // Remove all images from the preview container
                        imagePreviewContainer.innerHTML = '';
                
                        // Clear local storage
                        for (let i = localStorage.length - 1; i >= 0; i--) {
                                const key = localStorage.key(i);
                                if (key && key.startsWith('savedImage')) {
                                        localStorage.removeItem(key);
                                }
                        }
                });
    
    
    
    
//menu
     
function toggleMenu() {
        const menu = document.getElementById('menu');
        if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                menu.style.bottom = '0';
        } else {
                menu.style.bottom = '0';
                setTimeout(() => {
                        menu.classList.add('hidden');
                }, 0);
        }
}
//qr cod photo
new Vue({
  el: '#nbhfxeth',
  data: {
    scanning: false,
    result: null,
    showCamera: false,
    showImage: false,
    image: null
  },
  methods: {
    takePicture() {
      let video = document.getElementById('preview');
      let canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      this.image = canvas.toDataURL();
      this.showImage = true;
      this.showCamera = false;
    },
    processFile(event) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          let canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          let ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          let code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            this.result = code.data;
          } else {
            this.result = "No QR code found";
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }
});
//Qr
let img = document.createElement("img");
let qr = document.querySelector(".qr-code");
qr.appendChild(img);

function generate() {
        let input = document.getElementById("input");
        if (input.value) {
                input.style.borderColor = "#c7c7c7";
                img.src = `https://api.qrserver.com/v1/create-qr-code/?size=180×180&data=${input.value}`;
        }
        else {
                input.style.borderColor = "red";
                return false;
        }
        input.value = "";
}
//comment
         const timeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
  
    let interval = seconds / 31536000;
  
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    
    if (seconds < 10) {
        return "just now";
    }

    return Math.floor(seconds) + " seconds ago";
};

const users = {
    'alex1': {
        name: 'WORLOX',
        src: 'https://th.bing.com/th/id/OIP.PubqxuQFmzGAwfwFikhDKgHaLI?pid=ImgDetMain'
    }
};

const loggedUser = users['alex1'];


let comments = JSON.parse(localStorage.getItem('comments')) || [

        ];

const authedUser = document.querySelector('.authed-user');
const authorHTML = DOMPurify.sanitize(`<img class="avatar" src="${loggedUser.src}" alt="${loggedUser.name}">`);
authedUser.innerHTML = authorHTML;

const commentsWrapper = document.querySelector('.discussion__comments');

const createComment = (comment) => {
    const newDate = new Date(comment.createdAt);
    return DOMPurify.sanitize(`<div class="commen" data-id="${comment.id}">
    
        <div class="avatar">
   <img class="avatar" src="${comment.author.src}" alt="${comment.author.name}">
        </div>
        
        <div class="comment__body">
              <div class="comment__author">
                ${comment.author.name}
                <time datetime="${comment.createdAt}" class="comment__date">
                    ${timeSince(newDate)}
 <button class="delete-comment" data-id="${comment.id}">delete</button>
         
                </time>
                   
        
            </div>
            <div class="comment__text">
                <p>${comment.text}</p>
            </div>
                     
</div>
    </div>`);
};

const commentsMapped = comments.map(comment =>
    createComment(comment)
);

const innerComments = commentsMapped.join('');
commentsWrapper.innerHTML = innerComments;

const newCommentForm = document.getElementById('newcomment__form');
const newCommentTextarea = document.querySelector('#newcomment__form textarea');

document.getElementById('reset-button').addEventListener(
    'click', 
    () => {
        newCommentForm.reset();
    }
);

newCommentForm.addEventListener(
    'submit', 
    (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newCommentTextareaValue = newCommentTextarea.value;

        const newComment = {
            id: comments.length + 1,
            text: newCommentTextareaValue,
            author: loggedUser,
            createdAt: new Date().toISOString(),
        };

        comments.unshift(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));

        const comment = document.createElement('div');
        comment.innerHTML = createComment(newComment);

        if (commentsWrapper.hasChildNodes()) {
            commentsWrapper.insertBefore(comment, commentsWrapper.childNodes[0]);          
        } else {
            commentsWrapper.appendChild(comment);
        }

        newCommentForm.reset();
    }
);

commentsWrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-comment')) {
        const commentId = parseInt(e.target.getAttribute('data-id'));
        deleteComment(commentId);
    }
});

const deleteComment = (commentId) => {
    comments = comments.filter(comment => comment.id !== commentId);
    updateLocalStorage();
    renderComments();
};

const updateLocalStorage = () => {
    localStorage.setItem('comments', JSON.stringify(comments));
};

const renderComments = () => {
    const commentsMapped = comments.map(comment => createComment(comment));
    const innerComments = commentsMapped.join('');
    commentsWrapper.innerHTML = innerComments;
};
document.addEventListener("DOMContentLoaded", function() {
        // قم بفحص ما إذا كان اسم المستخدم والصورة مسجلين بالفعل في localStorage
        const storedUsername = localStorage.getItem("username");
        const storedImage = localStorage.getItem("userImage");

      if (!storedUsername || !storedImage) {
        } else {
        }
});


//menu 2
function toggleMen() {
        var buttonContainer = document.querySelector('.men2');
        buttonContainer.style.bottom = buttonContainer.style.bottom === '0%' ? '-50%' : '0%';
}

function resetMenu() {
        var buttonContainer = document.querySelector('.men2');
        buttonContainer.style.bottom = '-100%';
}
//statut
function showPopup(popupId) {
        document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
        document.getElementById(popupId).style.display = 'none';
}

document.querySelectorAll('.sititi').forEach(function(element) {
        element.addEventListener('click', function() {
                var popupId = this.getAttribute('data-popup');
                showPopup(popupId);
        });
});
//logha
function convertLanguage() {
      var inputText = document.getElementById("inputText").value;
      var outputText = "";

      for (var i = 0; i < inputText.length; i++) {
        var char = inputText.charAt(i);
        switch (char) {
          case "~": outputText += "A"; break;
          case "`": outputText += "B"; break;
          case "!": outputText += "C"; break;
          case "@": outputText += "D"; break;
          case "#": outputText += "E"; break;
          case "$": outputText += "F"; break;
          case "%": outputText += "G"; break;
          case "^": outputText += "H"; break;
          case "&": outputText += "I"; break;
          case "*": outputText += "J"; break;
          case "(": outputText += "K"; break;
          case ")": outputText += "L"; break;
          case "-": outputText += "M"; break;
          case "_": outputText += "N"; break;
          case "+": outputText += "O"; break;
          case "=": outputText += "P"; break;
          case "{": outputText += "Q"; break;
          case "}": outputText += "R"; break;
          case "[": outputText += "S"; break;
          case "]": outputText += "T"; break;
          case ";": outputText += "U"; break;
          case ":": outputText += "V"; break;
          case "'": outputText += "W"; break;
          case '"': outputText += "X"; break;
          case "<": outputText += "Y"; break;
          case ">": outputText += "Z"; break;
          default: outputText += char; break;
        }
      }

      document.getElementById("outputText").innerText = outputText;
    }
    //#2long
    function convertToLanguageA() {
      var ink = document.getElementById("ink").value;
      var but = "";

      for (var i = 0; i < ink.length; i++) {
        var char = ink.charAt(i);
        switch (char.toUpperCase()) {
          case "A": but += "~"; break;
          case "B": but += "`"; break;
          case "C": but += "!"; break;
          case "D": but += "@"; break;
          case "E": but += "#"; break;
          case "F": but += "$"; break;
          case "G": but += "%"; break;
          case "H": but += "^"; break;
          case "I": but += "&"; break;
          case "J": but += "*"; break;
          case "K": but += "("; break;
          case "L": but += ")"; break;
          case "M": but += "-"; break;
          case "N": but += "_"; break;
          case "O": but += "+"; break;
          case "P": but += "="; break;
          case "Q": but += "{"; break;
          case "R": but += "}"; break;
          case "S": but += "["; break;
          case "T": but += "]"; break;
          case "U": but += ";"; break;
          case "V": but += ":"; break;
          case "W": but += "'"; break;
          case "X": but += "\""; break;
          case "Y": but += "<"; break;
          case "Z": but += ">"; break;
          default: but += char; break;
        }
      }

      document.getElementById("but").innerText = but;
    }
    
    
  function openpotete(evt, poteteName) {
        var i, potetecontent, potetelinks;
        potetecontent = document.getElementsByClassName("potetecontent");
        for (i = 0; i < potetecontent.length; i++) {
                potetecontent[i].style.display = "none";
        }
        potetelinks = document.getElementsByClassName("potetelinks");
        for (i = 0; i < potetelinks.length; i++) {
                potetelinks[i].className = potetelinks[i].className.replace(" active", "");
        }
        document.getElementById(poteteName).style.display = "block";
        evt.currentTarget.className += " active";
}

// Display the SignUp potete by default
document.getElementById("SignUp").style.display = "block";  
    
    
//profile photo chonge
function uploadImage() {
        const input = document.getElementById('imgee');
        const preview = document.getElementById('profilee');

        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
                preview.src = e.target.result;

                // قم بتخزين الصورة في localStorage
                localStorage.setItem('uploadedImage', e.target.result);
        };

        if (file) {
                reader.readAsDataURL(file);
        }
}

// قم بفحص localStorage عند تحميل الصفحة
window.onload = function() {
        const storedImage = localStorage.getItem('uploadedImage');

        if (storedImage) {
                const preview = document.getElementById('profilee');
                preview.src = storedImage;
        }
};

var storedUsername = localStorage.getItem("username");

// إذا كان هناك اسم مستخدم مسجل، استخدمه
if (storedUsername !== null && storedUsername !== "") {
        document.getElementById("usernameDisplay").innerHTML = storedUsername;
}
//profilr username chonge
function updateUsername() {
        // اطلب اسم المستخدم الجديد
        var username = prompt("الرجاء إدخال اسم المستخدم:");

        // تحقق من أن المستخدم أدخل اسمًا قبل تحديث العرض وحفظه في localStorage
        if (username !== null && username !== "") {
                // قم بتحديث عرض الاسم وحفظ الاسم الجديد في localStorage
                document.getElementById("usernameDisplay").innerHTML = username;
                localStorage.setItem("username", username);
        }
}
//siport
function sendEmail() {
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const messagge = document.getElementById('messagge').value;

        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messagge)}`;

        window.location.href = mailtoLink;
}

//copie click logha
function copye() {
        // إنشاء عنصر مؤقت للاحتفاظ بالنص
        var tempElement = document.createElement("textarea");
        tempElement.value = document.getElementById("outputText").innerText;
        document.body.appendChild(tempElement);

        // نسخ النص من العنصر المؤقت
        tempElement.select();
        document.execCommand("copy");

        // إزالة العنصر المؤقت
        document.body.removeChild(tempElement);

        // عرض رسالة تأكيد
        alert("تم نسخ النص: " + tempElement.value);
}
function copyTe() {
        // إنشاء عنصر مؤقت للاحتفاظ بالنص
        var tempElement = document.createElement("textarea");
        tempElement.value = document.getElementById("but").innerText;
        document.body.appendChild(tempElement);

        // نسخ النص من العنصر المؤقت
        tempElement.select();
        document.execCommand("copy");

        // إزالة العنصر المؤقت
        document.body.removeChild(tempElement);

        // عرض رسالة تأكيد
        alert("تم نسخ النص: " + tempElement.value);
}