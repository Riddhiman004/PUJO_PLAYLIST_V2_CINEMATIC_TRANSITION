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
      blank("Moner Janala Dhare",
"Bengali Old Song",
"songs/old-gold/01. Moner Janala Dhare.mp3"),

blank("Dadhua Amar Chukhe",
"Bengali Old Song",
"songs/old-gold/02. Dadhua Amar Chukhe.mp3"),

blank("Nam Harano",
"Bengali Old Song",
"songs/old-gold/003. Nam Harano.mp3"),

blank("Jeona Dokhina Dare",
"Bengali Old Song",
"songs/old-gold/004. Jeona Dokhina Dare.mp3"),

blank("Alo Borosa",
"Bengali Old Song",
"songs/old-gold/05 alo borosa.mp3"),

blank("Moner Darja Khule Dilam",
"Bengali Old Song",
"songs/old-gold/05 MONER DARJA KHULE DILAM{AAMAR BHALOBASA}.mp3"),

blank("Bombay Khub Dure Noy",
"Bengali Old Song",
"songs/old-gold/06 BOMBAY KHUB DURE NOY{AAMAR BHALOBASA}.mp3"),

blank("Keu Bolche",
"Bengali Old Song",
"songs/old-gold/006. Keu Bolche.mp3"),

blank("Raa",
"Bengali Old Song",
"songs/old-gold/006A_RAA.MP3"),

blank("Jibon Purer",
"Bengali Old Song",
"songs/old-gold/07 jibon purer.MP3"),

blank("Ke Ese Rakhikake",
"Bengali Old Song",
"songs/old-gold/07 KE ESE RAKHIKAKE{AAMAR BHALOBASA}.mp3"),

blank("Shopno To Keu Dekhche Na",
"Bengali Old Song",
"songs/old-gold/007. Shopno To Keu Dekhche Na.mp3"),

blank("Cholat Cholat Dheu",
"Bengali Old Song",
"songs/old-gold/008. Cholat Cholat Dheu.mp3"),

blank("Basi",
"Bengali Old Song",
"songs/old-gold/09 basi.mp3"),

blank("Cheleti Nam Megh",
"Bengali Old Song",
"songs/old-gold/009. Cheleti Nam Megh.mp3"),

blank("Ami Khola Janala",
"Bengali Old Song",
"songs/old-gold/010. Ami Khola Janala.mp3"),

blank("Tomer Kache",
"Bengali Old Song",
"songs/old-gold/011. Tomer Kache.mp3"),

blank("Le",
"Bengali Old Song",
"songs/old-gold/011A_LE.MP3"),

blank("Eka Eka",
"Bengali Old Song",
"songs/old-gold/012. Eka Eka.mp3"),

blank("Ai Jh",
"Bengali Old Song",
"songs/old-gold/012AI_JH.MP3"),

blank("Ghum Ghum Chand",
"Bengali Old Song",
"songs/old-gold/13. Ghum Ghum Chand.mp3"),

blank("Pothe Pothe",
"Bengali Old Song",
"songs/old-gold/013. Pothe Pothe.mp3"),

blank("Tomake Boler Chilo",
"Bengali Old Song",
"songs/old-gold/014. Tomake Boler Chilo.mp3"),

blank("Ek Chilte Megh",
"Bengali Old Song",
"songs/old-gold/015. Ek Chilte Megh.mp3"),

blank("Ami Ektu Amer Sange",
"Bengali Old Song",
"songs/old-gold/016. Ami Ektu Amer Sange.mp3"),

blank("Gane Moor Koon",
"Bengali Old Song",
"songs/old-gold/16. Gane Moor Koon.mp3"),

blank("Ami Tar Chhalonai",
"Bengali Old Song",
"songs/old-gold/17.Ami Tar Chhalonai.mp3"),

blank("Tumi Jamoni Nupuri Hayo",
"Bengali Old Song",
"songs/old-gold/033 TUMI JAMONI NUPURI HAYO.mp3"),

blank("Balo To Ki Kore Ghar Bandha",
"Bengali Old Song",
"songs/old-gold/040 BALO TO KI KORE GHAR BANDHA.mp3"),

blank("Uru Uru Mon Aaj",
"Bappi Lahiri & Alka Yagnik",
"songs/old-gold/055 URU URU MON AAJ(BAPPI LAHERI & ALKA YAGNIK).mp3"),

blank("Kanacher Churir Chhatay",
"Bengali Old Song",
"songs/old-gold/a kanacher churir chhatay.mp3"),

blank("Akasher Astaragey",
"Bengali Old Song",
"songs/old-gold/AKASHER ASTARAGEY_SURYAMUKHI.mp3"),

blank("Mixer In Track 15",
"Bengali Old Song",
"songs/old-gold/Artist - mixer in track 15.mp3"),

blank("Kono Din Bala Kara",
"Bengali Old Song",
"songs/old-gold/B KONO DIN BALA KARA.mp3"),

blank("Mona Koro Aami Nai",
"Bengali Old Song",
"songs/old-gold/b mona koro aami nai.mp3"),

blank("O Kokila Tore Sudhai Re",
"Bengali Old Song",
"songs/old-gold/B O KOKILA TORE SUDHAI RE.mp3"),

blank("Aaj Bikele Dake",
"Bengali Old Song",
"songs/old-gold/c aaj bikele dake.mp3"),

blank("Aamar Sapna Dekha",
"Bengali Old Song",
"songs/old-gold/d aamar sapna dekha.mp3"),

blank("Aar Kato Rahibo",
"Bengali Old Song",
"songs/old-gold/D AAR KATO RAHIBO.mp3"),

blank("Ache Gour Nitai",
"Bengali Old Song",
"songs/old-gold/d ache gour nitai.mp3"),

blank("Asho Asho Prio",
"Bengali Old Song",
"songs/old-gold/e asho asho prio.mp3"),

blank("Bharat Aamar Bharat Barsho",
"Bengali Old Song",
"songs/old-gold/E BHARAT AAMAR BHARAT BARSHO.mp3"),

blank("Gane Prajapati",
"Bengali Old Song",
"songs/old-gold/E GANE PRAJAPATI_DEYA NEYA.mp3"),

blank("Sudhu Ganer Din",
"Bengali Old Song",
"songs/old-gold/E SUDHU GANER DIN_PATHE HOLO DERI.mp3"),

blank("Ei Path Jadi Na Sesh Hoi",
"Hemanta Mukherjee & Sandhya Mukherjee",
"songs/old-gold/EI PATH JADI NA SESH HOI_SAPTAPADI_HEMANTA-SANDHYA.mp3"),

blank("Khub Jante Ichhe Kore",
"Bengali Old Song",
"songs/old-gold/F KHUB JANTE ICHHE KORE.mp3"),

blank("Mity Mity Tarara",
"Bengali Old Song",
"songs/old-gold/f mity mity tarara.mp3"),

blank("Muchhe Jaoa Din Guli",
"Bengali Old Song",
"songs/old-gold/F MUCHHE JAOA DIN GULI.mp3"),

blank("Dash Bachhrer Banshi",
"Bengali Old Song",
"songs/old-gold/g_DASH BACHHRER BANSHI.mp3"),

blank("Hridaer Gaan Sikhe",
"Bengali Old Song",
"songs/old-gold/G HRIDAER GAAN SIKHE.mp3"),

blank("Sai Gan Keno Aami",
"Bengali Old Song",
"songs/old-gold/g sai gan keno aami.mp3"),

blank("Ghum Ghum Chand",
"Bengali Old Song",
"songs/old-gold/GHUM GHUM CHAND_SABAR UPARE.mp3"),

blank("Ja Ja Ja Ure",
"Bengali Old Song",
"songs/old-gold/h ja ja ja ure.mp3"),

blank("Jadi Kagaje Lekho Naam",
"Bengali Old Song",
"songs/old-gold/I JADI KAGAJE LEKHO NAAM.mp3"),

blank("Mon Metechhe Mon",
"Bengali Old Song",
"songs/old-gold/i mon metechhe mon.mp3"),

blank("Janina Phurabe Kabe",
"Bengali Old Song",
"songs/old-gold/JANINA PHURABE KABE_SABAR UPARE.mp3"),

blank("Ka Fota Chokher Jal",
"Bengali Old Song",
"songs/old-gold/K KA FOTA CHOKHER JAL.mp3"),

blank("Keno E Hriday",
"Bengali Old Song",
"songs/old-gold/KENO E HRIDAY_NAYIKA SAMBAD.mp3"),

blank("Ki Mishti Dekho Mishti",
"Bengali Old Song",
"songs/old-gold/KI MISHTI DEKHO MISHTI_ANTONY PHRINGI.mp3"),

blank("Coffee Houser Sri Aada",
"Bengali Old Song",
"songs/old-gold/L COFFEE HOUSER SRI AADA.mp3"),

blank("Raag Je Tomar Mishti",
"Hemanta Mukherjee & Sandhya Mukherjee",
"songs/old-gold/RAAG JE TOMAR MISHTI_PITA PUTRA_HEMANTA-SANDHYA.mp3"),

blank("Sankha Bajiye Make",
"Bengali Old Song",
"songs/old-gold/SANKHA BAJIYE MAKE_DABI.mp3"),

blank("Saradin Tomar Kathai",
"Shyamal Mitra & Sandhya Mukherjee",
"songs/old-gold/SARADIN TOMAR KATHAI_ANTARAL_SHYAMAL-SANDHYA.mp3"),

blank("Teer Bendha Pakhi",
"Bengali Old Song",
"songs/old-gold/TEER BENDHA PAKHI_PITAPUTRA.mp3"),

blank("Tomake Sonate Gaan",
"Bengali Old Song",
"songs/old-gold/tomake sonate gaan.mp3")
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
      blank(
  "A Raja Raja Raja Kareja Mein Samaja",
  "DJ Dance Mix",
  "songs/new-dance/A_Raja_Raja_Raja_Kareja_Mein_Samaja_full_DJ_dance_mix(128k).mp3"
),

blank(
  "Aam Paka Jam Paka",
  "DJ Palash",
  "songs/new-dance/Aam_Paka_Jam_Paka_Paka_Anaros_Dj_Song-Hard_Dholki_Mix_Dj_Palash(128k).mp3"
),

blank(
  "Aankh Mare",
  "DJ Remix",
  "songs/new-dance/Aankh_Mare__O_Ladki_Aankh_Mare_SIMMBA__DJ_REMIX_SONG_Bollywood_Latest_Song_2018(128k).mp3"
),

blank(
  "AC AC Lahanga",
  "DJ Remix",
  "songs/new-dance/Ac_Ac_Lahanga_Ac_Khojata_Dj_Song__Lahanga_Ac_Khojata_Bhojpuri_Dj_Remix_Song__Lahanga_Ac_Khojata_Dj(128k).mp3"
),

blank(
  "Amra Anechi Purulia DJ",
  "DJ SP Production / DJ Rex",
  "songs/new-dance/Amra_Anechi_Purulia_Dj_(_Dj_SP_PRODUCTION_)__BY_DJ_REX(128k).mp3"
),

blank(
  "Uri Baba",
  "Bengali DJ Song",
  "songs/new-dance/Uri baba DJ.mp3"
),

blank(
  "Bhije Gachi Jete Jete",
  "DJ Amit",
  "songs/new-dance/Bhije_Gachi_Jete_Jete_(New_Style_Dholki_Mix)_Dj_Song_-_-_Mix_by_DJ_Amit(128k).mp3"
),

blank(
  "Bhojo Gourango",
  "Bengali Song",
  "songs/new-dance/Bhojo Gourango (PenduJatt.Com.Se).mp3"
),

blank(
  "Dekhe Naker Nathni",
  "DJ Remix",
  "songs/new-dance/Dekhe_naker_nathni_DJ(128k).mp3"
),

blank(
  "Dhak Baja Kashor Baja",
  "Bengali Pujo Song",
  "songs/new-dance/Dhak Baja Kashor Baja (PenduJatt.Com.Se).mp3"
),

blank(
  "Dhaker Taley",
  "SVF Music",
  "songs/new-dance/Dhaker-Taley-Lyrical-Dev-Subhashree-Jeet-Gannguli-Abhijeet-Parinita-Sudipto-SVF-Music.mp3"
),

blank(
  "Dhitang Dhitang",
  "Bengali Song",
  "songs/new-dance/Dhitang Dhitang (PenduJatt.Com.Se).mp3"
),

blank(
  "Laila Main Laila",
  "DJ Remix",
  "songs/new-dance/DJ_Laila_main_Laila-Bollywood_DJ_remix_song__Dj_exported__DJ__remix_Song__💃🕺 (128k).mp3"
),

blank(
  "Goriya Chura Na Mera Jiya",
  "DJ Remix",
  "songs/new-dance/Dj_Remix_song_goriya_chura_na_mera_jiya(128k).mp3"
),

blank(
  "Galti Se Mistake",
  "Bollywood Song",
  "songs/new-dance/Galti Se Mistake (PenduJatt.Com.Se).mp3"
),

blank(
  "Gori Tori Chunri",
  "DJ Aziz Bhai",
  "songs/new-dance/Gori_Tori_Chunri_BA_Lal_Lal_Re_mix_by_dj_azib_bhai(128k).mp3"
),

blank(
  "Hamar Piyawa Diesel Gari",
  "DJ Dheeraj Dhanbad",
  "songs/new-dance/Hamar Piyawa disel gari.mp3"
),

blank(
  "Hero Vs Nagin Vs Horn",
  "DJ Anant Chitali",
  "songs/new-dance/Hero vs Nagin vs Horn.mp3"
),

blank(
  "Item Bomb",
  "Bengali Song",
  "songs/new-dance/Item Bomb (PenduJatt.Com.Se).mp3"
),

blank(
  "Jabar Belai Dekha Holo",
  "DJ Remix",
  "songs/new-dance/Jabar belai dekha holo.mp3"
),

blank(
  "Jama Amar Kalo",
  "DJ Remix",
  "songs/new-dance/Jama_amar_kalo_dj(128k).mp3"
),

blank(
  "Jee Le Le",
  "DJ Roni Diara",
  "songs/new-dance/Jee_Le_Le_Jee_Le_Le_(New_Style_Mix)(Dj_Roni_Diara)......(128k).mp3"
),

blank(
  "Jothai Jothai Bolbe Tumi",
  "Purulia DJ Song",
  "songs/new-dance/Jothai_Jothai_Bolbe_Tumi_Saban_Lagai_Debo_Go_Dj_Song_Nunur_Masi_New_Purulia_Dj_Song(128k).mp3"
),

blank(
  "Latai",
  "Bengali Song",
  "songs/new-dance/Latai (PenduJatt.Com.Se).mp3"
),

blank(
  "Love Me",
  "Bengali Song",
  "songs/new-dance/Love Me (PenduJatt.Com.Se).mp3"
),

blank(
  "Mala Re",
  "Dev / Subhashree",
  "songs/new-dance/Mala-Re-মালা-রে-Romeo-Dev-Subhashree-Jeet-Gannguli-Sujit-Mondol-SVF.mp3"
),

blank(
  "Megha O Megha",
  "DJ Bikram Studio",
  "songs/new-dance/Megha_O_Megha_Dj_Songs__Humming_Bass__Matal_Dance_Mix__Dj_Bikram_Studio(128k).mp3"
),

blank(
  "Menoka Mathay Dilo Ghumta",
  "DJ Kiran KM Production",
  "songs/new-dance/Menoka Mathay Dilo Ghumta.mp3"
),

blank(
  "Mon Mane Na",
  "Bengali Song",
  "songs/new-dance/Mon Mane Na (PenduJatt.Com.Se).mp3"
),

blank(
  "Monta Kore Uru Uru",
  "Bengali Song",
  "songs/new-dance/Monta Kore Uru Uru (PenduJatt.Com.Se).mp3"
),

blank(
  "Nagin Dance Remix",
  "DJ Remix",
  "songs/new-dance/Nagin Dance Remix.mp3"
),

blank(
  "O My Darling",
  "Khortha DJ Song",
  "songs/new-dance/O_My_Darling_Dj_Song_-_Khortha_Blaster_Dj_Song_Of_The_Year_2018.mp3(128k).mp3"
),

blank(
  "O Sajani More Jabo Ami",
  "Purulia DJ Song",
  "songs/new-dance/O_Sajani_More_Jabo_Ami__Purulia_DjSong__DjGk_Vai_Kashipur(128k).mp3"
),

blank(
  "O Tui Mon Kandali",
  "DJ Montu Kashipur",
  "songs/new-dance/O_Tui_Mon_Kandali_Holi_Special_Purulia_Sad_Dj_Song_Mix_By_Dj_Montu_Kashipur(128k).mp3"
),

blank(
  "Oh Madhu",
  "Bengali Song",
  "songs/new-dance/Oh Madhu (PenduJatt.Com.Se).mp3"
),

blank(
  "Rangeelo Maro Dholna",
  "DJ Q2 Remix",
  "songs/new-dance/Rangeelo_Maro_Dholna_(DJ_Q2_Exclusive_REMIX)(128k).mp3"
),

blank(
  "Teri Aankho Ka Yo Kajal",
  "DJ Remix",
  "songs/new-dance/Teri Aankho Ka Yo Kajal.mp3"
),

blank(
  "Tor Bandhobi Ke Setting Kare Ja",
  "DJ Astik / DJ BM Music",
  "songs/new-dance/Tor_Bandhobi_Ke_Setting_Kare_Ja_Dj__New_Purulia_Song_2022_Dj_Remix__Dj_Astik__Dj_BM_Music(128k).mp3"
),

blank(
  "Tui Amar Hero",
  "Bengali Song",
  "songs/new-dance/Tui Amar Hero (PenduJatt.Com.Se).mp3"
)
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
      blank("Aham Rudre", "Mahalaya", "songs/mahalaya/Aham-Rudre.mp3"),
      blank("Durge Durge Durgatinashini", "Mahalaya", "songs/mahalaya/Durge-Durge-Durgatinashini.mp3"),
      blank("Jago Tumi Jago", "Mahalaya", "songs/mahalaya/Jago-Tumi-Jago.mp3"),
      blank("Ogo Amar Agomoni", "Mahalaya", "songs/mahalaya/Ogo-Amar-Agomoni.mp3"),
      blank("Rupang Dehi Jayang Dehi", "Mahalaya", "songs/mahalaya/Rupang-Dehi-Jayang-Dehi.mp3"),
      blank("Ya Chandi", "Mahalaya", "songs/mahalaya/Ya-Chandi.mp3"),
      blank("Mahalaya Track 08", "Add artist", ""),
      blank("Mahalaya Track 09", "Add artist", ""),
      blank("Mahalaya Track 10", "Add artist", "")
    ]
  }
};
