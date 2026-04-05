import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface CustomVideoPlayerProps {
  url: string;
  autoPlay?: boolean;
  className?: string;
}

export function CustomVideoPlayer({ url, autoPlay = false, className = '' }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const isM3U8 = url.toLowerCase().includes('.m3u8');

    if (isM3U8 && Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video.play().catch((err) => console.log('Auto-play prevented:', err));
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl') || !isM3U8) {
      // Native HLS support (Safari) or standard MP4/WebM
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        if (autoPlay) {
          video.play().catch((err) => console.log('Auto-play prevented:', err));
        }
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [url, autoPlay]);

  // Check if it's likely an iframe embed rather than a direct video file
  const isIframe = !url.match(/\.(mp4|m3u8|webm|ogg)$/i) && url.includes('http');

  if (isIframe) {
    return (
      <iframe
        src={url}
        className={`border-0 ${className}`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        tabIndex={0}
      ></iframe>
    );
  }

  return (
    <video
      ref={videoRef}
      controls
      className={className}
      tabIndex={0}
      playsInline
    >
      Seu navegador não suporta o elemento de vídeo.
    </video>
  );
}
