let audio = new Audio();
audio.src = "./assets/audio/notication_sound.mp3";
audio.load();
console.log(audio.src, 'audio.src');
var player = (function() { 
return { 
    playAudio: function() {
        audio.play();
    },
    pauseAudio: function() {
        audio.stop();
    }
} 
})(player||{});