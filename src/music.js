const Music = {
    gameAudio:null,
    hitAudio:null,
    laserAudio:null,
    
    play(audio) {
        audio = audio || this.gameAudio;
        if(audio) {
            audio.currentTime = 0;
            audio.play();
        }
    },
    stop(audio) {
        audio = audio || this.gameAudio;
        if(audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    },
}
const loadMusic = (song, audioname, loop) => {
    let musicplayer = new CPlayer();
    musicplayer.init(song);
    while(musicplayer.generate() < 1) {}
    let wave = musicplayer.createWave();
    Music[audioname] = document.createElement("audio");
    Music[audioname].src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
    Music[audioname].loop = loop;
}