import get from "lodash/get";
import set from "lodash/set";
import Agent from "@/Agent";

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
    [/edit/, /.*/, /.*/],
    (state, { item }) => {
      if (state.current !== item) {
        Agent.moveTo(item);
        return { ...state, current: item };
      }
      return state;
    }
  ],
  [
    ([/create|move/, /navbar/, /.*/],
    (state, { props }) => {
      const nextState = { ...state, current: "navbar" };
      return set(
        nextState,
        "navBar.position",
        POSITIONS[get(props, "position.rele", "totop")]
      );
    })
  ],
  [
    [/delete/, /navbar/, /.*/],
    (state, { props }) => {
      const nextState = { ...state, current: "content" };
      return set(nextState, "navBar.position", null);
    }
  ],
  [
    [/create/, /menuitem/, /.*/],
    (state, { props }) => {
      const nextState = { ...state, current: "navbar" };
      return pushToList(nextState, "navBar.items", {
        text: props.freetext,
        url: ""
      });
    }
  ],
  [
    [/delete/, /menuitem/, /.*/],
    (state, { props }) => {
      const nextState = { ...state, current: "navbar" };
      return filterFromList(
        nextState,
        "navBar.items",
        v => v.text !== props.freetext
      );
    }
  ],
  [
    [/create/, /text|image|button|href/, /.*/],
    (state, { props }) => {
      const currentContext = state.current || "content";
      const context = ["content", "footer"].includes(currentContext)
        ? currentContext
        : "content";

      const nextState = { ...state, current: context };
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
      backgroundColor: "greenyellow",
    },
    brand: {
      display: true,
      style: {
        backgroundColor: null,
        color: null
      }
    }
  },
  navBar: {
    position: "top",
    color: 'lightgreen',
    style: {
      backgroundColor: "lightgreen",
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
    style: {
      backgroundColor: "lightyellow",
    },
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
  footer: {
    style: {
      backgroundColor: "greenyellow",
    },
    items: [
      {item: 'ImageComponent', url: 'http://images5.fanpop.com/image/photos/31000000/haters-gonna-hate-random-31076705-550-413.jpg'},
      {item: 'TextComponent', text: 'qwerty'},
      {item: 'ButtonComponent', text: 'button'},
      {item: 'LinkComponent', text: 'qwertylink'},
    ]
  },
};
