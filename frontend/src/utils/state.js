export const dispatch = (state, actions) => {
  console.log(actions);
  console.log(state);

  return { ...state };
};

export default {
  header: {
    display: true
  },
  navBar: {
    display: true,
    nav: {
      display: true,
      style: {
        backgroundColor: null,
        variant: 'info',
        type: 'dark'
      },
      brand: {
        display: true,
        text: "Brend",
        imgSrc: "https://placekitten.com/g/30/30",
        style: {
          backgroundColor: null,
          color: null
        },
      },
      nav: {
        display: true,
        style: {
          backgroundColor: null,
          color: null
        },
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
  rightPanel: {
    display: true,
    nav: {
      display: true,
      items: [
          {
              text: 'Item 1',
              url: ''
          },
          {
              text: 'Item 2',
              url: ''
          },
      ]
    }
  },
  leftPanel: {
    display: true,
    nav: {
      display: true,
      items: [
          {
              text: 'Мишки',
              url: ''
          },
          {
              text: 'Шишки',
              url: ''
          },
      ]
    }
  },
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
