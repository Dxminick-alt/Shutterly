# Task #10: GitHub Workflow - Issues, Branches, Pull Requests

## Overview

This task demonstrates professional Git workflow using:
- Issues for feature tracking
- Branches for isolated development
- Pull Requests for code review
- Collaboration and revisions

---

## Step-by-Step Guide

### Step 1: Create Issues

Each team member should create an issue for a feature they'll develop.

#### Example Issue #1: "Add Photo Upload Validation"

**Title:** Add Photo Upload Validation

**Description:**
```markdown
## Description
Implement client-side and server-side validation for photo uploads.

## Requirements
- Validate file type (JPG, PNG, GIF only)
- Check file size (max 10MB)
- Validate required fields (title, category)
- Display user-friendly error messages

## Acceptance Criteria
- [ ] File type validation works
- [ ] File size validation works
- [ ] Error messages are clear
- [ ] Unit tests pass

## Labels
- `feature`
- `enhancement`
- `priority: medium`

## Assignee
@teammate-username
```

**Labels to use:**
- `feature` - New functionality
- `bug` - Something isn't working
- `enhancement` - Improvement to existing feature
- `documentation` - Documentation updates
- `ui` - User interface changes
- `backend` - Server-side code
- `priority: high/medium/low`

---

#### Example Issue #2: "Implement Like Button Functionality"

**Title:** Implement Like Button Functionality

**Description:**
```markdown
## Description
Add ability for users to like photos with visual feedback.

## Tasks
- [ ] Create Like component with heart icon
- [ ] Implement like/unlike toggle
- [ ] Update like counter in real-time
- [ ] Save likes to database
- [ ] Prevent non-logged-in users from liking

## Technical Details
- API Endpoint: POST /api/photos/:id/like
- Database: Update likes table
- Frontend: React component with state management

## Assignee
@teammate-username

## Labels
- `feature`
- `ui`
- `backend`
```

---

#### Example Issue #3: "Add Search Autocomplete"

**Title:** Add Search Autocomplete Suggestions

**Labels:** `enhancement`, `ui`, `priority: low`

---

#### Example Issue #4: "Fix Photo Grid Responsive Layout"

**Title:** Fix Photo Grid Layout on Mobile

**Labels:** `bug`, `ui`, `priority: high`

---

#### Example Issue #5: "Create User Profile Page"

**Title:** Create User Profile Page with Photo Gallery

**Labels:** `feature`, `ui`, `priority: medium`

---

### Step 2: Add Issues to Project Board

1. Go to your repository
2. Click "Projects" tab
3. Create new project (Board view)
4. Name it "Shutterly Development"
5. Add columns:
   - **Backlog** - New issues
   - **To Do** - Planned work
   - **In Progress** - Currently working
   - **In Review** - Pull request submitted
   - **Done** - Completed and merged

6. Drag issues to **Backlog** column

---

### Step 3: Move Issue to "In Progress"

The assignee moves their issue:
1. Go to Project board
2. Drag issue from "Backlog" to "In Progress"
3. This indicates you're starting work

---

### Step 4: Create a Branch

**Branch Naming Convention:**
- `feature/issue-number-short-description`
- `bugfix/issue-number-short-description`
- `enhancement/issue-number-short-description`

**Example:**
```bash
# Create and switch to new branch
git checkout -b feature/1-photo-upload-validation

# Verify you're on the new branch
git branch

# Output should show:
# * feature/1-photo-upload-validation
#   main
```

**Alternative method:**
```bash
# Create branch
git branch feature/1-photo-upload-validation

# Switch to branch
git checkout feature/1-photo-upload-validation
```

**Using GitHub CLI:**
```bash
gh issue develop 1 --checkout
```

---

### Step 5: Develop the Feature

Make changes to implement the feature.

**Example: Photo Upload Validation**

Edit `src/utils/validation.js`:
```javascript
/**
 * Validate photo upload file
 * @param {File} file - File to validate
 * @returns {Object} Validation result
 */
export function validatePhotoFile(file) {
    const errors = [];
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
        errors.push('File must be JPG, PNG, or GIF');
    }

    if (file.size > maxSize) {
        errors.push('File size must not exceed 10MB');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}
```

Edit `src/app.js` to use validation:
```javascript
import { validatePhotoFile } from './utils/validation.js';

function handleFileUpload(file) {
    const validation = validatePhotoFile(file);
    
    if (!validation.isValid) {
        alert(validation.errors.join('\n'));
        return;
    }
    
    // Proceed with upload
    uploadPhoto(file);
}
```

---

### Step 6: Make Multiple Commits

**Commit frequently with descriptive messages:**

```bash
# Stage changes
git add src/utils/validation.js

# Commit
git commit -m "Add file type and size validation utility"

# Make more changes...
git add src/app.js

git commit -m "Integrate validation into upload handler"

# Add tests
git add src/tests/validation.test.js

git commit -m "Add unit tests for file validation"
```

**Good Commit Message Format:**
```
<type>: <subject>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat: add photo upload validation"
git commit -m "fix: correct file size calculation"
git commit -m "test: add validation unit tests"
git commit -m "docs: update API documentation for upload endpoint"
```

---

### Step 7: Push Branch to GitHub

```bash
# Push branch to remote repository
git push origin feature/1-photo-upload-validation

# Or use -u to set upstream tracking
git push -u origin feature/1-photo-upload-validation
```

---

### Step 8: Create Pull Request

1. Go to GitHub repository
2. You'll see "Compare & pull request" button - click it
3. Fill in Pull Request template:

**Pull Request Template:**
```markdown
## Description
Brief description of changes made.

## Related Issue
Closes #1

## Changes Made
- Added file type validation (JPG, PNG, GIF)
- Added file size validation (max 10MB)
- Created validation utility function
- Integrated validation into upload flow
- Added error messages for users

## Testing
- [ ] Manual testing completed
- [ ] Unit tests pass
- [ ] Integration tests pass

## Screenshots (if UI changes)
[Add screenshots here]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console.log statements left
- [ ] Tests added/updated

## Reviewers
@teammate1 @teammate2
```

4. Assign reviewers (teammates)
5. Add labels (same as issue)
6. Link to issue (use "Closes #1" in description)
7. Click "Create Pull Request"

---

### Step 9: Code Review - Request Changes

**Reviewer should NOT approve immediately.** Instead, request changes:

#### Example Review Comments:

**Comment 1:**
```markdown
**File:** src/utils/validation.js
**Line:** 15

The error message could be more specific. Instead of "File too large",
suggest using:
`File size (${fileSize}MB) exceeds maximum allowed size (10MB)`

This helps users understand exactly how large their file is.
```

**Comment 2:**
```markdown
**File:** src/app.js
**Line:** 42

Consider extracting the alert logic into a separate function for better testability:

\`\`\`javascript
function showValidationErrors(errors) {
    alert(errors.join('\n'));
}
\`\`\`

This makes it easier to mock in tests.
```

**Comment 3:**
```markdown
**General:** Missing unit tests for edge cases:
- What happens with 0-byte files?
- What about files exactly at 10MB limit?
- Should test with invalid file types
```

**Submit Review:**
- Select "Request changes"
- Write summary: "Good start! A few improvements needed before merging."

**Move on Project Board:**
- Issue stays in "In Review"

---

### Step 10: Apply Requested Changes

**Assignee responds to feedback:**

1. Read all comments
2. Reply to comments (acknowledge or discuss)
3. Make requested changes

**Example responses:**
```markdown
Good catch! I'll update the error message to be more specific.
```

**Make changes:**

Edit `src/utils/validation.js`:
```javascript
export function validatePhotoFile(file) {
    const errors = [];
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
        errors.push('File must be JPG, PNG, or GIF');
    }

    if (file.size > maxSize) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        errors.push(`File size (${fileSizeMB}MB) exceeds maximum allowed size (10MB)`);
    }

    if (file.size === 0) {
        errors.push('File is empty');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}
```

**Commit and push:**
```bash
git add src/utils/validation.js
git commit -m "refactor: improve validation error messages"

git add src/tests/validation.test.js
git commit -m "test: add edge case tests for validation"

git push origin feature/1-photo-upload-validation
```

**Leave comment on PR:**
```markdown
@reviewer Thanks for the feedback! I've addressed all your comments:
- ✅ Updated error messages to be more specific
- ✅ Extracted alert logic into separate function
- ✅ Added unit tests for edge cases (0-byte, exact limit, invalid types)

Ready for another review!
```

---

### Step 11: Approve and Merge

**Reviewer checks new commits:**
1. Review new changes
2. Verify all comments addressed
3. Check tests pass
4. Approve the pull request

**Select:** "Approve"
**Comment:** "LGTM! (Looks Good To Me) Great improvements. Merging now."

**Merge Pull Request:**

**Three merge options:**

#### 1. **Merge Commit** (Recommended for features)
- Creates a merge commit
- Preserves full history
- Command: `git merge --no-ff feature/branch`

```
* Merge pull request #1 from feature/1-photo-upload-validation
|\
| * Add edge case tests
| * Improve error messages
| * Add validation utility
|/
* Previous commit
```

#### 2. **Squash and Merge** (Clean history)
- Combines all commits into one
- Cleaner history
- Loses individual commit messages

```
* Add photo upload validation (#1)
* Previous commit
```

#### 3. **Rebase and Merge** (Linear history)
- Replays commits on top of base branch
- Linear history, no merge commit
- Preserves individual commits

```
* Add edge case tests
* Improve error messages
* Add validation utility
* Previous commit
```

**For this task, use:** **Merge Commit** (to preserve history)

Click "Merge pull request" → "Confirm merge"

---

### Step 12: Delete Branch

After merging:
1. Click "Delete branch" button on GitHub
2. Or locally:
```bash
# Switch back to main
git checkout main

# Pull latest changes
git pull origin main

# Delete local branch
git branch -d feature/1-photo-upload-validation

# Delete remote branch (if not already deleted)
git push origin --delete feature/1-photo-upload-validation
```

---

### Step 13: Verify Issue Status

1. Go to Project board
2. Issue should automatically move to "Done" (if configured)
3. If not, manually drag to "Done"
4. Verify issue is closed on Issues tab

---

## Complete Workflow Summary

```
1. Create Issue (#1) → Add to Backlog
2. Assign to teammate → Move to In Progress
3. Create branch: feature/1-description
4. Make changes (multiple commits)
5. Push branch to GitHub
6. Create Pull Request (link issue)
7. Request changes (reviewer)
8. Apply changes (assignee)
9. Push new commits
10. Approve PR (reviewer)
11. Merge PR (use Merge Commit)
12. Delete branch
13. Verify issue closed → Move to Done
```

---

## Role Swapping

Each team member must act as **both**:

### **Role 1: Assignee (Developer)**
- Create issue
- Create branch
- Develop feature
- Submit pull request
- Address review feedback
- Push revised commits

### **Role 2: Reviewer**
- Review teammate's pull request
- Request changes (do NOT approve immediately)
- Check revised commits
- Approve and merge

**Example:**
- **Person A** creates Issue #1, Person B reviews
- **Person B** creates Issue #2, Person A reviews

---

## Best Practices

### Issue Writing
✅ Clear, descriptive titles
✅ Detailed requirements
✅ Acceptance criteria
✅ Appropriate labels
❌ Vague descriptions
❌ Missing context

### Branch Naming
✅ `feature/1-upload-validation`
✅ `bugfix/23-login-error`
✅ `enhancement/45-search-ui`
❌ `my-branch`
❌ `test`
❌ `fix`

### Commit Messages
✅ `feat: add file upload validation`
✅ `fix: correct size calculation bug`
✅ `test: add validation unit tests`
❌ `update`
❌ `changes`
❌ `asdf`

### Pull Requests
✅ Link to issue (`Closes #1`)
✅ Describe changes clearly
✅ Add screenshots for UI changes
✅ Check "Allow edits from maintainers"
❌ No description
❌ Unrelated changes
❌ Broken tests

### Code Review
✅ Be specific and constructive
✅ Suggest improvements
✅ Ask questions
✅ Praise good code
❌ Generic comments ("bad code")
❌ Approve without reviewing
❌ Ignore code style

---

## GitHub Commands Reference

```bash
# Clone repository
git clone https://github.com/username/shutterly.git

# Create and switch to branch
git checkout -b feature/issue-1

# Check status
git status

# Stage changes
git add .
git add file.js

# Commit
git commit -m "feat: add feature"

# Push branch
git push origin feature/issue-1

# Pull latest changes
git pull origin main

# Switch branches
git checkout main
git checkout feature/issue-1

# Delete branch
git branch -d feature/issue-1

# View branches
git branch
git branch -a  # including remote

# View commit history
git log
git log --oneline --graph
```

---

## Checklist for Task #10

- [ ] Each team member creates at least 1 issue
- [ ] Issues have appropriate labels
- [ ] Issues assigned to teammates
- [ ] Project board created with columns
- [ ] Issues added to Backlog
- [ ] Branch created for each issue
- [ ] Multiple commits made (3+ per feature)
- [ ] Pull request created and linked to issue
- [ ] Reviewer requests changes (not immediate approval)
- [ ] Changes applied and new commits pushed
- [ ] Reviewer approves after changes
- [ ] Pull request merged
- [ ] Branch deleted after merge
- [ ] Issue moved to Done
- [ ] Each member acts as both assignee and reviewer

---

## References

1. GitHub Docs: https://docs.github.com/
2. Git Branching Best Practices: https://git-scm.com/book/en/v2/Git-Branching
3. Conventional Commits: https://www.conventionalcommits.org/
4. Merge Types Article: https://lukemerrett.com/different-merge-types-in-git/
5. Code Review Best Practices: https://google.github.io/eng-practices/review/
