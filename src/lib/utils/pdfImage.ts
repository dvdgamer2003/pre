import { PDF_STYLES } from './pdfStyles';

// Fallback image when loading fails
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800';

export async function loadAndProcessImage(url: string): Promise<HTMLImageElement> {
  const tryLoadImage = (imageUrl: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
      
      // Add cache buster to bypass CORS cache issues
      const cacheBuster = `${imageUrl}${imageUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;
      img.src = cacheBuster;
    });
  };

  try {
    // Try loading the original image
    return await tryLoadImage(url);
  } catch (error) {
    console.warn('Failed to load original image, trying proxy...');
    
    try {
      // Try loading through a CORS proxy
      const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
      return await tryLoadImage(proxyUrl);
    } catch (proxyError) {
      console.warn('Failed to load image through proxy, using fallback...');
      
      // Use fallback image as last resort
      return await tryLoadImage(FALLBACK_IMAGE);
    }
  }
}

export function calculateImageDimensions(
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number = PDF_STYLES.image.maxHeight
): { width: number; height: number } {
  const ratio = img.width / img.height;
  let width = maxWidth;
  let height = width / ratio;
  
  if (height > maxHeight) {
    height = maxHeight;
    width = height * ratio;
  }
  
  return { width, height };
}