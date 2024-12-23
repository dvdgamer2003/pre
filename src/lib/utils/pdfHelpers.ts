export function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function calculateTextHeight(
  doc: any,
  text: string,
  fontSize: number,
  lineHeight: number,
  maxWidth: number
): number {
  doc.setFontSize(fontSize);
  const lines = doc.splitTextToSize(text, maxWidth);
  return lines.length * lineHeight;
}

export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => resolve(img);
    img.onerror = () => {
      // Try without timestamp if first attempt fails
      if (!url.includes('t=')) {
        img.src = url;
      } else {
        reject(new Error('Failed to load image'));
      }
    };
    
    // First try with timestamp to bypass cache
    img.src = `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
  });
}

export function addClickableLink(
  doc: any, 
  text: string, 
  url: string, 
  x: number, 
  y: number,
  options: { color?: number[] } = {}
) {
  const textWidth = doc.getTextWidth(text);
  doc.setTextColor(...(options.color || PDF_STYLES.colors.link));
  doc.text(text, x, y);
  doc.link(x, y - 5, textWidth, 10, { url });
}