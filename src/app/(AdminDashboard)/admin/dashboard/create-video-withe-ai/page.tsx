"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const CreateVideoWithAiPage = () => {
  const [selfie, setSelfie] = useState<File | null>(null);
  const [message, setMessage] = useState(
    "Welcome! This is a test message for video generation."
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const pollForVideo = async (talkId: string) => {
    const didApiKey = process.env.NEXT_PUBLIC_DID_API_KEY;
    if (!didApiKey) {
      setError("D-ID API key is not configured.");
      setLoading(false);
      return;
    }

    // D-ID API key must be Base64-encoded with a trailing colon
    const didAuthHeader = `Basic ${btoa(didApiKey + ":")}`;

    pollingIntervalRef.current = setInterval(async () => {
      try {
        const { data: talk } = await axios.get(
          `https://api.d-id.com/talks/${talkId}`,
          {
            headers: {
              Authorization: didAuthHeader,
              "Content-Type": "application/json",
            },
          }
        );

        if (talk.status === "done") {
          setVideoUrl(talk.result_url);
          setLoading(false);
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
          }
        } else if (talk.status === "error") {
          setError(`Error generating video: ${talk.error}`);
          setLoading(false);
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
          }
        }
      } catch (err: unknown) {
        let message = "An error occurred while polling for video.";
        if (axios.isAxiosError(err)) {
          message = `Polling failed: ${
            err.response?.data?.description || err.message
          }`;
        } else if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
        setLoading(false);
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
        }
      }
    }, 5000);
  };

  const handleGenerateVideo = async () => {
    if (!selfie || !message) {
      setError("Please upload a selfie and enter a message.");
      return;
    }

    setLoading(true);
    setError(null);
    setVideoUrl(null);

    try {
      const elevenLabsApiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
      const didApiKey = process.env.NEXT_PUBLIC_DID_API_KEY;

      if (!elevenLabsApiKey) {
        setError("ElevenLabs API key is not configured.");
        setLoading(false);
        return;
      }
      if (!didApiKey) {
        setError("D-ID API key is not configured.");
        setLoading(false);
        return;
      }

      // D-ID API key must be Base64-encoded with a trailing colon
      const didAuthHeader = `Basic ${btoa(didApiKey + ":")}`;

      // 1. Convert selfie to base64
      const imageBase64 = await fileToBase64(selfie);

      // 2. Generate audio from ElevenLabs
      const voiceId = "21m00Tcm4TlvDq8ikWAM";

      const audioResponse = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          text: message,
          model_id: "eleven_monolingual_v1",
        },
        {
          headers: {
            Accept: "audio/mpeg",
            "xi-api-key": elevenLabsApiKey,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      // D-ID has an endpoint to upload audio first to get a URL
      const audioUploadResponse = await axios.post(
        "https://api.d-id.com/audios",
        audioResponse.data,
        {
          headers: {
            Authorization: didAuthHeader,
            "Content-Type": "audio/mpeg",
          },
        }
      );

      const audio_url = audioUploadResponse.data.url;

      // 4. Create a talk with D-ID
      const createTalkResponse = await axios.post(
        "https://api.d-id.com/talks",
        {
          source_url: imageBase64,
          script: {
            type: "audio",
            audio_url: audio_url,
          },
          config: {
            result_format: "mp4",
          },
        },
        {
          headers: {
            Authorization: didAuthHeader,
            "Content-Type": "application/json",
          },
        }
      );

      const talkId = createTalkResponse.data.id;

      // 5. Poll for the video result
      await pollForVideo(talkId);
    } catch (err: unknown) {
      let errorMessage = "An unknown error has occurred.";
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response);
        if (err.response?.status === 401) {
          errorMessage =
            "Authentication error. Please verify your API keys are correct and have been set up properly in your .env.local file. One of your keys is likely invalid or missing.";
        } else {
          errorMessage =
            err.response?.data?.description ||
            err.response?.data?.message ||
            err.message;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(`An error occurred: ${errorMessage}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cleanup interval on component unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-2xl bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Generate AI Video
      </h1>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="selfie"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            1. Upload Your Selfie
          </label>
          <input
            id="selfie"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) =>
              setSelfie(e.target.files ? e.target.files[0] : null)
            }
            className="mt-1 block w-full text-sm text-gray-500
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-lg file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-violet-50 file:text-violet-700
                                   hover:file:bg-violet-100 cursor-pointer"
          />
          {selfie && (
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selfie.name}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            2. Enter Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Enter the text you want the avatar to speak..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={handleGenerateVideo}
          disabled={loading || !selfie || !message}
          className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Generate Video"
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-4 text-center text-gray-600">
          Processing... Please wait. This can take up to a minute.
        </div>
      )}

      {videoUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Your Video is Ready!
          </h2>
          <video
            src={videoUrl}
            controls
            autoPlay
            muted
            className="w-full rounded-lg shadow-lg"
          />
          <a
            href={videoUrl}
            download="generated_video.mp4"
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Download Video
          </a>
        </div>
      )}
    </div>
  );
};

export default CreateVideoWithAiPage;
