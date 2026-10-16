/**
 * model.ts — Data Model & Typed Operations for TypeTasks
 * 
 * Defines the core Task interface, TaskStatus literal union,
 * and pure operations for creating, updating, filtering, and organizing tasks.
 */

// A TaskStatus literal union restricting the status to three distinct states.
export type TaskStatus = "todo" | "in-progress" | "done";

// Strict Task interface representing the shape of every task entity.
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

// Internal counter to ensure unique IDs across newly added tasks.
let taskCounter = 1;

/**
 * Computes a unique ID for a new task, ensuring no collision with existing tasks.
 */
export function getNextId(tasks: Task[]): number {
  const highestId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
  const next = Math.max(highestId + 1, taskCounter);
  taskCounter = next + 1;
  return next;
}

/**
 * Adds a new task with a status of "todo".
 * Returns a new array with the created task appended.
 */
export function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = {
    id: getNextId(tasks),
    title: title.trim(),
    status: "todo",
  };
  return [...tasks, newTask];
}

/**
 * Marks a task with the specified ID as "done".
 * Returns a new array containing the updated task.
 */
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: "done" } : task
  );
}

/**
 * Filters tasks matching the given TaskStatus.
 * The compiler prevents passing any string outside of the TaskStatus union.
 */
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}

/* ==========================================================================
   Additional Typed Operations (Make It Yours)
   ========================================================================== */

/**
 * Transitions a task's status sequentially:
 * "todo" -> "in-progress" -> "done".
 */
export function advanceTask(tasks: Task[], id: number): Task[] {
  const nextStatusMap: Record<TaskStatus, TaskStatus> = {
    todo: "in-progress",
    "in-progress": "done",
    done: "done",
  };

  return tasks.map((task) =>
    task.id === id ? { ...task, status: nextStatusMap[task.status] } : task
  );
}

/**
 * Removes a task by its ID.
 */
export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((task) => task.id !== id);
}

/**
 * Returns the total count of tasks for a given status.
 */
export function countByStatus(tasks: Task[], status: TaskStatus): number {
  return filterByStatus(tasks, status).length;
}

/**
 * Updates the title of a specific task by its ID.
 */
export function updateTaskTitle(tasks: Task[], id: number, newTitle: string): Task[] {
  const trimmed = newTitle.trim();
  if (!trimmed) return tasks;
  return tasks.map((task) =>
    task.id === id ? { ...task, title: trimmed } : task
  );
}

/**
 * Clears and removes all completed ("done") tasks.
 */
export function clearCompleted(tasks: Task[]): Task[] {
  return tasks.filter((task) => task.status !== "done");
}
