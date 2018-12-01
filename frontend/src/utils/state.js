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

// [[command, item, context], handler]
const HANDLERS = [
  [
    [/create/, /menuitem/, /.*/],
    (state, { props }) => {
      const nextState = { ...state, current: "navBar" };
      return pushToList(nextState, "navBar.nav.items", {
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
        "navBar.nav.items",
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
      item.test(action.item) &&
      context.test(currentContext)
    );
  });
};

export const dispatch = (state, actions) => {
  return actions.reduce((acc, action) => {
    const handler = getHandler(action, acc.current);
    return handler(acc, action);
  }, state);
};

export default {
  header: {
    display: true,
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
    position: null,
    style: {},
    nav: {
      style: {
        backgroundColor: null,
        variant: "info",
        type: "dark"
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
  },
  rightPanel: {
    display: true,
    nav: {
      display: true,
      items: [
        {
          text: "Item 1",
          url: ""
        },
        {
          text: "Item 2",
          url: ""
        }
      ]
    }
  },
  leftPanel: {
    display: true,
    nav: {
      display: true,
      items: [
        {
          text: "Мишки",
          url: ""
        },
        {
          text: "Шишки",
          url: ""
        }
      ]
    }
  },
  footer: false
};
