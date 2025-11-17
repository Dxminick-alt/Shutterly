# Page snapshot

```yaml
- generic [ref=e3]:
  - button [ref=e4]:
    - img
  - generic [ref=e5]:
    - generic [ref=e6]:
      - img "Shutterly" [ref=e8]
      - paragraph [ref=e9]: Welcome back! Sign in to continue
    - generic [ref=e11]:
      - generic [ref=e12]:
        - generic [ref=e13]: Email
        - textbox "Email" [active] [ref=e14]:
          - /placeholder: your.email@example.com
          - text: nonexistent@example.com
      - generic [ref=e15]:
        - generic [ref=e16]: Password
        - textbox "Password" [ref=e17]:
          - /placeholder: ••••••••
      - button "Sign In" [ref=e18]
      - button "Don't have an account? Sign up" [ref=e20]
```