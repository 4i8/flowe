/**
 * The Flowe class provides a simple and efficient way to manage flow sequences.
 */
export default class {
  #$: any;
  #namespace: string;
  #callback: any;
  /**
   * Creates a new instance of the Flowe class with the provided namespace and callback function.
   * @param {string} namespace - The namespace for the flow sequence.
   * @param {Function} callback - The callback function that takes a value, a next function, and an index as parameters.
   */
  constructor(namespace: string, callback: any) {
    global.flowe_map = global.flowe_map || {};
    type status = "sleep" | "running";
    if (!global.flowe_map[namespace]) {
      global.flowe_map[namespace] = {
        pusher: [],
        index: -1,
        callback,
        status: "sleep" as status,
      };
    } else if (callback) {
      throw new Error(
        `Namespace -{#${namespace}}- already exists. Use a unique namespace`
      );
    }
    this.#namespace = namespace;
    this.#callback = global.flowe_map[namespace].callback;
    this.#$ = global.flowe_map[namespace];
  }
  /**
   * Moves the flow sequence to the next task and runs it.
   * @returns {void}
   */
  #next(): void {
    if (!this.#$) return;
    if (!this.#$.pusher.length) {
      this.#$.status = "sleep";
      return;
    }
    this.#$.status = "running";
    const value = this.#$.pusher[0];
    this.#$.pusher = this.#$.pusher.slice(1);
    this.#$.index++;
    this.#callback(value, this.#next.bind(this), this.#$.index);
    return;
  }
  /**
   * Adds a new task to the end of the flow sequence.
   * @param {any} task - The task to add to the flow sequence.
   * @returns {void}
   */
  public push(task: any): void {
    if (!this.#$) return;
    if (!this.#$.pusher.length && this.#$.status === "sleep") {
      this.#$.pusher.push(task);
      this.#$.status = "running";
      this.#next();
    } else {
      this.#$.pusher.push(task);
    }
  }
  /**
   * adds an array of items to the end of the flow sequence.
   * @param {any[]} tasks - The array of tasks to add to the flow sequence.
   * @returns {void}
   */
  public concat(tasks: any[]): void {
    if (!this.#$) return;
    if (!this.#$.pusher.length && this.#$.status === "sleep") {
      this.#$.pusher = this.#$.pusher.concat(tasks);
      this.#$.status = "running";
      this.#next();
    } else {
      this.#$.pusher = this.#$.pusher.concat(tasks);
    }
  }
  /**
   * Stops the current flow sequence and prevents any remaining tasks from running.
   * @returns {void}
   */
  public kill(): void {
    if (!this.#$) return;
    delete global.flowe_map[this.#namespace];
    this.#$ = null;
    this.#callback = null;
  }
}
