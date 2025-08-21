"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User as UserIcon,
  Settings,
  Share2,
  Bell,
  MessageSquare,
  Bookmark,
  Heart,
  Eye,
  PlusCircle,
  Link as LinkIcon,
  LayoutGrid,
  History,
  Info,
  Edit,
  MoreHorizontal,
  Shield
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Dialog } from "@/app/components/ui/dialog"; // If you have a Dialog/modal component

// Import entity definitions
import { User } from "@/app/entities/User";
import { Video } from "@/app/entities/Video";

// --- Placeholder/Mock Data for Profile and Videos ---
// (These will eventually be replaced by Appwrite calls)

// Extend the User interface from src/entities/User.ts for more profile details
interface ProfileUser extends User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  linktree_url?: string;
  followers: number;
  following: number;
  total_likes: number;
  is_verified?: boolean;
}

// IMPORTANT: Define a specific ID for the currently "logged-in" user in mock data
// This ID will be compared against the profile being viewed.
const MOCK_LOGGED_IN_USER_ID = "user_id_abc"; // This should match the ID in mockCurrentUser below

const mockCurrentUser: ProfileUser = {
  id: MOCK_LOGGED_IN_USER_ID, // Ensure this matches MOCK_LOGGED_IN_USER_ID
  email: "ugolord@example.com",
  name: "Ugo Lord",
  bio: "Hi! I'm Ugo Lord! 🧑‍⚖️ Biz Lawyer, Biz Coach, & Public Speaker. Building a community to demystify law & business.",
  linktree_url: "https://www.ugolord.com",
  followers: 6700000,
  following: 178,
  total_likes: 258200000,
  is_verified: true,
};

// Mock data for another user's profile (for testing purposes if you implement viewing other profiles)
const mockAnotherUser: ProfileUser = {
  id: "user_id_xyz",
  email: "anotheruser@example.com",
  name: "Another Creator",
  bio: "Sharing daily insights on creative workflows and digital art.",
  followers: 12000,
  following: 50,
  total_likes: 50000,
  is_verified: false,
};

// Mock videos for the profile page, associated with this user
const mockProfileVideos: Video[] = [
  {
    id: "pv1", title: "Fact or Cap? Decoding Contracts", description: "Is that clause really enforceable? Let's find out!",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/300x400/FF0077/ffffff?text=Fact+or+Cap",
    category: "educational", duration: 60, views: 1200000, likes: 250000, age_appropriate: true, created_by: "ugolord@example.com", tags: ["law", "contracts"], created_at: "2024-07-20T10:00:00Z"
  },
  {
    id: "pv2", title: "Who's Liable? Road Rage Incident", description: "Analyzing a tricky road rage scenario – who's at fault legally?",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/300x400/007bff/ffffff?text=Who's+Liable",
    category: "educational", duration: 75, views: 800000, likes: 180000, age_appropriate: true, created_by: "ugolord@example.com", tags: ["law", "liability"], created_at: "2024-07-18T14:30:00Z"
  },
  {
    id: "pv3", title: "Collaborate With Me!", description: "Are you a business owner or content creator? Let's connect and create!",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/300x400/FFA500/ffffff?text=Collaborate",
    category: "business", duration: 45, views: 300000, likes: 50000, age_appropriate: true, created_by: "ugolord@example.com", tags: ["business", "collaboration"], created_at: "2024-07-15T09:00:00Z"
  },
  {
    id: "pv4", title: "Just Watched: Legal Tech Trends", description: "My take on the latest innovations in legal technology.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/300x400/20B2AA/ffffff?text=Legal+Tech",
    category: "technology", duration: 90, views: 400000, likes: 70000, age_appropriate: true, created_by: "ugolord@example.com", tags: ["tech", "law", "AI"], created_at: "2024-07-12T11:00:00Z"
  },
  {
    id: "pv5", title: "Protecting Your IP: Copyright vs Trademark", description: "Understanding the difference for your business.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/300x400/DE3163/ffffff?text=IP+Rights",
    category: "educational", duration: 110, views: 600000, likes: 90000, age_appropriate: true, created_by: "ugolord@example.com", tags: ["law", "IP"], created_at: "2024-07-09T16:00:00Z"
  },
];


// Mock implementation for User and Video entities within this file
const MockUserEntity = {
  // In a real app, this would get the *authenticated* user's profile
  me: async (): Promise<ProfileUser> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCurrentUser; // Always returns the mock logged-in user for now
  },
  // This would be used to fetch *any* user's profile by ID
  getById: async (userId: string): Promise<ProfileUser | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (userId === mockCurrentUser.id) return mockCurrentUser;
    if (userId === mockAnotherUser.id) return mockAnotherUser;
    return null;
  }
};

const MockVideoEntity = {
  filter: async (filters: { created_by?: string }, orderBy: string, limit: number): Promise<Video[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    let filtered = [...mockProfileVideos]; // For now, this mock always returns same videos

    if (filters.created_by) {
      filtered = filtered.filter(video => video.created_by === filters.created_by);
    }
    // Simple sorting by created_at descending for most recent first
    if (orderBy === "-created_at") {
      filtered.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
    }
    return filtered.slice(0, limit);
  }
};
// --- END Placeholder/Mock Data ---


// Helper function to format large numbers (e.g., 6700000 -> 6.7M)
const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toString();
};

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<ProfileUser | null>(null);
  const [userVideos, setUserVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'videos' | 'liked' | 'saved'>('videos');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [bannerPhoto, setBannerPhoto] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [currentLoggedInUserId, setCurrentLoggedInUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      try {
        const loggedInUser = await MockUserEntity.me();
        setCurrentLoggedInUserId(loggedInUser.id);
        const profile = loggedInUser;
        setUserProfile(profile);
        const videos = await MockVideoEntity.filter({ created_by: profile.email }, "-created_at", 50);
        setUserVideos(videos);
      } catch (error) {
        console.error("Failed to load profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfileData();
  }, []);

  const isOwnProfile = userProfile && currentLoggedInUserId ? userProfile.id === currentLoggedInUserId : false;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfilePhoto(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Banner photo upload handler
  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setBannerPhoto(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open edit modal with current name and bio
  const handleEditProfileClick = () => {
    setEditName(userProfile?.name || "");
    setEditBio(userProfile?.bio || "");
    setShowEditModal(true);
  };

  // Save changes to name and bio
  const handleSaveProfile = () => {
    if (userProfile) {
      setUserProfile({ ...userProfile, name: editName, bio: editBio });
    }
    setShowEditModal(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Loading Profile...</h2>
          <p className="text-slate-400">Fetching user data and videos.</p>
        </motion.div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Info className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Profile Not Found</h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            We couldn't load the user profile. Please try again later.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Refresh Page
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto backdrop-blur-lg bg-white/5 rounded-3xl shadow-xl p-6 sm:p-8 relative">

        {/* Profile Banner */}
        <div className="relative h-40 md:h-56 bg-gradient-to-br from-purple-700 to-pink-700 rounded-2xl overflow-hidden mb-12 shadow-inner">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: bannerPhoto
                ? `url('${bannerPhoto}')`
                : 'url("https://placehold.co/1200x300/6A0DAD/E91E63/svg?text=Feda+Profile+Banner")'
            }}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-end p-4 gap-2">
            {isOwnProfile && (
              <label className="bg-black/60 rounded-full p-2 cursor-pointer hover:bg-black/80 transition mr-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBannerUpload}
                />
                <Edit className="w-5 h-5 text-white" />
              </label>
            )}
            <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/10">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Profile Avatar and Main Info */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative -mt-32 mb-8 flex flex-col items-center"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-700 overflow-hidden shadow-2xl bg-slate-800 flex items-center justify-center mb-4 relative">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-20 h-20 text-slate-400" />
            )}
            {isOwnProfile && (
              <label className="absolute bottom-2 right-2 bg-black/60 rounded-full p-2 cursor-pointer hover:bg-black/80 transition">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                <Edit className="w-5 h-5 text-white" />
              </label>
            )}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2 mb-2">
            {userProfile.name}
            {userProfile.is_verified && (
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Shield className="w-3 h-3 mr-1" /> Verified
              </Badge>
            )}
          </h2>
          <p className="text-slate-400 text-lg mb-4">@{userProfile.email.split('@')[0]}</p>

          {/* Profile Actions Row */}
          <div className="flex gap-4 mb-6">
            {isOwnProfile ? (
              <>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg"
                  onClick={handleEditProfileClick}
                >
                  <Edit className="w-5 h-5 mr-2" /> Edit Profile
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-4 py-3">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-4 py-3">
                  <Share2 className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <>
                <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-3 rounded-full shadow-lg">
                  <PlusCircle className="w-5 h-5 mr-2" /> Follow
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-4 py-3">
                  <MessageSquare className="w-5 h-5" />
                </Button>
              </>
            )}
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-4 py-3">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Bio and Linktree */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-slate-300 mb-6 max-w-lg mx-auto"
          >
            <p className="mb-2 leading-relaxed">{userProfile.bio}</p>
            {isOwnProfile && (
              <Button
                variant="ghost"
                className="text-cyan-400 hover:text-cyan-300 mb-2"
                onClick={handleEditProfileClick}
              >
                <Edit className="w-4 h-4 mr-1" /> Edit Bio
              </Button>
            )}
            {userProfile.linktree_url && (
              <a
                href={userProfile.linktree_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-cyan-400 hover:underline hover:text-cyan-300 transition-colors mt-2"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                Linktree
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Edit Profile Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
            <label className="block mb-2 text-sm font-semibold text-slate-300">Name</label>
            <input
              type="text"
              className="w-full rounded-lg p-2 bg-slate-800 text-white border border-slate-700 mb-4"
              value={editName}
              onChange={e => setEditName(e.target.value)}
            />
            <label className="block mb-2 text-sm font-semibold text-slate-300">Bio</label>
            <textarea
              className="w-full rounded-lg p-2 bg-slate-800 text-white border border-slate-700 mb-4"
              rows={4}
              value={editBio}
              onChange={e => setEditBio(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
              <Button onClick={handleSaveProfile}>Save</Button>
            </div>
          </div>
        </Dialog>

        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 text-center mb-6"
        >
          <div>
            <p className="text-xl font-bold text-white">{formatNumber(userProfile.following)}</p>
            <p className="text-slate-400 text-sm">Following</p>
          </div>
          <div>
            <p className="text-xl font-bold text-white">{formatNumber(userProfile.followers)}</p>
            <p className="text-slate-400 text-sm">Followers</p>
          </div>
          <div>
            <p className="text-xl font-bold text-white">{formatNumber(userProfile.total_likes)}</p>
            <p className="text-slate-400 text-sm">Likes</p>
          </div>
        </motion.div>

        {/* Tabs for Videos, Liked, Saved */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex border-b border-white/10 mb-6 sticky top-0 bg-white/5 backdrop-blur-md z-10"
        >
          <TabButton label="Videos" icon={LayoutGrid} isActive={activeTab === 'videos'} onClick={() => setActiveTab('videos')} />
          <TabButton label="Liked" icon={Heart} isActive={activeTab === 'liked'} onClick={() => setActiveTab('liked')} />
          <TabButton label="Saved" icon={Bookmark} isActive={activeTab === 'saved'} onClick={() => setActiveTab('saved')} />
        </motion.div>

        {/* Video Grid Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {activeTab === 'videos' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {userVideos.length > 0 ? (
                userVideos.map((video) => (
                  <VideoThumbnail key={video.id} video={video} />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-slate-400">
                  <p>No videos uploaded yet.</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'liked' && (
            <div className="text-center py-10 text-slate-400">
              <p>Liked videos will appear here.</p>
            </div>
          )}
          {activeTab === 'saved' && (
            <div className="text-center py-10 text-slate-400">
              <p>Saved videos will appear here.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Helper component for Tab Buttons
interface TabButtonProps {
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ label, icon: Icon, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-3 border-b-2 transition-all duration-200 ${
        isActive
          ? "border-pink-500 text-pink-400 font-semibold"
          : "border-transparent text-slate-400 hover:text-white hover:border-white/20"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm md:text-base">{label}</span>
    </button>
  );
}

// Helper component for Video Thumbnails
interface VideoThumbnailProps {
  video: Video;
}

function VideoThumbnail({ video }: VideoThumbnailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative aspect-[3/4] bg-slate-800 rounded-lg overflow-hidden shadow-md group cursor-pointer hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
    >
      <img
        src={video.thumbnail_url || `https://placehold.co/300x400/333333/ffffff?text=${video.title.substring(0,10)}`}
        alt={video.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/300x400/333333/ffffff?text=Video+Error`; }}
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-end p-3">
        <h4 className="text-white font-semibold text-sm line-clamp-2 mb-1">
          {video.title}
        </h4>
        <div className="flex items-center text-white/80 text-xs">
          <Eye className="w-3 h-3 mr-1" />
          <span>{formatNumber(video.views)}</span>
        </div>
      </div>
      {video.id === "pv1" && (
        <Badge className="absolute top-2 left-2 bg-pink-500 text-white border-pink-500/50 shadow-md">
          Pinned
        </Badge>
      )}
    </motion.div>
  );
}
