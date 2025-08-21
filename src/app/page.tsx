"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

// Placeholder Entities and Data (KEEP THESE UNTIL YOU INTEGRATE APPWRITE)
type MockVideo = {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  category: string;
  duration: number;
  views: number;
  likes: number;
  age_appropriate: boolean;
  created_by: string;
  tags: string[];
};

const mockVideos: MockVideo[] = [
  {
    id: "1", title: "Understanding React Hooks", description: "A deep dive into useState, useEffect, and custom hooks.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/007bff/ffffff?text=React+Hooks",
    category: "educational", duration: 180, views: 12345, likes: 567, age_appropriate: true, created_by: "CodeExplorers", tags: ["react", "hooks"]
  },
  {
    id: "2", title: "Delicious Pasta Recipe", description: "Learn how to make a creamy, delicious pasta dish.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/ff7f50/ffffff?text=Pasta+Recipe",
    category: "cooking", duration: 240, views: 8765, likes: 1234, age_appropriate: true, created_by: "ChefAstro", tags: ["food", "cooking"]
  },
  {
    id: "3", title: "Workout Motivation: Full Body", description: "A high-intensity full-body workout.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/32cd32/ffffff?text=Workout",
    category: "fitness", duration: 300, views: 23456, likes: 2100, age_appropriate: true, created_by: "FitJourney", tags: ["fitness", "workout"]
  },
  {
    id: "4", title: "Highlights: NBA Finals 2024", description: "Best plays from the exciting NBA Finals game.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/800080/ffffff?text=NBA+Finals",
    category: "sports", duration: 120, views: 50000, likes: 8000, age_appropriate: true, created_by: "SportsKing", tags: ["sports", "basketball", "NBA"]
  },
  {
    id: "5", title: "Travel Vlog: Exploring Kyoto", description: "Journey through ancient temples of Kyoto.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/8a2be2/ffffff?text=Kyoto+Travel",
    category: "travel", duration: 480, views: 15000, likes: 980, age_appropriate: true, created_by: "WanderlustExplorers", tags: ["travel", "japan"]
  },
  {
    id: "6", title: "Funny Cat Compilation", description: "A compilation of the funniest cat moments.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/FFD700/000000?text=Funny+Cats",
    category: "comedy", duration: 150, views: 75000, likes: 12000, age_appropriate: true, created_by: "LaughTrack", tags: ["funny", "cats", "animals"]
  },
  {
    id: "7", title: "Tech Review: Latest Smartphone", description: "In-depth review of the newest flagship smartphone.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/4682B4/ffffff?text=Smartphone+Review",
    category: "technology", duration: 400, views: 30000, likes: 3500, age_appropriate: true, created_by: "TechInsights", tags: ["tech", "smartphone", "review"]
  },
  {
    id: "8", title: "Classic Rock Anthems", description: "The greatest hits of classic rock.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/8B008B/ffffff?text=Classic+Rock",
    category: "music", duration: 600, views: 20000, likes: 4000, age_appropriate: true, created_by: "MusicLover", tags: ["music", "rock"]
  },
  {
    id: "9", title: "Football Training Drills", description: "Improve your football skills with these drills.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/008000/ffffff?text=Football+Drills",
    category: "sports", duration: 180, views: 18000, likes: 2500, age_appropriate: true, created_by: "SportyCoach", tags: ["sports", "football", "training"]
  },
  {
    id: "10", title: "The Art of Portrait Painting", description: "A step-by-step guide to painting expressive portraits.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/A52A2A/ffffff?text=Portrait+Painting",
    category: "art_creativity", duration: 500, views: 9000, likes: 1500, age_appropriate: true, created_by: "ArtisticSoul", tags: ["art", "painting", "creativity"]
  }
];

type MockUserPreferences = {
  preferred_categories: string[];
  blocked_categories: string[];
  parental_mode: boolean;
};

const mockUserPreferences: MockUserPreferences = {
  preferred_categories: ["educational", "travel"],
  blocked_categories: [],
  parental_mode: false
};

const mockUser = {
  email: "user@example.com"
};

const Video = {
  list: async (orderBy: string, limit: number): Promise<MockVideo[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockVideos;
  },
  filter: async (filters: { category?: string }, orderBy: string, limit: number): Promise<MockVideo[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    let filtered = mockVideos;
    if (filters.category) {
      filtered = filtered.filter(video => video.category === filters.category);
    }
    return filtered;
  },
  update: async (id: string, data: Partial<MockVideo>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const videoIndex = mockVideos.findIndex(v => v.id === id);
    if (videoIndex !== -1) {
      mockVideos[videoIndex] = { ...mockVideos[videoIndex], ...data };
    }
  }
};

const UserPreferences = {
  filter: async (filters: { created_by: string }): Promise<MockUserPreferences[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (filters.created_by === mockUser.email) {
      return [mockUserPreferences];
    }
    return [];
  }
};

const User = {
  me: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUser;
  }
};
// END PLACEHOLDER


// Corrected imports for UI components
import VideoPlayer from "@/app/components/video/VideoPlayer"; // Path relative to src/app/
import { Button } from "@/app/components/ui/button"; // Adjusted path
import { Badge } from "@/app/components/ui/badge"; // Adjusted path
import {
  Filter,
  Shuffle,
  TrendingUp,
  Clock,
  RefreshCw,
  ChevronUp,
  ChevronDown
} from "lucide-react";


export default function Feed() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const [videos, setVideos] = useState<MockVideo[]>([]);
  // Explicitly allow userPreferences to be null, and define its type when not null
  const [userPreferences, setUserPreferences] = useState<MockUserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterMode, setFilterMode] = useState<"recommended" | "recent" | "shuffle">("recommended");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    // Only load videos if userPreferences has been loaded (is not null)
    if (userPreferences) {
      loadVideos();
    }
  }, [userPreferences, filterMode, selectedCategory]);

  const loadUserData = async () => {
    try {
      const user = await User.me();
      const preferences = await UserPreferences.filter({ created_by: user.email });
      setUserPreferences(preferences[0] || {
        preferred_categories: [],
        blocked_categories: [],
        parental_mode: false
      });
    } catch (error) {
      console.error("Error loading user data:", error);
      // Ensure userPreferences is always set to a valid object, even on error
      setUserPreferences({
        preferred_categories: [],
        blocked_categories: [],
        parental_mode: false
      });
    }
  };

  const loadVideos = async () => {
    setIsLoading(true);
    setCurrentIndex(0);
    try {
      let fetchedVideos: MockVideo[] = [];

      if (selectedCategory) {
        fetchedVideos = await Video.filter({ category: selectedCategory }, "-created_date", 50);
      } else if (userPreferences) { // Ensure userPreferences is not null here
        if (filterMode === "recommended" && userPreferences.preferred_categories.length > 0) {
          for (const category of userPreferences.preferred_categories) {
            const categoryVideos = await Video.filter({ category }, "-created_date", 10);
            fetchedVideos = [...fetchedVideos, ...categoryVideos];
          }
        } else {
          fetchedVideos = await Video.list("-created_date", 50);
        }

        if (userPreferences.blocked_categories.length > 0) {
          fetchedVideos = fetchedVideos.filter(video =>
            !userPreferences.blocked_categories.includes(video.category)
          );
        }
        if (userPreferences.parental_mode) {
          fetchedVideos = fetchedVideos.filter(video => video.age_appropriate);
        }
      } else {
        // Fallback if userPreferences is still null (shouldn't happen with the useEffect guard)
        fetchedVideos = await Video.list("-created_date", 50);
      }

      if (filterMode === "shuffle" && !selectedCategory) {
        fetchedVideos = fetchedVideos.sort(() => Math.random() - 0.5);
      }

      fetchedVideos = Array.from(new Set(fetchedVideos.map(v => v.id)))
        .map(id => fetchedVideos.find(v => v.id === id)!);

      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error loading videos:", error);
      setVideos([]);
    }
    setIsLoading(false);
  };

  const nextVideo = () => {
    if (currentIndex < videos.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const previousVideo = () => {
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleLike = async (videoId: string, liked: boolean) => {
    try {
      setVideos(prev => prev.map(v => {
        if (v.id === videoId) {
          const newLikes = liked ? (v.likes || 0) + 1 : Math.max(0, (v.likes || 0) - 1);
          return { ...v, likes: newLikes };
        }
        return v;
      }));
      // Ensure video is found before accessing likes property
      const videoToUpdate = videos.find(v => v.id === videoId);
      if (videoToUpdate) {
        await Video.update(videoId, { likes: liked ? (videoToUpdate.likes || 0) + 1 : Math.max(0, (videoToUpdate.likes || 0) - 1) });
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleShare = async (video: MockVideo) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: window.location.href
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      document.execCommand('copy');
      console.log("Link copied to clipboard!");
    }
  };

  const filterModes = [
    { key: "recommended", label: "For You", icon: TrendingUp },
    { key: "recent", label: "Recent", icon: Clock },
    { key: "shuffle", label: "Shuffle", icon: Shuffle }
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <RefreshCw className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Your Feed</h2>
          <p className="text-slate-400">Curating personalized content...</p>
        </motion.div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Filter className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">No Videos Found</h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            We couldn't find videos matching your {selectedCategory ? `'${selectedCategory}'` : 'preferences'}. Try adjusting your categories or check back later!
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Feed
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-screen bg-black overflow-hidden"
    >
      {/* Filter Controls */}
      <motion.div
        className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          {/* Display current category if selected, otherwise display filter modes */}
          {selectedCategory ? (
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-base py-2 px-4">
              Viewing: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </Badge>
          ) : (
            filterModes.map((mode) => (
              <Button
                key={mode.key}
                onClick={() => setFilterMode(mode.key as "recommended" | "recent" | "shuffle")}
                variant={filterMode === mode.key ? "default" : "ghost"}
                className={`${
                  filterMode === mode.key
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20"
                } transition-all duration-300`}
                size="sm"
              >
                <mode.icon className="w-4 h-4 mr-2" />
                {mode.label}
              </Button>
            ))
          )}
        </div>

        <div className="text-white/60 text-sm backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full">
          {currentIndex + 1} / {videos.length}
        </div>
      </motion.div>

      {/* Video Player */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isTransitioning ? 0.5 : 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {videos[currentIndex] && (
            <VideoPlayer
              video={videos[currentIndex]}
              onLike={handleLike}
              onShare={handleShare}
              isActive={!isTransitioning}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-4">
        <motion.button
          onClick={previousVideo}
          disabled={currentIndex === 0}
          className={`w-12 h-12 rounded-full backdrop-blur-sm border transition-all duration-300 flex items-center justify-center ${
            currentIndex === 0
              ? "bg-white/5 border-white/10 text-white/30 cursor-not-allowed"
              : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20 active:scale-95"
          }`}
          whileHover={currentIndex > 0 ? { scale: 1.1 } : {}}
          whileTap={currentIndex > 0 ? { scale: 0.9 } : {}}
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>

        <motion.button
          onClick={nextVideo}
          disabled={currentIndex === videos.length - 1}
          className={`w-12 h-12 rounded-full backdrop-blur-sm border transition-all duration-300 flex items-center justify-center ${
            currentIndex === videos.length - 1
              ? "bg-white/5 border-white/10 text-white/30 cursor-not-allowed"
              : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20 active:scale-95"
          }`}
          whileHover={currentIndex < videos.length - 1 ? { scale: 1.1 } : {}}
          whileTap={currentIndex < videos.length - 1 ? { scale: 0.9 } : {}}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Swipe Instructions (Visible on smaller screens or after a delay) */}
      <motion.div
        className="absolute bottom-6 right-6 z-20 text-white/40 text-xs backdrop-blur-sm bg-black/20 px-3 py-2 rounded-full hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Swipe up/down to navigate
      </motion.div>
    </div>
  );
}
