export const dispatch = (state, actions) => {
  console.log(actions);
  console.log(state);

  return { ...state };
};

export default {
  header: {
    display: false,
    nav: {
      display: false,
      brand: {
        display: false,
        text: "",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/commons/5/53/Vue.js_Logo.svg"
      },
      nav: {
        display: false,
        items: [
          {
            text: "Home",
            url: "/"
          }
        ]
      }
    }
  }
};
