export default class AudioController {
  constructor(onAction) {
    this.recorder = null;
    this.recording = false;
    this.audio_context = null;
    this.onAction = onAction;
  }

  init = () => {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia =
        navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;

      this.audio_context = new AudioContext();
    } catch (e) {
      console.error("Браузер не поддерживает запись аудио.");
      console.error(e);
      return false;
    }

    navigator.getUserMedia(
      { audio: true },
      stream => {
        var input = this.audio_context.createMediaStreamSource(stream);
        this.recorder = new Recorder(input);
      },
      function(e) {
        if (e) return null;
      }
    );

    return true;
  };

  startRecording = () => {
    if (!this.recorder || this.recording) return;

    console.log("recording...");

    this.recorder.record();
    this.recording = true;
  };

  stopRecording = () => {
    if (!this.recorder || !this.recording) return;

    console.log("stopped recording...");

    this.recorder.stop();
    this.recorder.exportWAV(blob => {
      var request = new XMLHttpRequest();
      request.open("POST", "/api/voice", true);
      request.responseType = "json";
      request.onreadystatechange = () => {
        if (
          request.readyState === XMLHttpRequest.DONE &&
          request.status === 200
        ) {
          this.onAction(request.response);
        }
      };
      var data = new FormData();
      data.append("file", blob, "record.wav");

      console.log("[disabled] sending wav...");
      // request.send(data);

      this.onAction([
        {
          command: "edit",
          item: "header"
          // props: {
          //   position: {
          //     rele: "totop",
          //     item: "menu"
          //   },
          //   freetext: "KLSJDgkj"
          // }
        }
      ]);
    });

    this.recorder.clear();
    this.recording = false;
  };

  toggleRecording = () => {
    if (this.recording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  };
}
