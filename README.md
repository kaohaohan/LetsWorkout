This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
flowchart TD
    %% Status Section
    subgraph STATUS["STATUS"]
        direction TB
        not_started["Not Started"] 
        in_progress["In Progress"]
        completed["Completed"]
        cancelled["Cancelled"]
    end

    %% Start Workout Flow
    subgraph START_FLOW["Start Workout Flow"]
        direction TB
        home["User opens app home page"] --> |"POST /api/workouts"| start_btn["User clicks 'Start Empty Workout' button"]
        start_btn --> workout_page["System displays workout page"]
    end

    %% Add Exercise Flow
    subgraph ADD_EXERCISE["Add Exercise Flow"]
        direction TB
        add_btn["User clicks 'Add Exercise' button"] --> select_page["System displays exercise selection page"]
        select_page --> select_exercise["User selects exercise"]
        select_exercise --> input_interface["System displays set input interface"]
        input_interface --> add_sets["User adds weight and repetitions"]
        add_sets --> |"Can add multiple"| add_sets
        add_sets --> save_btn["User clicks 'Save' button"]
        save_btn --> |"POST /api/workout-sets"| update_view["System updates workout view"]
    end

    %% Complete Workout Flow
    subgraph COMPLETE_FLOW["Complete Workout Flow"]
        direction TB
        complete_btn["User clicks 'Complete Workout' button"] --> confirm_complete{"If confirmed:"}
        confirm_complete --> |"PUT /api/workouts/{id}/finish"| finish["System calculates duration and marks as completed"]
        finish --> return_home1["User returns to home page"]
    end

    %% Cancel Workout Flow
    subgraph CANCEL_FLOW["Cancel Workout Flow"]
        direction TB
        close_btn["User clicks 'Close' button"] --> confirm_cancel{"If confirmed:"}
        confirm_cancel --> |"DELETE /api/workouts/{id}/cancel"| delete["System deletes workout and related sets"]
        delete --> return_home2["User returns to home page"]
    end

    %% API Status Transitions
    subgraph TRANSITIONS["Status Transitions with API Triggers"]
        direction TB
        api_not_started["Not Started"] --> |"POST /api/workouts"| api_in_progress["In Progress"]
        api_in_progress --> |"PUT /api/workouts/{id}/finish"| api_completed["Completed"]
        api_in_progress --> |"DELETE /api/workouts/{id}/cancel"| api_cancelled["Cancelled"]
    end

    %% Styling
    classDef status fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef api_call color:#d63031,font-style:italic;
    classDef action fill:#74b9ff,color:black;
    classDef decision fill:#fdcb6e,color:black,shape:diamond;
    
    class STATUS,not_started,in_progress,completed,cancelled,TRANSITIONS status;
    class confirm_complete,confirm_cancel decision;
    class start_btn,add_btn,save_btn,complete_btn,close_btn action;
