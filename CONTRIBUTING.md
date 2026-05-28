This is where to find information on contributing to pk-gov. For information about the pk-gov codebase itself, refer to [CODEBASE.md](CODEBASE.md).

## npm scripts

(NOTE: there are some other npm scripts in this project not listed here, those are leftover from the template repo this repo was created from!)

- `npm run start` starts the dev server (opens on port 3000 by default)
- `npm run cleanup` runs ESLint and Prettier
- `npm run test` runs jest tests (currently there are no tests)
- `npm run build` builds the website to dist/ (this is the script used for deploying to Render)

## General workflow for contributing

This is the workflow for contributing to this repo:

1. Clone/fork the repo to your local machine
2. `git pull origin main` to ensure your code is up to date
3. `git checkout -b your-branch-name` to make a branch for the feature/fix you want to contribute (please give it a clear name to avoid confusion, we suggest naming it directly after your intended feature/fix)
4. Work on your code! Remember to commit often and write clear commit messages! Feel free to push your code up to GitHub with `git push origin your-branch-name` whenever you want
5. Once you're done, push your code up to GitHub with `git push origin your-branch-name`
6. On GitHub, you may see a banner asking you to 'Compare and pull request' (PR). If not, go to the 'Pull requests' tab and select 'New pull request'
7. At the top of the PR screen, make sure 'base' is set to 'main' and 'compare' is set to your branch name
8. Write about what you're contributing, mark any relevant issues as fixed etc
9. Once you're ready, click 'Create pull request'
10. We will review your PR. If it's all good, your PR will be approved and merged! If not, we'll suggest any changes needed.
11. Once your PR is merged, delete the branch you made on your local machine with `git branch -d your-branch-name` (or `git branch -D your-branch-name` if it throws an error) to ensure your local repo is clean and ready the next time you want to contribute! (We'll handle deleting the branch on GitHub for you)

## General workflow for maintainers

1. When receiving a PR, you can check the code in GitHub directly in the 'Files changed' tab
2. Add comments on specific lines by clicking the + button
3. If a deeper look is needed (such as testing the webiste or running tests), pull down the PR code from GitHub on your local machine with `git fetch origin` and `git checkout pr-branch-name`
4. Once reviewing is done, click 'Submit review'
5. Write any final comments, you can approve or suggest changes directly from here
6. Once the PR is ready, click 'Merge pull request' or use the dropdown to 'squash and merge'
7. If the PR is approved, delete the local PR branch from your local machine (if any)
8. `git pull origin main` to ensure local main branch is up to date