import "fast-text-encoding";
import "react-native-url-polyfill/auto";

function defineMockGlobal(name) {
  if (typeof global[name] === "undefined") {
    global[name] = class {
      constructor(type, eventInitDict) {
        this.type = type;
        Object.assign(this, eventInitDict);
      }
    };
  }
}

["MessageEvent", "Event", "EventTarget", "BroadcastChannel"].forEach(
  defineMockGlobal,
);

/* import { EventTarget, Event } from "event-target-shim";
import { TransformStream } from "web-streams-polyfill/dist/ponyfill";

global.EventTarget = EventTarget;
global.Event = Event;
global.TransformStream = TransformStream;

if (typeof MessageEvent === "undefined") {
  global.MessageEvent = class MessageEvent extends global.Event {
    constructor(type, options = {}) {
      super(type, options);
      this.data = options.data || null;
      this.origin = options.origin || "";
      this.lastEventId = options.lastEventId || "";
      this.source = options.source || null;
      this.ports = options.ports || [];
    }
  };
}

if (typeof BroadcastChannel === "undefined") {
  global.BroadcastChannel = class BroadcastChannel extends global.EventTarget {
    constructor(channelName) {
      super();
      this.channelName = channelName;
      this._subscribers = [];
    }

    postMessage(message) {
      const event = new global.MessageEvent("message", {
        data: message,
      });

      // eslint-disable-next-line no-undef
      setTimeout(() => {
        this.dispatchEvent(event);
      }, 0);
    }

    close() {
      this._subscribers = [];
    }
  };
}
 */
