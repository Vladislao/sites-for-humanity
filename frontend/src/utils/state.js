export const dispatch = (state, actions) => {
  console.log(actions);
  console.log(state);

  return { ...state };
};

export default {
  header: {
    display: true,
    nav: {
      display: true,
      brand: {
        display: true,
        text: "Brend",
        imgSrc: "https://placekitten.com/g/30/30"
      },
      nav: {
        display: true,
        items: [
          {
            text: "Active",
            url: ""
          },
          {
            text: "Link",
            url: ""
          },
          {
            text: "Another Link",
            url: ""
          }
        ]
      }
    }
  },
  rightPanel: false,
  leftPanel: false,
  footer: false,
  content: {
    left: [
      {item: 'ImageComponent', url: 'http://images5.fanpop.com/image/photos/31000000/haters-gonna-hate-random-31076705-550-413.jpg'},
      {item: 'TextComponent', text: 'qwerty'},
      {item: 'LinkComponent', text: 'qwertylink'},
    ],
    right: [
      {item: 'ButtonComponent', text: 'button'}
    ]
  },
};
