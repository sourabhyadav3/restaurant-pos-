export const getImageUrl = (imagePath) => {
  if (!imagePath) return '🍽️';
  
  // If it's an emoji (length <= 2)
  if (imagePath.length <= 2) return imagePath;
  
  // If it's a base64 string
  if (imagePath.startsWith('data:')) return imagePath;
  
  // If it's already a full URL
  if (imagePath.startsWith('http')) return imagePath;
  
  // Otherwise, assume it's a relative path from the backend
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
  
  // Ensure we don't have double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  return `${baseUrl}${cleanPath}`;
};
