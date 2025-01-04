import { useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import "react-voice-recorder/dist/index.css";

export default function Record({ sendMessageRecord, toggle }: any) {
  const controls = useAudioRecorder();
  const { isRecording } = controls;
  const [DiscardRecording, setDiscardRecording] = useState(false);

  const addAudioElement = (blob: Blob | MediaSource) => {
    if (DiscardRecording) {
      return;
    }

    const myPromise = new Promise((resolve, reject) => {
      const url = URL?.createObjectURL(blob);
      const audio = document?.createElement("audio");
      audio.src = url;
      audio.controls = true;
      const audioFileName = "recorded_audio.mp3";
      //@ts-ignore
      const audioFileObject = new File([blob], audioFileName, {
        type: "voice",
      });
      resolve(audioFileObject);
    });

    try {
      myPromise.then((res) => {
        console.log("🚀 ~ myPromise.then ~ res:", res);
        sendMessageRecord(res);
      });
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    if (isRecording) {
      toggle(!isRecording);

      const cancelImage = document.querySelector('[data-testid="ar_cancel"]');
      if (cancelImage) {
        cancelImage.addEventListener("click", () => {
          console.log("Cancel button clicked.");
          setDiscardRecording(true);
        });
      }

      const micIcon = document.querySelector(".audio-recorder-mic");
      if (micIcon) {
        micIcon.addEventListener("click", () => {
          console.log("Mic button clicked.");
          setDiscardRecording(false);
        });
      }
    } else {
      toggle(isRecording);
    }

    console.log(
      isRecording
        ? "Recording has started... 🉐 "
        : "Recording has stopped. 🉐 "
    );
  }, [isRecording]);

  return (
    <div className="App">
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        recorderControls={controls}
      />
    </div>
  );
}
