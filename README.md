# Free Code Camp Project-based Curriculum Tools

This repo is for tools to help facilitate the creation and maintenance of the Free Code Camp project-based curriculum.

## [reorder-steps.js](reorder-steps.js)
A one-off script that automatically reorders the step files in a project's markdown files based on the filename.  It also updates the `challengeOrder` property array in the project's `meta.json` with the new order of the steps.

### Working Example
Let's say you start with the following project structure:

```bash
part-1.md
part-2.md
part-3.md
part-4.md
part-5.md
part-6.md
```
At some point you decide you need to delete `part-2.md`, because that step is no longer needed.  Also, you decide to break down `part-4.md` into three steps instead of just one. 

To accomplish the this restructure, you would need to delete `part-2.md` and then add a `part-4a.md` and a `part=5b.md`.  The new folder structure would look like the following:
```bash
part-1.md
part-3.md
part-4.md
part-4a.md
part-4b.md
part-5.md
part-6.md
```
You now need the file names to be `part-1.md` through `part-7.md`, because you removed one but gained two more for a net difference of one file. Also, the frontmatter of each file below a deleted step or added step will need to be modified by making the `title` key value match the new step number. For example, after renaming `part-3.md` to `part-2.md`, you would need to change `part-2.md`'s title from `Part 03` to `Part 02`.

See below for the actual project folder changes needed:
```bash
part-1.md
part-3.md renamed to part-2.md and title changes to "Part 2"
part-4.md renames to part-3.md and title changes to "Part 3"
part-4a.md renames to part-4.md and title changes to "Part 4"
part-4b.md renames to part-5.md and title changes to "Part 5"
part-5.md renames to part-6.md and title changes to "Part 6"
part-6.md renames to part-7.md and title changes to "Part 7"
```
Along with the above changes, the `challengeOrder` key in the project's `meta.json` file needs to reflect the new step order.  This is needed because each step below a step deletion and/or step addtion changes the `title` assoiciated with each of the affected step's challenge `id`.

### Solution Steps
1. Edit the `reoder-steps.js` file by changing the `projectPath` and `projectMetaPath` variables' values to reflect your local setup.
2. Open a second terminal session and use `git` to create a new branch of your locally "synced" freecodecamp `master` branch.
3. Run this script (reorder.js) in the first terminal session:
  ```bash
  node reorder-steps.js
  ```