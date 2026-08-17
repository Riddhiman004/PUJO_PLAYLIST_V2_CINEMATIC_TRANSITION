/*
  PUJO PLAYLIST — SONG LIBRARY

  Put your own legally obtained/licensed MP3 files into:
    songs/old-gold/
    songs/new-dance/
    songs/mahalaya/

  Then set the "file" field, for example:
    file: "songs/old-gold/my-song.mp3"

  You can add/remove tracks freely. No song files are bundled with this project.
*/

const blank = (title, artist, file="") => ({ title, artist, file });

const playlists = {
  oldGold: {
    badge: "🪔 OG",
    title: "OLD GOLD",
    description: "The timeless sounds of Durga Puja.",
    tracks: [
      blank("Ami Khola Janala Tumi",
  "Bengali Song",
  "songs/old-gold/Ami Khola Janala Tumi (PenduJatt.Com.Se) (1).mp3"
),
      blank("Katha Hoyechhilo",
  "Bengali Song",
  "songs/old-gold/Katha Hoyechhilo (PenduJatt.Com.Se).mp3"
),
      blank("Tomari Chalar Pathe Ekanta Apan",
  "Asha Bhosle",
  "songs/old-gold/Tomari-Chalar-Pathe-Ekanta-Apan-Bengali-Movie-Song-Asha-Bhosle.mp3"
),
      blank("Aamar Pujar Phool",
      "Bengali Song",
      "songs/old-gold/Aamar Pujar Phool (PenduJatt.Com.Se).mp3"
    ),
      blank("Rimi Jhimi Ei Srabane",
      "Bengali Song",
      "songs/old-gold/Rimi Jhimi Ei Srabane (PenduJatt.Com.Se).mp3"
    ),
      blank("Bandha Moner Duar",
      "Bengali Song",
      "songs/old-gold/Bandha Moner Duar (PenduJatt.Com.Se).mp3"
    ),

      blank("Chokhe Chokhe Katha Balo",
      "Bengali Song",
      "songs/old-gold/Chokhe Chokhe Katha Balo (PenduJatt.Com.Se).mp3"
    ),
      blank( "Ektu Baso Chole Jeo Na",
      "Bengali Song",
      "songs/old-gold/Ektu Baso Chole Jeo Na (PenduJatt.Com.Se).mp3"
    ),
      blank("Hoyto Amake Karo Mone",
      "Bengali Song",
      "songs/old-gold/Hoyto Amake Karo Mone (PenduJatt.Com.Se).mp3"
    ),

      blank("Katha Dilam",
      "Bengali Song",
      "songs/old-gold/Katha Dilam (PenduJatt.Com.Se).mp3"
    ),

      blank("Katha Hoyechhilo",
      "Bengali Song",
      "songs/old-gold/Katha Hoyechhilo (PenduJatt.Com.Se).mp3"
    ),
      blank( "Mohuay Jomeche Aaj Mou Go",
      "Bengali Song",
      "songs/old-gold/Mohuay Jomeche Aaj Mou Go (PenduJatt.Com.Se).mp3"
    ),

      blank("Nayan Sarasi Keno Bhoreche Jaale",
      "Bengali Song",
      "songs/old-gold/Nayan Sarasi Keno Bhoreche Jaale (PenduJatt.Com.Se).mp3"
    ),

      blank("Se Jeno Aamar Pashe",
      "Bengali Song",
      "songs/old-gold/Se Jeno Aamar Pashe (PenduJatt.Com.Se).mp3"
    ),

      blank("Tomari Chalar Pathe Ekanta Apan",
      "Asha Bhosle",
      "songs/old-gold/Tomari-Chalar-Pathe-Ekanta-Apan-Bengali-Movie-Song-Asha-Bhosle.mp3"),
      blank("Old Gold Song 16", "Add artist", ""),
      blank("Old Gold Song 17", "Add artist", ""),
      blank("Old Gold Song 18", "Add artist", ""),
      blank("Old Gold Song 19", "Add artist", ""),
      blank("Old Gold Song 20", "Add artist", "")
    ]
  },

  newDance: {
    badge: "💃 NEW",
    title: "NEW DANCE PUJO",
    description: "Fresh beats for the modern Pujo.",
    tracks: [
      blank("Dhak Baja Kashor Baja",
"Traditional Pujo Beat",
"songs/new-dance/Dhak Baja Kashor Baja (PenduJatt.Com.Se).mp3"
  ),

      blank("Dhaker Taley",
"Bengali Song",
"songs/new-dance/Dhaker-Taley-Lyrical-Dev-Subhashree-Jeet-Gannguli-Abhijeet-Parinita-Sudipto-SVF-Music.mp3"
),
      blank("Bhojo Gourango",
      "Bengali Song",
      "songs/new-dance/Bhojo Gourango (PenduJatt.Com.Se).mp3"
    ),
      blank("Dhitang Dhitang",
      "Bengali Song",
      "songs/new-dance/Dhitang Dhitang (PenduJatt.Com.Se).mp3"
    ),
      blank("Item Bomb",
      "Bengali Song",
      "songs/new-dance/Item Bomb (PenduJatt.Com.Se).mp3"
    ),
      blank("Latai",
      "Bengali Song",
      "songs/new-dance/Latai (PenduJatt.Com.Se).mp3"
    ),

      blank( "Love Me",
      "Bengali Song",
      "songs/new-dance/Love Me (PenduJatt.Com.Se).mp3"
    ),

      blank("Mala Re",
"Bengali Song",
"songs/new-dance/Mala-Re-মালা-রে-Romeo-Dev-Subhashree-Jeet-Gannguli-Sujit-Mondol-SVF.mp3"
),
      blank("Mon Mane Na",
      "Bengali Song",
      "songs/new-dance/Mon Mane Na (PenduJatt.Com.Se).mp3"
    ),
      blank( "Monta Kore Uru Uru",
      "Bengali Song",
      "songs/new-dance/Monta Kore Uru Uru (PenduJatt.Com.Se).mp3"
    ),
      blank( "Oh Madhu",
      "Bengali Song",
      "songs/new-dance/Oh Madhu (PenduJatt.Com.Se).mp3"
    ),
      blank("Tui Amar Hero",
      "Bengali Song",
      "songs/new-dance/Tui Amar Hero (PenduJatt.Com.Se).mp3"
    ),
      blank("New Dance Song 13", "Add artist", ""),
      blank("New Dance Song 14", "Add artist", ""),
      blank("New Dance Song 15", "Add artist", ""),
      blank("New Dance Song 16", "Add artist", ""),
      blank("New Dance Song 17", "Add artist", ""),
      blank("New Dance Song 18", "Add artist", ""),
      blank("New Dance Song 19", "Add artist", ""),
      blank("New Dance Song 20", "Add artist", "")
    ]
  },

  mahalaya: {
    badge: "🔱 MAHALAYA",
    title: "MAHALAYA",
    description: "The dawn of Devi Paksha.",
    tracks: [
      blank("Bajlo Tomar Alor Benu",
    "Artist",
    "songs/mahalaya/Bajlo-Tomar-Alor-Benu.mp3"
  ),
      blank("Aham Rudre", "Mahalaya", "songs/mahalaya/Aham Rudre (Pendujatt.Com.Se).mp3"),
      blank("Durge Durge Durgatinashini", "Mahalaya", "songs/mahalaya/Durge Durge Durgatinashini (Pendujatt.Com.Se).mp3"),
      blank("Jago Tumi Jago", "Mahalaya", "songs/mahalaya/Jago Tumi Jago (Pendujatt.Com.Se).mp3"),
      blank("Ogo Amar Agomoni", "Mahalaya", "songs/mahalaya/Ogo-Amar-Agomoni.mp3"),
      blank("Rupang Dehi Jayang Dehi", "Mahalaya", "songs/mahalaya/Rupang Dehi Jayang Dehi (Pendujatt.Com.Se).mp3"),
      blank("Ya Chandi", "Mahalaya", "songs/mahalaya/Ya Chandi (Pendujatt.Com.Se).mp3"),
      blank("Mahalaya Track 08", "Add artist", ""),
      blank("Mahalaya Track 09", "Add artist", ""),
      blank("Mahalaya Track 10", "Add artist", "")
    ]
  }
};
