const data = {};

module.exports = {
  get: roomid => data[roomid] || {},
  set: (roomid, state) => {
    data[roomid] = state;
  }
};
