import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
export interface MediaItem {
  _id: string;
  url: string;
  publicId?: string;
  format?: string;
  width?: number;
  height?: number;
  createdAt?: string;
  name?: string;
  type?: string;
}

// Query Keys
export const mediaKeys = {
  all: ["media"] as const,
  lists: () => [...mediaKeys.all, "list"] as const,
  list: (folder?: string) => [...mediaKeys.lists(), { folder }] as const,
  details: () => [...mediaKeys.all, "detail"] as const,
  detail: (id: string) => [...mediaKeys.details(), id] as const,
};

// API Functions
const fetchMedia = async (): Promise<MediaItem[]> => {
  const res = await fetch("/api/media");
  if (!res.ok) throw new Error("Failed to fetch media");
  return res.json();
};

const uploadMedia = async (file: File): Promise<MediaItem> => {
  const formData = new FormData();
  formData.set("file", file);
  
  const res = await fetch("/api/media", {
    method: "POST",
    body: formData,
  });
  
  if (!res.ok) throw new Error("Failed to upload media");
  return res.json();
};

const deleteMedia = async (id: string): Promise<{ message: string }> => {
  const res = await fetch(`/api/media/${id}`, {
    method: "DELETE",
  });
  
  if (!res.ok) throw new Error("Failed to delete media");
  return res.json();
};

// Hooks

/**
 * Hook to fetch all media items
 */
export function useMedia() {
  return useQuery({
    queryKey: mediaKeys.lists(),
    queryFn: fetchMedia,
  });
}

/**
 * Hook to upload media
 */
export function useUploadMedia() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: uploadMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
    },
  });
}

/**
 * Hook to delete media
 */
export function useDeleteMedia() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
    },
  });
}
