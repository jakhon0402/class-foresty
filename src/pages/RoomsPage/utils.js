export const changeFloorState = (state) => {
  const floors = [];
  for (let i = Math.max(...state.rooms.map((el) => el?.floor)); i >= 0; i--) {
    floors.push(i);
  }
  return floors;
};
