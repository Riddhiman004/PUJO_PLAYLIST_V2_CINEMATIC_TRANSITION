# PUJO PLAYLIST — V2

A premium Bengali Durga Puja music website with:

- Home page with Old Gold / New Dance / Mahalaya
- Live Kolkata IST clock
- Automatic Dawn / Day / Evening / Night ambience
- Manual "Pujo Mood" switch
- Animated particles and subtle festival atmosphere
- Hover interactions and card glow
- Mahalaya dedicated page
- Mahalaya playlist
- Fixed persistent music player
- Previous / next / play all
- Shuffle / repeat
- Search
- Favourite songs saved in localStorage
- Queue / Up Next
- Volume + mute
- Mahalaya countdown + Sharodiya countdown
- Responsive mobile layout
- GitHub / Vercel ready

## Add your songs

Put MP3 files here:

```text
songs/
├── old-gold/
├── new-dance/
└── mahalaya/
```

Then edit `songs.js`.

Example:

```js
{
  title: "My Song",
  artist: "Artist Name",
  file: "songs/old-gold/my-song.mp3"
}
```

The project intentionally does not bundle any copyrighted music.

## Run locally

You can simply open `index.html`, or use VS Code Live Server.

## Deploy to Vercel

Upload the whole project to GitHub and import the repository into Vercel.

No build command is required. This is a static HTML/CSS/JS site.

## Important

If you add a song file, the path in `songs.js` must exactly match the filename, including spaces/capital letters.

For example:

```text
songs/old-gold/Aji-Mahalaya.mp3
```

must match:

```js
file: "songs/old-gold/Aji-Mahalaya.mp3"
```


## New Dance fix
Old Gold and New Dance use one shared playlist screen. The navigation now switches
the same UI between `oldGold` and `newDance` data, so New Dance no longer opens to
a blank page. This also avoids duplicate HTML IDs and keeps search/player controls
working correctly.


## Cinematic card transition
Clicking a Home playlist card now briefly expands the card, creates a warm golden
burst, and sends festival particles outward before opening the destination playlist.
The transition is CSS/JS only, so it works locally and on Vercel without external assets.
