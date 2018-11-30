var audio_context;
var recorder;
var recording = false;

function getQuestion() {
    var request = new XMLHttpRequest();
    request.open('GET', '/api/question', true);
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            console.log(request.responseText);
            text = JSON.parse(request.responseText);
            document.getElementById('dialog').innerHTML += '> ' + text.question + '\n'
        };
    };
    request.send();
}

function startDialog() {
    document.getElementById('dialog').innerHTML = '';
    getQuestion();
}

function toggleRecording(button) {
    if (recording) {
        recorder && recorder.stop();

        recorder.exportWAV(function(blob) {
            var request = new XMLHttpRequest();
            request.open('POST', '/api/voice', true);
            request.onreadystatechange = function() {
                if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    console.log(request.responseText);
                    text = JSON.parse(request.responseText);
                    document.getElementById('dialog').innerHTML +=
                        '- ' + text.text + '\n' +
                        '  извлеченные сущности:\n' +
                        text.parameters + '\n' +
                        '> ' + text.question + '\n';

                    // getQuestion();
                };
            };
            var data = new FormData();
            data.append('file', blob, 'record.wav');
            request.send(data);
        });

        recorder.clear();

        button.innerHTML = 'Запись';
        recording = false;
    } else {
        recorder && recorder.record();
        button.innerHTML = 'Стоп';
        recording = true;
    }
}

function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    recorder = new Recorder(input);
}

window.onload = function init() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        audio_context = new AudioContext;
    } catch (e) {
        alert('Браузер не поддерживает запись аудио.');
    }

    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
        ;
    });

    getQuestion();
};