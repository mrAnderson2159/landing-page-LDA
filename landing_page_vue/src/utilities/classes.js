export class TheInstructionsMessage {
  constructor(title, message) {
    this.title = title;
    this.message = message;
  }
}

export class Car {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }

  setName(name) {
    this.name = name;
  }

  setUrl(url) {
    this.url = url;
  }

  addUrlBefore(url) {
    this.url = url + this.url;
  }

  addUrlAfter(url) {
    this.url += url;
  }
}
