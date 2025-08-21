import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  MoreVertical,
  Eye
} from "lucide-react";
import { Button } from "@/app/components/ui/button"; // Adjusted path
import { Badge } from "@/app/components/ui/badge";   // Adjusted path

// Define a type for the video prop. This must EXACTLY match the MockVideo type in src/app/page.tsx.
interface VideoProps {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  category: string;
  duration: number; // <--- **CRITICAL FIX: ENSURE THIS IS 'number'**
  views: number;
  likes: number;
  age_appropriate: boolean;
  created_by: string;
  tags: string[];
}

interface VideoPlayerProps {
  video: VideoProps;
  onLike?: (videoId: string, liked: boolean) => void;
  // <--- **CRITICAL FIX: onShare must return Promise<void> because handleShare is async**
  onShare?: (video: VideoProps) => Promise<void>;
  isActive?: boolean;
}

// Map categories to Tailwind CSS classes for consistent styling
const categoryColors: { [key: string]: string } = {
  educational: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  entertainment: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  lifestyle: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  fitness: "bg-green-500/20 text-green-300 border-green-500/30",
  cooking: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  travel: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  technology: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  art_creativity: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  music: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  comedy: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  news: "bg-red-500/20 text-red-300 border-red-500/30",
  sports: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  gaming: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
  business: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  health_wellness: "bg-teal-500/20 text-teal-300 border-teal-500/30"
};

export default function VideoPlayer({ video, onLike, onShare, isActive = true }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(error => console.log("Video auto-play blocked or failed:", error));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, video.video_url]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => console.log("Play failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleLikeClick = () => {
    setIsLiked((prev: boolean) => {
      const newLikedStatus = !prev;
      onLike?.(video.id, newLikedStatus);
      return newLikedStatus;
    });
  };

  const formatCategory = (category: string) => {
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <motion.div
      className="relative w-full h-screen bg-black rounded-2xl overflow-hidden group"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={video.video_url}
        className="w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        poster={video.thumbnail_url || `https://placehold.co/1280x720/000000/ffffff?text=Loading+Video`}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      <motion.div
        className="absolute top-6 left-6 right-6 flex items-start justify-between z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <Badge className={`${categoryColors[video.category]} border backdrop-blur-sm`}>
            {formatCategory(video.category)}
          </Badge>
          {video.age_appropriate && (
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 border backdrop-blur-sm">
              Family Safe
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </motion.div>

      <motion.div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-20 ${
          showControls && !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: showControls && !isPlaying ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <Button
          onClick={togglePlay}
          className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300"
          size="icon"
        >
          {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
        </Button>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="w-full h-1 bg-white/20 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-end justify-between">
          <div className="flex-1 mr-4">
            <h3 className="text-white text-xl font-bold mb-2 line-clamp-2">
              {video.title}
            </h3>
            <p className="text-white/80 text-sm mb-3 line-clamp-3">
              {video.description}
            </p>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{video.views?.toLocaleString() || 0}</span>
              </div>
              <span>•</span>
              <span>By {video.created_by}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <motion.button
              onClick={handleLikeClick}
              className={`w-12 h-12 rounded-full backdrop-blur-sm border transition-all duration-300 flex items-center justify-center ${
                isLiked
                  ? 'bg-red-500/30 border-red-500/50 text-red-400'
                  : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
              }`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>

            <motion.button
              onClick={() => onShare?.(video)}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <Share2 className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={toggleMute}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {video.tags && video.tags.length > 0 && (
        <motion.div
          className="absolute bottom-24 left-6 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-wrap gap-2">
            {video.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
