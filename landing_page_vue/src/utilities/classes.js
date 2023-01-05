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

export class Form {
  constructor(
    car,
    userName = "",
    email = "",
    confirmEmail = "",
    from = "",
    to = "",
    notes = ""
  ) {
    this.car = car;
    this.userName = userName;
    this.email = email;
    this.confirmEmail = confirmEmail;
    this.from = from;
    this.to = to;
    this.notes = notes;
  }

  getErrors() {
    const errors = [];
    if (this.email !== this.confirmEmail) errors.push("EMAIL_VALIDATION");
    if (this.from >= this.to) errors.push("DATE_VALIDATION");
    return errors;
  }

  isValid() {
    return this.email === this.confirmEmail && this.from < this.to;
  }

  isInvalid() {
    return !this.isValid();
  }

  reverseDates() {
    return [this.from, this.to].map((x) => x.split("-").reverse().join("-"));
  }

  request(reverseDate = false) {
    const { car, userName, email, notes } = this;
    let from, to;
    if (reverseDate) [from, to] = this.reverseDates();
    else ({ from, to } = this);
    return { car, userName, email, from, to, notes };
  }

  JSONrequest() {
    return JSON.stringify(this.request());
  }
}

export class FormDateInput {
  constructor(name, text, buttonId, inputId) {
    this.name = name;
    this.text = text;
    this.buttonId = buttonId;
    this.inputId = inputId;
  }
}
