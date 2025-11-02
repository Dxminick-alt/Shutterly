# Save and Comment Flowchart

```mermaid
flowchart TD
  A[Start] --> B[Tap Save]
  B --> C{Saved?}
  C -- No --> D[Create Save]
  C -- Yes --> E[Remove Save]
  D --> F[Show Saved Badge] --> G[End]
  E --> H[Update UI] --> G

  subgraph Comment_Flow["Comment Flow (parallel)"]
    I[Type Comment] --> J{Valid?}
    J -- No --> K[Show Validation Error] --> I
    J -- Yes --> L[Store Comment] --> M[Append to Thread]
  end
```