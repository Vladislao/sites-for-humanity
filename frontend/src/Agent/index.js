import clippy from "clippyjs";
import { getOffset, limit } from "@/utils";

const AGENT_WIDTH = 128;
const AGENT_HEIGHT = 128;

class Agent {
  constructor() {
    clippy.load("Genie", agent => {
      this.agent = agent;
      const app = document.getElementById("app");
      const { width: appWidth, height: appHeight } = app.getBoundingClientRect();
      agent.show();
      agent.moveTo(0, 0);
      agent.speak('Приветствую Вас! Чтобы начать работу, удерживайте пробел и говорите!')
    });
  }

  moveToNavbar() {
    this.moveTo("navbar");
  }

  moveToHeader() {
    this.moveTo("header");
  }

  moveToFooter() {
    this.moveTo("footer");
  }

  moveToContent() {
    this.moveTo("content");
  }

  moveToContent() {
    this.moveTo("content");
  }

  getCoordinates(element) {
    const { top, left, bottom, right, centerX, centerY } = getOffset(element);
    const app = document.getElementById("app");
    const { width: appWidth, height: appHeight } = app.getBoundingClientRect();
    const centerYCoordinates = centerY - AGENT_HEIGHT / 2;
    const centerXCoordinates = centerX - AGENT_WIDTH / 2;
    if (appWidth - right >= AGENT_WIDTH) {
      return { x: right, y: centerYCoordinates };
    }
    if (appHeight - bottom >= AGENT_WIDTH) {
      return { x: centerXCoordinates, y: bottom };
    }
    if (left >= AGENT_WIDTH) {
      return { x: left - AGENT_WIDTH, y: centerYCoordinates };
    }
    if (top >= AGENT_WIDTH) {
      return { x: centerXCoordinates, y: top - AGENT_HEIGHT };
    }
    return { x: centerXCoordinates, y: centerYCoordinates };
  }

  moveTo(id) {
    if (!this.agent) {
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const { x, y } = this.getCoordinates(element);
      this.agent.moveTo(x, y);
    } else {
      this.agent.play("Confused");
    }
  }

  speak(phrase) {
    if (!this.agent) {
      return;
    }
    this.agent.speak(phrase);
  }
}

export default new Agent();
