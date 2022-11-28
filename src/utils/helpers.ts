const colors = ['#7795CA', '#F7C955', '#99A33B'];

export function pickChakraRandomColor() {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `linear-gradient( rgba(255, 255, 255, 0) 0%, ${color} 100%)`;
}

export function swap<T>(arr: T[], i: number, j: number): T[] {
  const copy = [...arr];
  const tmp = copy[i];
  copy[i] = copy[j];
  copy[j] = tmp;
  return copy;
}
