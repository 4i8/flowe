/**
 * The Flowe class provides a simple and efficient way to manage flow sequences.
 */
declare module "flowe" {
  export default class {
    /**
     * Creates a new instance of the Flowe class with the provided namespace and callback function.
     * @param {string} namespace - The namespace for the flow sequence.
     * @param {Function} callback - The callback function that takes a value, a next function, and an index as parameters.
     */
    constructor(
      namespace: string,
      callback: (value: any, next: () => void, index: number) => void
    );

    /**
     * Adds a new task to the end of the flow sequence.
     * @param {any} task - The task to add to the flow sequence.
     * @returns {void}
     */
    public push(task: any): void;
    /**
     * Adds an array of tasks to the end of the flow sequence.
     * @param {any[]} tasks - The array of tasks to add to the flow sequence.
     * @returns {void}
     */
    public concat(tasks: any[]): void;
    /**
     * Stops the current flow sequence and prevents any remaining tasks from running.
     * @returns {void}
     */
    public kill(): void;
  }
}
