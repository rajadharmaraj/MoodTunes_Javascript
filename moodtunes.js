/**
 * MoodTunes - Music Playlist Manager
 * Created by me for AP Computer Science Principles - Senior Project
 * Date: April 2025
 * 
 * This program creates playlists based on your mood and helps discover music
 * that matches how you're feeling right now.
 */

// ===== DATA ABSTRACTION =====
// These arrays store our music data and user selections
let musicLibrary = []; // Stores all available songs
let currentPlaylist = []; // Stores the current mood-based playlist
let userMood = ""; // Stores the user's selected mood

// This object maps different moods to musical characteristics
// This makes it easy to match songs to how the user is feeling
const moodProfiles = {
  happy: { tempo: "upbeat", energy: "high", valence: "positive" },
  sad: { tempo: "slow", energy: "low", valence: "negative" },
  focused: { tempo: "medium", energy: "medium", valence: "neutral", instrumental: true },
  energetic: { tempo: "fast", energy: "high", valence: "positive" },
  relaxed: { tempo: "slow", energy: "low", valence: "positive" }
};

// ===== PROGRAM INITIALIZATION =====
// When the page loads, set everything up
window.addEventListener("load", function() {
  // Load our music library from a file
  loadMusicLibrary();
  
  // Set up the mood selection buttons
  setupMoodButtons();
  
  // Set up the playlist control buttons
  setupPlaylistControls();
});

// ===== INPUT HANDLING =====
// Function to load music from a JSON file
function loadMusicLibrary() {
  // This simulates loading from a file - in a real app, I'd use fetch() to get external data
  musicLibrary = [
    { id: 1, title: "Happy Days", artist: "Sunshine Band", tempo: "upbeat", energy: "high", valence: "positive", genre: "pop", duration: 180 },
    { id: 2, title: "Blue Monday", artist: "Melancholy Group", tempo: "slow", energy: "low", valence: "negative", genre: "indie", duration: 210 },
    { id: 3, title: "Study Session", artist: "Focus Ensemble", tempo: "medium", energy: "medium", valence: "neutral", genre: "instrumental", duration: 195, instrumental: true },
    { id: 4, title: "Energy Boost", artist: "Power Trio", tempo: "fast", energy: "high", valence: "positive", genre: "rock", duration: 165 },
    { id: 5, title: "Ocean Waves", artist: "Calm Collective", tempo: "slow", energy: "low", valence: "positive", genre: "ambient", duration: 240 },
    { id: 6, title: "Dancing Queen", artist: "Party People", tempo: "upbeat", energy: "high", valence: "positive", genre: "disco", duration: 185 },
    { id: 7, title: "Rainy Day", artist: "Melancholy Group", tempo: "slow", energy: "low", valence: "negative", genre: "indie", duration: 205 },
    { id: 8, title: "Deep Focus", artist: "Concentration Masters", tempo: "medium", energy: "medium", valence: "neutral", genre: "electronic", duration: 220, instrumental: true },
    { id: 9, title: "Workout Mix", artist: "Cardio Kings", tempo: "fast", energy: "high", valence: "positive", genre: "electronic", duration: 175 },
    { id: 10, title: "Sunset Chill", artist: "Lounge Lizards", tempo: "slow", energy: "low", valence: "positive", genre: "lofi", duration: 230 }
  ];
  
  console.log("Music library loaded with " + musicLibrary.length + " songs.");
  displayMusicLibrary();
}

// Function to set up mood selection buttons
function setupMoodButtons() {
  const moodButtons = document.querySelectorAll(".mood-button");
  
  moodButtons.forEach(button => {
    button.addEventListener("click", function() {
      // Get the user's mood selection when they click a button
      userMood = this.dataset.mood;
      console.log("User selected mood: " + userMood);
      
      // Call my custom procedure to create a playlist based on the mood
      currentPlaylist = createMoodBasedPlaylist(userMood, musicLibrary);
      
      // Show the new playlist to the user
      displayPlaylist(currentPlaylist);
    });
  });
}

// Function to set up playlist control buttons
function setupPlaylistControls() {
  // Play button to start playback
  document.getElementById("play-button").addEventListener("click", function() {
    console.log("Playing current playlist");
    alert("Now playing your " + userMood + " playlist!");
  });
  
  // Shuffle button to randomize the playlist order
  document.getElementById("shuffle-button").addEventListener("click", function() {
    shufflePlaylist(currentPlaylist);
    displayPlaylist(currentPlaylist);
  });
  
  // Save button to store the playlist
  document.getElementById("save-button").addEventListener("click", function() {
    savePlaylist(currentPlaylist, userMood);
  });
}

// ===== MY STUDENT-DEVELOPED PROCEDURE =====
/**
 * createMoodBasedPlaylist - Creates a personalized playlist based on user's mood
 * 
 * This is my original procedure that I developed for this project.
 * 
 * @param {string} mood - The user's current emotional state
 * @param {array} library - The collection of songs to search through
 * @return {array} - A collection of songs that match the mood profile
 * 
 * Algorithm features:
 * - Sequencing: Steps executed in sequential order
 * - Selection: Uses if/else statements to determine song matches
 * - Iteration: Loops through the music library to evaluate songs
 */
function createMoodBasedPlaylist(mood, library) {
  // Log the start of our procedure
  console.log("Creating playlist for mood: " + mood);
  
  // Initialize an empty array to store matched songs
  let matchedSongs = [];
  
  // SEQUENCING STEP 1: Get the profile for the selected mood
  const profile = moodProfiles[mood];
  
  // SELECTION: Check if the mood is valid
  if (!profile) {
    console.log("Unknown mood: " + mood);
    return matchedSongs; // Return empty playlist if mood is not recognized
  }
  
  // SEQUENCING STEP 2: Iterate through the music library to find matching songs
  // ITERATION: Loop through each song in the library
  for (let i = 0; i < library.length; i++) {
    const song = library[i];
    let matchScore = 0;
    
    // SELECTION: Check if song attributes match the mood profile
    if (song.tempo === profile.tempo) {
      matchScore += 2; // Tempo match is worth 2 points
    }
    
    if (song.energy === profile.energy) {
      matchScore += 2; // Energy match is worth 2 points
    }
    
    if (song.valence === profile.valence) {
      matchScore += 3; // Valence (emotional tone) match is worth 3 points
    }
    
    // SELECTION: Special case for "focused" mood which prefers instrumental music
    if (profile.instrumental && song.instrumental) {
      matchScore += 3; // Instrumental preference is worth 3 points for the focused mood
    }
    
    // SELECTION: If the song has a high enough match score, add it to the playlist
    if (matchScore >= 4) {
      matchedSongs.push(song);
    }
  }
  
  // SEQUENCING STEP 3: If we don't have enough songs, add some with lower match scores
  // SELECTION: Check if we need more songs
  if (matchedSongs.length < 5) {
    // ITERATION: Loop through the library again to find more songs
    for (let i = 0; i < library.length; i++) {
      const song = library[i];
      
      // SELECTION: Skip songs that are already in our playlist
      if (matchedSongs.some(match => match.id === song.id)) {
        continue;
      }
      
      // SELECTION: Add songs that match at least one criterion
      if (song.tempo === profile.tempo || 
          song.energy === profile.energy || 
          song.valence === profile.valence) {
        matchedSongs.push(song);
      }
      
      // SELECTION: Break if we have enough songs now
      if (matchedSongs.length >= 5) {
        break;
      }
    }
  }
  
  // SEQUENCING STEP 4: Sort the playlist by match quality
  matchedSongs.sort((a, b) => {
    // SELECTION: Prioritize songs that match the mood's valence
    if (a.valence === profile.valence && b.valence !== profile.valence) {
      return -1; // a comes before b
    } else if (a.valence !== profile.valence && b.valence === profile.valence) {
      return 1; // b comes before a
    }
    return 0; // no change in order
  });
  
  console.log("Created playlist with " + matchedSongs.length + " songs for mood: " + mood);
  return matchedSongs;
}

// ===== OUTPUT HANDLING =====
// Function to display the music library on the screen
function displayMusicLibrary() {
  const libraryContainer = document.getElementById("library-container");
  
  if (libraryContainer) {
    libraryContainer.innerHTML = "<h3>Music Library</h3>";
    
    const table = document.createElement("table");
    table.innerHTML = `
      <tr>
        <th>Title</th>
        <th>Artist</th>
        <th>Genre</th>
        <th>Duration</th>
      </tr>
    `;
    
    // Show each song in the table
    musicLibrary.forEach(song => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${song.title}</td>
        <td>${song.artist}</td>
        <td>${song.genre}</td>
        <td>${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, '0')}</td>
      `;
      table.appendChild(row);
    });
    
    libraryContainer.appendChild(table);
  }
}

// Function to display the current playlist on the screen
function displayPlaylist(playlist) {
  const playlistContainer = document.getElementById("playlist-container");
  
  if (playlistContainer) {
    playlistContainer.innerHTML = `<h3>Your "${userMood}" Mood Playlist</h3>`;
    
    // Handle empty playlists
    if (playlist.length === 0) {
      playlistContainer.innerHTML += "<p>No songs found for this mood. Try another mood!</p>";
      return;
    }
    
    // Create a table to display the playlist
    const table = document.createElement("table");
    table.innerHTML = `
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Artist</th>
        <th>Duration</th>
      </tr>
    `;
    
    // Add each song to the table
    playlist.forEach((song, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${song.title}</td>
        <td>${song.artist}</td>
        <td>${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, '0')}</td>
      `;
      table.appendChild(row);
    });
    
    playlistContainer.appendChild(table);
    
    // Show the playlist controls
    document.getElementById("playlist-controls").style.display = "block";
  }
}

// Function to shuffle the playlist
function shufflePlaylist(playlist) {
  for (let i = playlist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements using destructuring assignment
    [playlist[i], playlist[j]] = [playlist[j], playlist[i]]; 
  }
  console.log("Playlist shuffled");
}

// Function to save the current playlist
function savePlaylist(playlist, mood) {
  const playlistName = prompt("Enter a name for your playlist:", mood + " Mix");
  
  if (playlistName) {
    // In a real app, this would save to a database or local storage
    console.log("Saving playlist: " + playlistName);
    alert("Playlist '" + playlistName + "' saved successfully!");
  }
}