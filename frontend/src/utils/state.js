export const dispatch = (state, actions) => {
  console.log(actions);
  console.log(state);
  return { ...state };
};

export default {
  some: "default state"
};
