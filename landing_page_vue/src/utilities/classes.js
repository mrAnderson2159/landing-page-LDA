export class TheInstructionsMessage {
  /**
   * Used to formalize the hint messages of the homepage body
   * @param {String} title To be rendered as heading
   * @param {String} message To be rendered as paragraph
   */
  constructor(title, message) {
    this.title = title;
    this.message = message;
  }
}

export class Car {
  constructor(name, url, engineCapacity, horsePower, supply, dailyKm, price) {
    this.name = name;
    this.url = url;
    this.engineCapacity = engineCapacity;
    this.horsePower = horsePower;
    this.supply = supply;
    this.dailyKm = dailyKm;
    this.price = price;
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

  includesAny(array, ...values) {
    for (const value of values) {
      if (array.includes(value)) return true;
    }
    return false;
  }

  getErrors() {
    const errors = [];
    const valids = [];
    if (!this.userName) errors.push("USERNAME_MISSING");
    else if (!/\s/.test(this.userName)) errors.push("SURNAME_MISSING");
    if (!this.includesAny(errors, "USERNAME_MISSING", "SURNAME_MISSING"))
      valids.push("userName");
    if (!this.email) errors.push("EMAIL_MISSING");
    if (!this.email) errors.push("CONFIRMEMAIL_MISSING");
    if (this.email && this.confirmEmail && this.email !== this.confirmEmail) {
      // console.table(this.email, this.confirmEmail);
      errors.push("EMAIL_VALIDATION");
    }

    if (
      !this.includesAny(
        errors,
        "EMAIL_MISSING",
        "CONFIRMEMAIL_MISSING",
        "EMAIL_VALIDATION"
      )
    ) {
      valids.push("email");
      valids.push("confirmEmail");
    }
    if (!this.from) errors.push("FROM_MISSING");
    else if (!this.to) errors.push("TO_MISSING");
    if (this.from && this.to && this.from >= this.to)
      errors.push("DATE_VALIDATION");
    if (
      !this.includesAny(errors, "FROM_MISSING", "TO_MISSING", "DATE_VALIDATION")
    )
      valids.push("dates");
    return { errors, valids };
  }

  isValid() {
    return !this.getErrors().errors.length;
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
