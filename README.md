# Coniferous Next App

## Installation

1. `git clone https://github.com/brekk/coniferous.git`
2. `cd coniferous`
3. `npm i`

## Running locally

1. `npm run dev`
2. Open http://localhost:3000

## Deviations from the design:

1. Added a focus color when the user is on a specific input
2. Added a disabled style to the "Continue" button when any fields are invalid
3. Set the height of the payment form fields to be consistent regardless of whether there is an error visible
   <details>
     <summary>In order to avoid this outcome</summary>
   <img width="497" alt="Screenshot 2024-07-23 at 4 41 05 PM" src="https://github.com/user-attachments/assets/8bdfd137-f26e-4f4d-af73-b3e237fc5a75">
   </details>


## Run tests

1. `npm run test` / `vitest`

## With more time

* Write integration tests
