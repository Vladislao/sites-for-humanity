import get from "lodash/get";
import set from "lodash/set";

const pushToList = (obj, path, value) => {
  const list = get(obj, path, []);
  return set(obj, path, [...list, value]);
};

const filterFromList = (obj, path, filter) => {
  const list = get(obj, path, []);
  return set(obj, path, list.filter(filter));
};

const POSITIONS = {
  totop: "top",
  tobottom: "bottom",
  toleft: "left",
  toright: "right"
};

// [[command, item, context], handler]
const HANDLERS = [
  [
    [/create|move/, /navbar/, /.*/],
    (state, { props }) => {
      const nextState = { ...state, current: "navBar" };
      return set(
        nextState,
        "navBar.position",
        POSITIONS[props.position] || "top"
      );
    }
  ],
  [
    [/delete/, /navbar/, /.*/],
    (state, { props }) => {
      const nextState = { ...state, current: "default" };
      return set(nextState, "navBar.position", null);
    }
  ],
  [
    [/create/, /menuitem/, /.*/],
    (state, { props }) => {
      const nextState = { ...state, current: "navBar" };
      return pushToList(nextState, "navBar.items", {
        text: props.freetext,
        url: ""
      });
    }
  ],
  [
    [/delete/, /menuitem/, /.*/],
    (state, { props }) => {
      const nextState = { ...state, current: "navBar" };
      return filterFromList(
        nextState,
        "navBar.items",
        v => v.text !== props.freetext
      );
    }
  ]
];

const getHandler = (action, currentContext) => {
  return HANDLERS.find(v => {
    const [command, item, context] = v[0];
    return (
      command.test(action.command) &&
      item.test(action.item || "") &&
      context.test(currentContext || "")
    );
  });
};

export const dispatch = (state, actions) => {
  return actions.reduce((acc, action) => {
    const handler = getHandler(action, acc.current)[1];
    return handler ? handler(acc, action) : acc;
  }, state);
};

export default {
  header: {
    display: true,
    style: {
      backgroundColor: null,
      variant: "info",
      type: "dark"
    },
    brand: {
      display: true,
      text: "Brend",
      imgSrc: "https://placekitten.com/g/30/30",
      style: {
        backgroundColor: null,
        color: null
      }
    }
  },
  navBar: {
    position: "left",
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
  },
  content: {
    left: [
      {
        item: "ImageComponent",
        url:
          "http://images5.fanpop.com/image/photos/31000000/haters-gonna-hate-random-31076705-550-413.jpg"
      },
      { item: "TextComponent", text: "qwerty" },
      { item: "LinkComponent", text: "qwertylink" }
    ],
    right: [{ item: "ButtonComponent", text: "button" }]
  },
  footer: false
};
