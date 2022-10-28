const tenYearsInfo = `<div class='release-info'>
    <h3 class='release-title'>Ten Years</h3>
    <div class='release-type'>Single</div>
    <div class='release-date'>October 28, 2022</div>
    <div class='release-credits'>Music and Lyrics by Michael Zachor</div>
</div>`
const nothingIsEverythingInfo = `<div class='release-info'>
    <h3 class='release-title'>Nothing is Everything</h3>
    <div class='release-type'>Single</div>
    <div class='release-date'>March 13, 2022</div>
    <div class='release-credits'>Music and Lyrics by Michael Zachor</div>
    <iframe class="mt-2" style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/track=2492101612/size=small/bgcol=333333/linkcol=e99708/transparent=true/" seamless><a href="https://patiobear.bandcamp.com/track/nothing-is-everything">Nothing is Everything by Patio Bear</a></iframe>
</div>`
const shakingHandsInfo = `<div class='release-info'>
    <h3 class='release-title'>Shaking Hands</h3>
    <div class='release-type'>Album</div>
    <div class='release-date'>September 10, 2020</div>
    <div class='release-credits'>Music by Michael Zachor, Lyrics by Ryan Totaro</div>
    <iframe class="mt-2" style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1360900596/size=small/bgcol=333333/linkcol=4ec5ec/transparent=true/" seamless><a href="https://patiobear.bandcamp.com/album/shaking-hands">Shaking Hands by Patio Bear</a></iframe>
</div>`
const stuff = `<div class='release-streaming container'>
    <div class='row mt-2'>
    <div class='release-spotify col'>
        <a href="https://open.spotify.com/track/0V3CJdrQgs7SCCXGYjQfbB?si=d563d5c0f9294d57" class="fa fa-spotify" style="width:100px; height:50px; font-size:42px; color: black; text-decoration: none;"></a>
    </div>
    <div class="release-apple col">
        <a href="https://music.apple.com/us/artist/patio-bear/1531407958" class="fa fa-apple" style="width:100px; height:50px; font-size:42px; color: black; text-decoration: none;"></a>
    </div>
    </div>
</div>`

const tenYearsYouTube = `<h1>New single 'Ten Years' out now</h1>`

const shakingHandsYouTube = `<div class='release-video-container'>
    <iframe width=100% src="https://www.youtube.com/embed/RsPvBinZ8W8" title="YouTube video player" style="margin: auto;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>`

const nothingIsEverythingYouTube = `<div class='release-video-container'>
    <iframe width=100% src="https://www.youtube.com/embed/QrHkqM4QdQE" title="YouTube video player" style="margin: auto;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>`

const nothingIsEverythingMusic = `<div class="col" id="release-spotify">
    <iframe style="border-radius:12px;" src="https://open.spotify.com/embed/track/0V3CJdrQgs7SCCXGYjQfbB?utm_source=generator" width="100%" height="300" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
</div>
<div class="col" id="release-apple">
    <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" width="100%" height="300" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/nothing-is-everything-single/1612294445"></iframe>
</div>
<div class="col" id="release-bandcamp">
    <iframe style="border: 0; width: 250px; height: 300px;" src="https://bandcamp.com/EmbeddedPlayer/track=2492101612/size=large/bgcol=333333/linkcol=e99708/tracklist=false/transparent=true/" seamless><a href="https://patiobear.bandcamp.com/track/nothing-is-everything">Nothing is Everything by Patio Bear</a></iframe>
</div>`

// const nothingIsEverything

const albumInfo = {
    tenYears: tenYearsInfo,
    nothingIsEverything: nothingIsEverythingInfo,
    shakingHands: shakingHandsInfo,
}

const albumYouTube = {
    tenYears: tenYearsYouTube,
    nothingIsEverything: nothingIsEverythingYouTube,
    shakingHands: shakingHandsYouTube
}

const albumMusic = {
    tenYears: '',
    nothingIsEverything: nothingIsEverythingMusic,
    shakingHands: ''
}

function enlarge(element, album) {
    const albumCovers = document.getElementsByClassName('album-cover');
    for (let i = 0; i < 3; i++) {
        if (albumCovers[i].classList.contains('album-cover-selected') || albumCovers[i] == element) albumCovers[i].classList.toggle('album-cover-selected');
    }
    document.getElementById('release-info').innerHTML = albumInfo[album];
    document.getElementById('release-youtube').innerHTML = albumYouTube[album];
    // document.getElementById('release-music').innerHTML = albumMusic[album]
}

function refresh() {
    const albumCovers = document.getElementsByClassName('album-cover');
    for (let i = 0; i < 3; i++) {
        if (albumCovers[i].classList.contains('album-cover-selected')) albumCovers[i].classList.toggle('album-cover-selected');
    }
    document.getElementById('release-info').innerHTML = '';
    document.getElementById('release-youtube').innerHTML = albumYouTube.tenYears;
}