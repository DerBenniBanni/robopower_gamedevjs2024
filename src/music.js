const Music = {
    gameAudio:null,
    crashAudio:null,
    playCrash() {
        if(this.crashAudio) {
            this.crashAudio.currentTime = 0;
            this.crashAudio.play();
        }
    },
    play() {
        if(this.gameAudio) {
            this.gameAudio.currentTime = 0;
            this.gameAudio.play();
        }
    },
    stop() {
        if(this.gameAudio) {
            this.gameAudio.pause();
            this.gameAudio.currentTime = 0;
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