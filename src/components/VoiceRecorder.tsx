import React, { useState, useRef, useEffect } from 'react';

interface VoiceRecorderProps {
  onSendAudio: (base64Data: string, durationSec: number) => void;
  onClose: () => void;
}

export default function VoiceRecorder({ onSendAudio, onClose }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Clean up timers and audio elements on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      setErrorMessage(null);
      setAudioBlob(null);
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Determine format support
      let mimeType = 'audio/webm';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/ogg';
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/mp4';
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = ''; // fallback
      }

      const options = mimeType ? { mimeType } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
      
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(url);
        
        // Stop all tracks to release mic
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (err: any) {
      console.error('Error starting recording:', err);
      setErrorMessage(
        'No se pudo acceder al micrófono. Por favor, otorga los permisos correspondientes. 🥺'
      );
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current || !isRecording) return;

    mediaRecorderRef.current.stop();
    setIsRecording(false);

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const togglePreviewPlay = () => {
    if (!previewAudioRef.current) return;
    
    if (isPlayingPreview) {
      previewAudioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      previewAudioRef.current.play();
      setIsPlayingPreview(true);
    }
  };

  const handlePreviewEnded = () => {
    setIsPlayingPreview(false);
  };

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const sendVoiceNote = async () => {
    if (!audioBlob) return;

    try {
      const base64 = await convertBlobToBase64(audioBlob);
      // Pass the base64 string and duration in seconds
      onSendAudio(base64, recordingTime || 1);
      onClose();
    } catch (err) {
      console.error('Error converting audio to Base64:', err);
      setErrorMessage('Ocurrió un error al procesar el audio.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      id="voice-recorder-modal"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div 
        id="voice-recorder-container"
        className="bg-white rounded-3xl shadow-2xl border border-pink-100 w-full max-w-sm flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-pink-50/50 p-4 border-b border-pink-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎤</span>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">Grabador de Voz</h3>
              <p className="text-[10px] md:text-xs text-pink-600/80 font-medium">Graba un audio cariñoso 🌸</p>
            </div>
          </div>
          <button
            type="button"
            id="close-voice-btn"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-pink-500 rounded-full hover:bg-pink-100/60 transition-colors duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 flex flex-col items-center justify-center text-center gap-5">
          {errorMessage && (
            <div id="mic-error-banner" className="bg-red-50 text-red-600 text-xs p-3.5 rounded-2xl border border-red-100 font-medium">
              {errorMessage}
            </div>
          )}

          {/* Time Counter */}
          <div id="recording-timer" className="text-3xl font-mono font-bold text-gray-800 bg-pink-50/50 px-5 py-2 rounded-2xl border border-pink-100/40 shadow-inner">
            {formatTime(isRecording ? recordingTime : (audioBlob ? recordingTime : 0))}
          </div>

          {/* Visual Wave Animation when recording */}
          {isRecording ? (
            <div id="voice-waves" className="flex items-center justify-center gap-1.5 h-14">
              <span className="w-1.5 h-6 bg-pink-400 rounded-full animate-pulse [animation-delay:0.1s]" />
              <span className="w-1.5 h-10 bg-pink-500 rounded-full animate-pulse [animation-delay:0.3s]" />
              <span className="w-1.5 h-14 bg-pink-600 rounded-full animate-pulse [animation-delay:0.5s]" />
              <span className="w-1.5 h-10 bg-pink-500 rounded-full animate-pulse [animation-delay:0.7s]" />
              <span className="w-1.5 h-6 bg-pink-400 rounded-full animate-pulse [animation-delay:0.9s]" />
            </div>
          ) : audioBlob ? (
            <div id="voice-preview-control" className="flex flex-col items-center gap-2 w-full px-4">
              <span className="text-xs text-gray-400 font-medium">Vista previa del audio:</span>
              <div className="flex items-center gap-3 bg-pink-50/60 w-full p-2.5 rounded-2xl border border-pink-100/50 justify-center">
                <button
                  type="button"
                  id="play-voice-preview-btn"
                  onClick={togglePreviewPlay}
                  className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center shadow hover:bg-pink-600 transition-colors duration-150"
                >
                  {isPlayingPreview ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="ml-0.5"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
                <div className="flex-1 flex gap-1 items-center h-5">
                  <span className="text-xs font-semibold text-pink-700">Audio listo</span>
                  <div className="flex gap-0.5 items-end flex-1 justify-center opacity-60">
                    <span className="w-1 h-3 bg-pink-500 rounded-full" />
                    <span className="w-1 h-5 bg-pink-500 rounded-full" />
                    <span className="w-1 h-4 bg-pink-500 rounded-full" />
                    <span className="w-1 h-6 bg-pink-500 rounded-full" />
                    <span className="w-1 h-3 bg-pink-500 rounded-full" />
                    <span className="w-1 h-5 bg-pink-500 rounded-full" />
                    <span className="w-1 h-4 bg-pink-500 rounded-full" />
                  </div>
                </div>
              </div>
              <audio
                ref={previewAudioRef}
                src={audioUrl || undefined}
                onEnded={handlePreviewEnded}
                className="hidden"
              />
            </div>
          ) : (
            <div id="voice-idle-state" className="text-sm text-gray-400 font-medium py-3">
              Presiona el botón de abajo para empezar a grabar 🎤
            </div>
          )}

          {/* Record Trigger Button */}
          <div className="mt-2">
            {!isRecording && !audioBlob ? (
              <button
                type="button"
                id="start-recording-btn"
                onClick={startRecording}
                className="w-20 h-20 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg hover:bg-pink-600 hover:scale-105 active:scale-95 transition-all duration-200 animate-bounce"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
              </button>
            ) : isRecording ? (
              <button
                type="button"
                id="stop-recording-btn"
                onClick={stopRecording}
                className="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-200 relative"
              >
                <span className="absolute inset-0 rounded-full bg-red-400/30 animate-ping" />
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
              </button>
            ) : (
              <button
                type="button"
                id="reset-recording-btn"
                onClick={startRecording}
                className="px-4 py-2 rounded-2xl bg-gray-100 text-gray-600 border border-gray-200 text-xs font-semibold hover:bg-gray-200 hover:text-gray-700 transition-colors duration-150"
              >
                🔄 Grabar de Nuevo
              </button>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-pink-50/20 border-t border-pink-100/50 flex gap-2.5">
          <button
            type="button"
            id="cancel-voice-btn"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-2xl border border-pink-200/80 bg-white text-pink-600 hover:bg-pink-50 font-semibold text-sm transition-colors duration-150 flex items-center justify-center gap-1"
          >
            <span>Cancelar</span>
          </button>
          
          <button
            type="button"
            id="send-voice-btn"
            onClick={sendVoiceNote}
            disabled={!audioBlob}
            className={`flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-1 shadow-sm ${
              audioBlob
                ? 'bg-pink-500 text-white hover:bg-pink-600 hover:shadow active:scale-98'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Enviar Audio 💖</span>
          </button>
        </div>
      </div>
    </div>
  );
}
