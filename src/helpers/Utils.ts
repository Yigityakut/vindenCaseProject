export function calculatePrice(
  width: number,
  height: number,
  depth: number,
  unmountingWanted: boolean,
) {
  // Change calculation logic
  return (
    Math.floor((width * height * depth * (unmountingWanted ? 2 : 1)) / 50) || 0
  );
}
