import { useApp } from '../context/AppContext';

interface Swatch {
  name: string;
  hex: string;
}

export default function ColorSwatches({
  colors,
  selected,
  onSelect,
}: {
  colors: Swatch[];
  selected: string;
  onSelect: (name: string, hex: string) => void;
}) {
  const { t } = useApp();
  return (
    <div className="swatch-row">
      {colors.map((c) => (
        <button
          key={c.name}
          type="button"
          className="color-swatch-wrap"
          onClick={() => onSelect(c.name, c.hex)}
          aria-label={t(c.name)}
          title={t(c.name)}
        >
          <span
            className={`color-swatch${selected === c.name ? ' selected' : ''}`}
            style={{ background: c.hex }}
          />
          <span className="color-swatch-label">{t(c.name)}</span>
        </button>
      ))}
    </div>
  );
}
