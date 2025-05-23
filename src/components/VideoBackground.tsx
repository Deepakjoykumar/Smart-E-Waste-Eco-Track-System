
import { useEffect, useRef } from "react";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Animated overlay with gradient and particles effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10" />
      
      {/* Moving light particles effect */}
      <div className="absolute inset-0 z-20 opacity-30">
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="particle absolute rounded-full bg-secondary/40 blur-sm"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 5}s linear infinite, 
                           pulse ${Math.random() * 5 + 3}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover scale-105 animate-pulse-slow"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-electronic-waste-26274-large.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      
      {/* CSS animations for particles */}
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(-30px) translateX(10px);
            }
            50% {
              transform: translateY(-10px) translateX(25px);
            }
            75% {
              transform: translateY(-20px) translateX(-10px);
            }
            100% {
              transform: translateY(0) translateX(0);
            }
          }
          
          @keyframes pulse {
            0% {
              opacity: 0.2;
            }
            100% {
              opacity: 0.6;
            }
          }
        `}
      </style>
    </div>
  );
};

export default VideoBackground;
