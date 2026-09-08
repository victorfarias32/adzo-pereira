function canalLinear(valor255: number): number {
  const s = valor255 / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number {
  const limpo = hex.replace('#', '');
  if (limpo.length !== 6) {
    throw new Error(`hex inválido: ${hex}`);
  }
  const r = canalLinear(parseInt(limpo.slice(0, 2), 16));
  const g = canalLinear(parseInt(limpo.slice(2, 4), 16));
  const b = canalLinear(parseInt(limpo.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hexA: string, hexB: string): number {
  const la = relativeLuminance(hexA);
  const lb = relativeLuminance(hexB);
  const claro = Math.max(la, lb);
  const escuro = Math.min(la, lb);
  return (claro + 0.05) / (escuro + 0.05);
}
