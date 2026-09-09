import fs from 'fs';
import path from 'path';
import {
  POINT_CHIP_COORDINATES,
  PointLayersInfo
} from '@/data/pointLayersConfig';

/**
 * Server-only helper to inspect public/points/[folderName]
 * and resolve existing image files (.png, .jpg, etc.)
 */
export function resolvePointLayersServer(pointId: string): PointLayersInfo {
  const folderName = pointId.replace(/-/g, '_');
  const fallbackImage = `/points_images/${folderName}.jpg`;
  const coord = POINT_CHIP_COORDINATES[pointId] || { x: 50, y: 50, size: 14 };

  const pointsDir = path.join(process.cwd(), 'public', 'points', folderName);
  
  let bodyImage = fallbackImage;
  let handOverlay = fallbackImage;
  let hasCustomLayers = false;

  if (fs.existsSync(pointsDir)) {
    // Hledáme body.png, body.jpg, body.jpeg, body.webp
    for (const ext of ['png', 'jpg', 'jpeg', 'webp']) {
      const filePath = path.join(pointsDir, `body.${ext}`);
      if (fs.existsSync(filePath)) {
        bodyImage = `/points/${folderName}/body.${ext}`;
        hasCustomLayers = true;
        break;
      }
    }

    // Hledáme hand.png, hand.webp, hand.jpg
    for (const ext of ['png', 'webp', 'jpg']) {
      const filePath = path.join(pointsDir, `hand.${ext}`);
      if (fs.existsSync(filePath)) {
        handOverlay = `/points/${folderName}/hand.${ext}`;
        break;
      }
    }
  }

  return {
    folderName,
    bodyImage,
    handOverlay,
    fallbackImage,
    hasCustomLayers,
    chipCoord: coord,
  };
}
