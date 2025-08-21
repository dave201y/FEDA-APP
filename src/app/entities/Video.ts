// src/entities/Video.ts

// Define the shape of a Video document.
// This should closely match your Appwrite database attributes later.
export interface Video {
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
  created_by: string; // E.g., user email or ID
  tags: string[];
  created_at?: string; // Optional: for sorting
  updated_at?: string; // Optional: for sorting
}

// --- Mock Data (Replace with Appwrite SDK calls later) ---
const mockVideos: Video[] = [
  {
    id: "1", title: "Understanding React Hooks", description: "A deep dive into useState, useEffect, and custom hooks for building dynamic React applications.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/007bff/ffffff?text=React+Hooks",
    category: "educational", duration: 180, views: 12345, likes: 567, age_appropriate: true, created_by: "CodeExplorers", tags: ["react", "hooks"], created_at: "2024-07-01T10:00:00Z"
  },
  {
    id: "2", title: "Delicious Pasta Recipe", description: "Learn how to make a creamy, delicious pasta dish in under 30 minutes!",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/ff7f50/ffffff?text=Pasta+Recipe",
    category: "cooking", duration: 240, views: 8765, likes: 1234, age_appropriate: true, created_by: "ChefAstro", tags: ["food", "cooking"], created_at: "2024-06-25T12:30:00Z"
  },
  {
    id: "3", title: "Workout Motivation: Full Body", description: "A high-intensity full-body workout to get your heart pumping and muscles burning.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/32cd32/ffffff?text=Workout",
    category: "fitness", duration: 300, views: 23456, likes: 2100, age_appropriate: true, created_by: "FitJourney", tags: ["fitness", "workout"], created_at: "2024-07-05T08:00:00Z"
  },
  {
    id: "4", title: "Highlights: NBA Finals 2024", description: "Best plays from the exciting NBA Finals game.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/800080/ffffff?text=NBA+Finals",
    category: "sports", duration: 120, views: 50000, likes: 8000, age_appropriate: true, created_by: "SportsKing", tags: ["sports", "basketball", "NBA"], created_at: "2024-07-10T21:00:00Z"
  },
  {
    id: "5", title: "Travel Vlog: Exploring Kyoto", description: "Join me on an unforgettable journey through the ancient temples and vibrant streets of Kyoto, Japan.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/8a2be2/ffffff?text=Kyoto+Travel",
    category: "travel", duration: 480, views: 15000, likes: 980, age_appropriate: true, created_by: "WanderlustExplorers", tags: ["travel", "japan"], created_at: "2024-06-18T15:45:00Z"
  },
  {
    id: "6", title: "Funny Cat Compilation", description: "A compilation of the funniest cat moments.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/FFD700/000000?text=Funny+Cats",
    category: "comedy", duration: 150, views: 75000, likes: 12000, age_appropriate: true, created_by: "LaughTrack", tags: ["funny", "cats", "animals"], created_at: "2024-07-08T18:20:00Z"
  },
  {
    id: "7", title: "Tech Review: Latest Smartphone", description: "In-depth review of the newest flagship smartphone.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/4682B4/ffffff?text=Smartphone+Review",
    category: "technology", duration: 400, views: 30000, likes: 3500, age_appropriate: true, created_by: "TechInsights", tags: ["tech", "smartphone", "review"], created_at: "2024-07-03T09:15:00Z"
  },
  {
    id: "8", title: "Classic Rock Anthems", description: "The greatest hits of classic rock.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/8B008B/ffffff?text=Classic+Rock",
    category: "music", duration: 600, views: 20000, likes: 4000, age_appropriate: true, created_by: "MusicLover", tags: ["music", "rock"], created_at: "2024-06-30T20:00:00Z"
  },
  {
    id: "9", title: "Football Training Drills", description: "Improve your football skills with these drills.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/008000/ffffff?text=Football+Drills",
    category: "sports", duration: 180, views: 18000, likes: 2500, age_appropriate: true, created_by: "SportyCoach", tags: ["sports", "football", "training"], created_at: "2024-07-07T11:00:00Z"
  },
  {
    id: "10", title: "The Art of Portrait Painting", description: "A step-by-step guide to painting expressive portraits.",
    video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail_url: "https://placehold.co/600x400/A52A2A/ffffff?text=Portrait+Painting",
    category: "art_creativity", duration: 500, views: 9000, likes: 1500, age_appropriate: true, created_by: "ArtisticSoul", tags: ["art", "painting", "creativity"], created_at: "2024-07-02T14:00:00Z"
  }
];

export const Video = {
  /**
   * Lists all mock videos. In a real app, this would query Appwrite.
   * @param orderBy (string) - Field to order by (e.g., "-created_at" for descending).
   * @param limit (number) - Max number of videos to return.
   * @returns Promise<Video[]>
   */
  list: async (orderBy: string = "-created_at", limit: number = 50): Promise<Video[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    let videos = [...mockVideos]; // Create a copy to avoid modifying the original

    // Simple sorting simulation
    if (orderBy.startsWith("-")) {
      const field = orderBy.substring(1) as keyof Video;
      videos.sort((a, b) => {
        if (field === "created_at" || field === "views" || field === "likes" || field === "duration") {
          return (b[field] as any) - (a[field] as any);
        }
        return 0;
      });
    } else {
      const field = orderBy as keyof Video;
      videos.sort((a, b) => {
        if (field === "created_at" || field === "views" || field === "likes" || field === "duration") {
          return (a[field] as any) - (b[field] as any);
        }
        return 0;
      });
    }

    return videos.slice(0, limit);
  },

  /**
   * Filters mock videos by given criteria. In a real app, this would query Appwrite.
   * @param filters (object) - Key-value pairs to filter by (e.g., { category: "sports" }).
   * @param orderBy (string) - Field to order by.
   * @param limit (number) - Max number of videos to return.
   * @returns Promise<Video[]>
   */
  filter: async (
    filters: { category?: string; created_by?: string; age_appropriate?: boolean },
    orderBy: string = "-created_at",
    limit: number = 50
  ): Promise<Video[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    let filteredVideos = [...mockVideos];

    if (filters.category) {
      filteredVideos = filteredVideos.filter(video => video.category === filters.category);
    }
    if (filters.created_by) {
      filteredVideos = filteredVideos.filter(video => video.created_by === filters.created_by);
    }
    if (typeof filters.age_appropriate === 'boolean') {
      filteredVideos = filteredVideos.filter(video => video.age_appropriate === filters.age_appropriate);
    }

    // Apply sorting after filtering
    if (orderBy.startsWith("-")) {
      const field = orderBy.substring(1) as keyof Video;
      filteredVideos.sort((a, b) => {
        if (field === "created_at" || field === "views" || field === "likes" || field === "duration") {
          return (b[field] as any) - (a[field] as any);
        }
        return 0;
      });
    } else {
      const field = orderBy as keyof Video;
      filteredVideos.sort((a, b) => {
        if (field === "created_at" || field === "views" || field === "likes" || field === "duration") {
          return (a[field] as any) - (b[field] as any);
        }
        return 0;
      });
    }

    return filteredVideos.slice(0, limit);
  },

  /**
   * Updates a mock video. In a real app, this would use Appwrite's updateDocument.
   * @param id (string) - ID of the video to update.
   * @param data (Partial<Video>) - Partial video object with fields to update.
   * @returns Promise<void>
   */
  update: async (id: string, data: Partial<Video>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
    const videoIndex = mockVideos.findIndex(v => v.id === id);
    if (videoIndex !== -1) {
      mockVideos[videoIndex] = { ...mockVideos[videoIndex], ...data };
      console.log(`Mock Video ${id} updated:`, mockVideos[videoIndex]);
    } else {
      console.warn(`Mock Video with ID ${id} not found for update.`);
    }
  },

  /**
   * Creates a mock video.
   * @param video (Video) - The video object to create.
   * @returns Promise<Video>
   */
  create: async (video: Video): Promise<Video> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newVideo = { ...video, id: Math.random().toString(36).substring(2, 11) }; // Simple ID generation
    mockVideos.push(newVideo);
    console.log("Mock Video created:", newVideo);
    return newVideo;
  },

  /**
   * Deletes a mock video.
   * @param id (string) - ID of the video to delete.
   * @returns Promise<void>
   */
  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const initialLength = mockVideos.length;
    mockVideos.splice(mockVideos.findIndex(v => v.id === id), 1);
    if (mockVideos.length < initialLength) {
      console.log(`Mock Video ${id} deleted.`);
    } else {
      console.warn(`Mock Video with ID ${id} not found for deletion.`);
    }
  }
};
