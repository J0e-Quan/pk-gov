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
6. On GitHub, you may see a banner asking you to open a new Pull Request (PR). If not, go to the 'Pull requests' tab and select 'New pull request'
7. Write about what you're contributing and send it up for review.
8. We will review your PR. If it's all good, your PR will be approved and merged! If not, we'll suggest any changes needed.
9. Once your PR is merged, delete the branch you made on your local machine with `git branch -d your-branch-name` and delete the branch from GitHub with `git push origin --delete your-branch-name` (we'll handle deleting it on GitHub if you forget!), to ensure your local repo is clean and ready the next time you want to contribute!

## General workflow for maintainers

1. When receiving a PR, you can check the code in GitHub directly
2. If a deeper look is needed (such as testing the webiste or running tests), pull down the PR code from GitHub on your local machine with `git fetch origin` and `git checkout pr-branch-name`
3. Once reviewing is done, suggest changes or approve the PR
4. If the PR is approved, delete the local PR branch from your local machine (if any)
5. `git pull origin main` to ensure local main branch is up to date