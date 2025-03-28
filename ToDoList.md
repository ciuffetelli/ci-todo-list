# ToDo List Application

## What is ToDo List?

> It’s a list of tasks you need to complete or things that you want to do.
>
> Most typically, they’re organized ***in order of priority***. Traditionally, they’re written on a piece of paper or post it notes and act as a memory aid. As technology has evolved we have been able to create a todo lists with excel spreadsheets, word documents, email lists, todo list apps, Microsoft to do and Google to do list to name a few.
>
> Having a list of everything you need to do written down in one place means you shouldn’t forget anything important. By prioritizing the tasks in the list you plan the order in which you’re going to do them and can ***quickly see what needs your immediate attention*** and what tasks you can leave until a little later.

## What makes a ToDo List App?

> To do lists come in all shapes and sizes. It always used to be something that you would write using pen and paper, but thanks to technology there’s an app that can come to the rescue. What makes a good to do list app?
>
> 1. Tasks should be fast to add and organize.
> 2. Setting priorities.
> 3. Reminders for any self-imposed deadlines.

## What is your task?

Build a Single Page Application using the latest Angular framework, that allows users to manage a ToDo List.

API calls can be mocked, but the latency of each call must be 2 seconds at least.

Provide README instructions to build and run the project

## The core functionalities

### 1. Dashboard

- [ ] Display all ***unfinished items*** with a ***descending*** priority order. Each item has the below properties:
  - Summary (30 characters limitation)
  - Description - Optional (Shown in the tooltip if any once users hove on the items)
  - Complete By Date - Optional
  - Is Completed
- [ ] Unfinished items with the ***highest priority*** and the soonest deadline (***1 day***) will be highlighted.
- [ ] Allow users to mark a particular item as finished. That item is blurred, strikethrough, and moved to the bottom of the list immediately.
- [ ] In the ***current session***, users can unmark a particular finished item that they've marked as finished by mistake. Once they make this action, ***a prompt*** should be shown to confirm. After their confirmation, that item is treated as an unfinished item in the list.

### 2. Create a new item

- [ ] A new item is created with following properties:
  - Summary (30 characters limitation)
  - Description - Optional
  - Complete By Date - Optional (3 days after today if null value)
  - Priority (with marks from 1 to 3)
- [ ] The result (success or failure) must be informed to users.

### 3. Edit an item

- [ ] Allow editing the below properties:
  - Summary
  - Description
  - Complete By Date
  - Priority

### 4. Delete an item

- [ ] Prompt is required.
- [ ] Allow deleting unfinished items only.

## Notes

1. You're free to make any assumptions, but please state them in the README file.
2. Feel free to choose any design please.
3. Save it in a private Github repo and share the results.
