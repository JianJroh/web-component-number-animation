export class NumberAnimation extends HTMLElement {
  #animating = false;
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["to"];
  }
  attributeChangedCallback(attr: string) {
    switch (attr) {
      case "to":
        this.#play();
        return;
    }
  }
  #updateViewValue(animatingNumber: number) {
    this.innerHTML = this.#formatNumber(animatingNumber);
  }
  #formatNumber(animatingNumber: number) {
    const currentValue =
      !this.#disabled && this.#animating ? animatingNumber : this.#to;
    const formatted = round(currentValue, this.#precision).toFixed(
      this.#precision
    );
    const [integer, decimal] = formatted.split(".");
    const decimalSeparator = decimal
      ? getNumberDecimalSeparator(this.#locale)
      : "";
    const formattedInteger = this.#hideSeparator
      ? integer
      : new Intl.NumberFormat(this.#locale).format(Number(integer));
    return `${formattedInteger ?? ""}${decimalSeparator ?? ""}${decimal ?? ""}`;
  }
  #onUpdate(currentValue: number) {
    this.#updateViewValue(currentValue);
  }
  #onFinish() {
    this.#animating = false;
    this.#updateViewValue(this.#to);
  }
  #animate(from: number, to: number) {
    this.#animating = true;
    this.#updateViewValue(from);
    if (from !== to) {
      tween({
        from,
        to,
        duration: this.#duration,
        onUpdate: this.#onUpdate.bind(this),
        onFinish: this.#onFinish.bind(this),
      });
    }
  }
  #play() {
    if (this.#animating) {
      return;
    }
    this.#animate(this.#from, this.#to);
  }

  get #to() {
    return any2number(this.getAttribute("to"));
  }
  get #from() {
    return any2number(this.getAttribute("from"));
  }
  get #disabled() {
    return this.hasAttribute("disabled");
  }
  get #hideSeparator() {
    return this.hasAttribute("hide-separator");
  }
  get #precision() {
    return any2number(this.getAttribute("precision"));
  }
  get #duration() {
    return any2number(this.getAttribute("duration"), 1800);
  }
  get #locale() {
    return this.getAttribute("locale") ?? "en";
  }
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

function tween(props: {
  from: number;
  to: number;
  duration: number;
  onUpdate: (currentValue: number) => void;
  onFinish: () => void;
}): void {
  const { from, to, duration, onUpdate, onFinish } = props;
  const tick = (): void => {
    const current = performance.now();
    const elapsedTime = Math.min(current - startTime, duration);
    const currentValue = from + (to - from) * easeOut(elapsedTime / duration);
    if (elapsedTime === duration) {
      onFinish();
      return;
    }
    onUpdate(currentValue);
    requestAnimationFrame(tick);
  };
  const startTime = performance.now();
  tick();
}

function getNumberDecimalSeparator(locale = "en") {
  const numberFormatter = new Intl.NumberFormat(locale);
  const decimalSeparator = numberFormatter
    .formatToParts(0.5)
    .find((part) => part.type === "decimal")?.value;
  return decimalSeparator;
}

function any2number(value: number | string | null, defaultValue = 0): number {
  if (value == null || value == "") {
    return defaultValue;
  }
  return Number(value);
}

function round(number: number, precision = 0) {
  const powerNum = Math.pow(10, precision);
  return Math.round(number * powerNum) / powerNum;
}
