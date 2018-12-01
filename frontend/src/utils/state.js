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

const COMPONENTS = {
  button: "ButtonComponent",
  text: "TextComponent",
  href: "LinkComponent",
  image: "ImageComponent"
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
    [/create|move/, /navbar/, /.*/],
    (state, { props }) => {
      const nextState = { ...state, current: "navbar" };
      return set(
        nextState,
        "navBar.position",
        POSITIONS[get(props, "position.rele", "totop")]
      );
    }
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
    (state, { item, props }) => {
      const currentContext = state.current || "content";
      const context = ["content", "footer"].includes(currentContext)
        ? currentContext
        : "content";

      const nextState = { ...state };
      const nextItem = {
        item: COMPONENTS[item || get(props, "position.item", "text")],
        text: props.freetext,
        url: props.url
      };

      console.log(nextItem);

      if (context === "footer") {
        return pushToList(nextState, "footer.items", nextItem);
      } else {
        const positionCurrent =
          POSITIONS[get(props, "position.rele", "toleft")];
        const position = ["left", "right"].includes(positionCurrent)
          ? positionCurrent
          : "left";
        return pushToList(nextState, `content.${position}`, nextItem);
      }
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
      backgroundColor: "greenyellow"
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
    position: "left",
    color: "lightgreen",
    style: {
      backgroundColor: "lightgreen"
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
      backgroundColor: "lightyellow"
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
      backgroundColor: "greenyellow"
    },
    items: [
      {
        item: "ImageComponent",
        url:
          "http://images5.fanpop.com/image/photos/31000000/haters-gonna-hate-random-31076705-550-413.jpg"
      },
      { item: "TextComponent", text: "qwerty" },
      { item: "ButtonComponent", text: "button" },
      { item: "LinkComponent", text: "qwertylink" }
    ]
  }
};
