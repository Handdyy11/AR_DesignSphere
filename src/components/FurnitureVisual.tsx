import type { CSSProperties } from 'react';

interface FurnitureVisualProps {
  src: string;
  tint?: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  isSticker?: boolean;
  stickerStyle?: 'diecut' | 'seamless';
  material?: string;
}

export default function FurnitureVisual({
  src,
  tint,
  alt,
  className = '',
  style,
  isSticker = true,
  stickerStyle = 'diecut',
  material,
}: FurnitureVisualProps) {
  // If tint is specified, realistic dual-layer tint is applied to all materials
  const hasTint = Boolean(tint && tint !== 'transparent');

  return (
    <div
      className={`furniture-visual-root ${isSticker ? `as-sticker ${stickerStyle}` : ''} ${className}`.trim()}
      data-material={material}
      style={style}
    >
      <div className="furniture-visual-inner">
        {/* Main Furniture Photo with contrast booster */}
        <img
          src={src}
          alt={alt}
          className="furniture-render-img"
          loading="lazy"
        />

        {/* Dual-layer real-time material tinting */}
        {hasTint && (
          <>
            {/* Color blend layer: changes hue & saturation of fabrics/materials */}
            <div
              className="tint-layer color-blend"
              style={{ backgroundColor: tint }}
            />
            {/* Multiply blend layer: preserves textures, folds, and shadow contours */}
            <div
              className="tint-layer multiply-blend"
              style={{ backgroundColor: tint }}
            />
          </>
        )}
      </div>
    </div>
  );
}
