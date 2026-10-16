# TypeTasks — Model & Types (Part 1)

A type-safe task tracker built with TypeScript.

## Overview

TypeTasks follows a **data model first** architecture. Before building any UI elements or components, the core data contracts and operations are strictly modeled in TypeScript. This ensures invalid task states are caught at compile time.

## Data Model

- **`TaskStatus`**: A literal union type restricting task status to `"todo" | "in-progress" | "done"`.
- **`Task`**: An interface guaranteeing every task has an `id: number`, `title: string`, and `status: TaskStatus`.

## Typed Operations

1. **`addTask(tasks: Task[], title: string): Task[]`**  
   Creates and appends a new task with a unique ID and initial status of `"todo"`.

2. **`completeTask(tasks: Task[], id: number): Task[]`**  
   Immutably updates the task with the given ID to `"done"`.

3. **`filterByStatus(tasks: Task[], status: TaskStatus): Task[]`**  
   Filters tasks by a valid `TaskStatus`.

### Additional Custom Operations

- **`advanceTask(tasks: Task[], id: number): Task[]`**  
  Transitions a task progressively through its lifecycle: `todo` &rarr; `in-progress` &rarr; `done`.

- **`deleteTask(tasks: Task[], id: number): Task[]`**  
  Immutably removes a task by its ID.

- **`countByStatus(tasks: Task[], status: TaskStatus): number`**  
  Returns the count of tasks matching a given status.

- **`updateTaskTitle(tasks: Task[], id: number, newTitle: string): Task[]`**  
  Updates the title for a task.

- **`clearCompleted(tasks: Task[]): Task[]`**  
  Clears all tasks that have reached `"done"`.

## Verification & Compilation

To compile and verify zero type errors:

```bash
npx tsc
```
