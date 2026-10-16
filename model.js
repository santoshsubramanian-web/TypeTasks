/**
 * model.ts — Data Model & Typed Operations for TypeTasks
 *
 * Defines the core Task interface, TaskStatus literal union,
 * and pure operations for creating, updating, filtering, and organizing tasks.
 */
// Internal counter to ensure unique IDs across newly added tasks.
let taskCounter = 1;
/**
 * Computes a unique ID for a new task, ensuring no collision with existing tasks.
 */
export function getNextId(tasks) {
    const highestId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
    const next = Math.max(highestId + 1, taskCounter);
    taskCounter = next + 1;
    return next;
}
/**
 * Adds a new task with a status of "todo".
 * Returns a new array with the created task appended.
 */
export function addTask(tasks, title) {
    const newTask = {
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
export function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: "done" } : task);
}
/**
 * Filters tasks matching the given TaskStatus.
 * The compiler prevents passing any string outside of the TaskStatus union.
 */
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
/* ==========================================================================
   Additional Typed Operations (Make It Yours)
   ========================================================================== */
/**
 * Transitions a task's status sequentially:
 * "todo" -> "in-progress" -> "done".
 */
export function advanceTask(tasks, id) {
    const nextStatusMap = {
        todo: "in-progress",
        "in-progress": "done",
        done: "done",
    };
    return tasks.map((task) => task.id === id ? { ...task, status: nextStatusMap[task.status] } : task);
}
/**
 * Removes a task by its ID.
 */
export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}
/**
 * Returns the total count of tasks for a given status.
 */
export function countByStatus(tasks, status) {
    return filterByStatus(tasks, status).length;
}
/**
 * Updates the title of a specific task by its ID.
 */
export function updateTaskTitle(tasks, id, newTitle) {
    const trimmed = newTitle.trim();
    if (!trimmed)
        return tasks;
    return tasks.map((task) => task.id === id ? { ...task, title: trimmed } : task);
}
/**
 * Clears and removes all completed ("done") tasks.
 */
export function clearCompleted(tasks) {
    return tasks.filter((task) => task.status !== "done");
}
