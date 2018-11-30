export default class Agent {
  constructor(agent) {
    this.agent = agent;
    console.log(this.agent)
    document.addEventListener('click', this.Move.bind(this), false);
  }
  
  Move() {
    this.agent.moveTo(0,0);
  }
}