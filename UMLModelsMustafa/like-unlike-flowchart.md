# Like/Unlike Flowchart

```mermaid
flowchart TD
  A[Start] --> B{Already Liked?}
  B -- No --> C[Send Like]
  C --> D[Update Count + UI]
  D --> E[End]
  B -- Yes --> F[Send Unlike]
  F --> D
```