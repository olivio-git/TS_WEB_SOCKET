import { useEffect, useRef, useState } from "react";
import ButtonSend from "./Button";
import { socket } from "../web/socket";
import Peer from "simple-peer";
interface Props {
  idRoom: string;
  handleChangeModalStream: () => void;
}
let peer = new Peer({ initiator: true, trickle: false });
export default function ModalStream({
  idRoom,
  handleChangeModalStream,
}: Props) {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const streamRef = useRef<null | MediaStream>(null);
  const streamRefProv = useRef<null | HTMLVideoElement>(null);

  const [stateCamera, setStateCamera] = useState<Boolean>(false);
  const [audioSource, setAudioSource] = useState<string>("");
  const [videoSource, setVideoSource] = useState<string>("");
  const [constrains, setConstrains] = useState({
    // audio:{deviceId:"default"},
    video: {
      deviceId: "", //"5397574797f1d2f172b302471bf13d7a84351645281feeb8a543b44d41e780e5"
    },
  });
  const getStream = async () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constrains);
      gotStream(stream);
    } catch (error) {
      console.log(error);
    }
  };
  const gotStream = (stream: MediaStream) => {
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      peer.addStream(stream);
    }
  };
  const handleChangeModalDisconnectCall = async () => {
    socket.emit('discon',true);
    handleChangeModalStream();
    peer.destroy();
  };
  const prepareStream = async () => {
    await navigator.mediaDevices.enumerateDevices().then((res) => {
      res.map((e) => {
        if (e.kind == "videoinput") {
          setConstrains({ ...constrains, video: { deviceId: e.deviceId } });
        }
      });
    });
    setStateCamera(true);
    getStream();
  };
  const sendStream = async () => {
    await peer.on("signal", (data) => {
      socket.emit("videoStream", { roomID: idRoom, data, saludo: "Holi" });
    });
  };
  const stopStream = async () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      setConstrains({ ...constrains, video: { deviceId: "" } });
      setStateCamera(false);
    }
  };
  useEffect(()=> {
    
  },[])
  return (
    <div
      className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center p-8"
      style={{ background: "rgba(0, 0, 0, 0.3" }}>
      <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col flex-grow">
        <header className="flex w-full items-end justify-end p-2">
          <ButtonSend
            onClick={handleChangeModalDisconnectCall}
            className="flex items-center justify-center p-2 hover:bg-[#8ef6e4] hover:bg-opacity-50 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="25"
              height="25">
              <path d="M23,11a1,1,0,0,1-1-1,8.008,8.008,0,0,0-8-8,1,1,0,0,1,0-2A10.011,10.011,0,0,1,24,10,1,1,0,0,1,23,11Zm-3-1a6,6,0,0,0-6-6,1,1,0,1,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0Zm2.183,12.164.91-1.049a3.1,3.1,0,0,0,0-4.377c-.031-.031-2.437-1.882-2.437-1.882a3.1,3.1,0,0,0-4.281.006l-1.906,1.606A12.784,12.784,0,0,1,7.537,9.524l1.6-1.9a3.1,3.1,0,0,0,.007-4.282S7.291.939,7.26.908A3.082,3.082,0,0,0,2.934.862l-1.15,1C-5.01,9.744,9.62,24.261,17.762,24A6.155,6.155,0,0,0,22.183,22.164Z" />
            </svg>
          </ButtonSend>
          {!stateCamera ? (
            <ButtonSend
              onClick={prepareStream}
              className="flex items-center justify-center p-2 hover:bg-[#8ef6e4] hover:bg-opacity-50 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                fill="green"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="25"
                height="25">
                <path d="M22.903,6.538c-.676-.338-1.473-.267-2.077,.188-.039,.029-.076,.062-.11,.096l-1.757,1.773c-.211-2.565-2.341-4.594-4.959-4.594H5C2.243,4,0,6.243,0,9v6c0,2.757,2.243,5,5,5H14c2.629,0,4.768-2.047,4.962-4.627l1.756,1.754c.034,.033,.069,.063,.107,.092,.352,.264,.768,.398,1.188,.398,.303,0,.606-.069,.89-.211,.677-.338,1.097-1.019,1.097-1.774v-7.318c0-.757-.42-1.437-1.097-1.775Zm-8.903,11.462H5c-1.654,0-3-1.346-3-3v-6c0-1.654,1.346-3,3-3H14c1.654,0,3,1.346,3,3v6c0,1.654-1.346,3-3,3Zm5-5.417v-1.189l3-3.028,.025,7.238-3.025-3.022Z" />
              </svg>
            </ButtonSend>
          ) : (
            <ButtonSend
              onClick={stopStream}
              className="flex items-center justify-center p-2 hover:bg-[#8ef6e4] hover:bg-opacity-50 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                fill="red"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="25"
                height="25">
                <path d="M22.903,6.538c-.676-.338-1.473-.267-2.077,.188-.039,.029-.076,.062-.11,.096l-1.757,1.773c-.211-2.565-2.341-4.594-4.959-4.594H5C2.243,4,0,6.243,0,9v6c0,2.757,2.243,5,5,5H14c2.629,0,4.768-2.047,4.962-4.627l1.756,1.754c.034,.033,.069,.063,.107,.092,.352,.264,.768,.398,1.188,.398,.303,0,.606-.069,.89-.211,.677-.338,1.097-1.019,1.097-1.774v-7.318c0-.757-.42-1.437-1.097-1.775Zm-8.903,11.462H5c-1.654,0-3-1.346-3-3v-6c0-1.654,1.346-3,3-3H14c1.654,0,3,1.346,3,3v6c0,1.654-1.346,3-3,3Zm5-5.417v-1.189l3-3.028,.025,7.238-3.025-3.022Z" />
              </svg>
            </ButtonSend>
          )}

          <ButtonSend
            onClick={sendStream}
            className="flex items-center justify-center p-2 hover:bg-[#8ef6e4] hover:bg-opacity-50 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="green"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="25"
              height="25">
              <path d="M23,11a1,1,0,0,1-1-1,8.008,8.008,0,0,0-8-8,1,1,0,0,1,0-2A10.011,10.011,0,0,1,24,10,1,1,0,0,1,23,11Zm-3-1a6,6,0,0,0-6-6,1,1,0,1,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0Zm2.183,12.164.91-1.049a3.1,3.1,0,0,0,0-4.377c-.031-.031-2.437-1.882-2.437-1.882a3.1,3.1,0,0,0-4.281.006l-1.906,1.606A12.784,12.784,0,0,1,7.537,9.524l1.6-1.9a3.1,3.1,0,0,0,.007-4.282S7.291.939,7.26.908A3.082,3.082,0,0,0,2.934.862l-1.15,1C-5.01,9.744,9.62,24.261,17.762,24A6.155,6.155,0,0,0,22.183,22.164Z" />
            </svg>
          </ButtonSend>
        </header>
        <main className="flex-grow bg-gray-100 w-full rounded-lg p-2">
          <div className="video-container flex gap-2 h-full">
            <video
              className="sm:w-1/2 md:w-1/3 lg:w-2/4 xl:w-3/6 border border-gray-400"
              ref={videoRef}
              autoPlay></video>
            <video
              className="sm:w-1/2 md:w-1/3 lg:w-2/4 xl:w-3/6 border border-gray-400"
              ref={streamRefProv}
              autoPlay></video>
          </div>
        </main>
        <footer className="flex items-center bg-gray-200 p-2"></footer>
      </div>
    </div>
  );
}

// useEffect(() => {
//   async function prepareStream() {
//     await navigator.mediaDevices.enumerateDevices().then((res) => {
//       res.map((e) => {
//         if (e.kind == "videoinput") {
//           setConstrains({ ...constrains, video: { deviceId: e.deviceId } });
//         }
//       });
//     });
//     function gotStream(stream: MediaStream) {
//       streamRef.current = stream;
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         peer.addStream(stream);
//       }
//     }
//     async function getStream() {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => {
//           track.stop();
//         });
//       }

//       try {
//         const stream = await navigator.mediaDevices.getUserMedia(constrains);
//         gotStream(stream);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     await getStream();
//   }
//   prepareStream();
//   peer.on("signal", (data) => {
//     socket.emit("videoStream", { roomID: idRoom, data, saludo: "Holi" });
//   });

//   socket.on("callUser", (data) => {
//     peer.signal(data.signal);
//   });
//   peer.on("stream", (stream) => {
//     if (streamRefProv.current) {
//       streamRefProv.current.srcObject = stream;
//     }
//   });

//   peer.on("close", () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => {
//         track.stop();
//       });
//       streamRef.current = null;
//     }
//     if (streamRefProv.current) {
//       streamRefProv.current.srcObject = null;
//     }
//   });

//   peer.on("connect", () => {
//     console.log("Conexión peer establecida correctamente");
//   });

//   peer.on("error", (err) => {
//     console.error("Error en la conexión peer: ", err);
//   });
//   return () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => {
//         track.stop();
//       });
//     }
//   };
// }, []);
