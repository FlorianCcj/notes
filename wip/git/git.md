# git hot tips
 * `git remote update --prune`: remove local branch that have been deleted in remote
 * `git remote prune origin --dry-run`: to see what `git remote update --prune` will delete before to do it

 * `git add -p`: commit part by part, your choice

 * `git commit --amend`: Great for squashing staged files into your last commit

 * `git checkout -`: jump back to your last branch
 * `git stash`, then `git stash pop`: save changes the reapply it

 * `git diff --shortstat "@{0 day ago}"`: how many line have you wrote today

 * `git log -5 --pretty --oneline`: 5 last commit in one line
 * `git shortlog -sn`: each contributo with line number
 * `git log --all --graph --decorate --oneline --simplify-by-decoration`: cool graph to see branch and co
 * `git log -S puppy`: look for puppy in commit

 * `git config --global help.autocorrect -1`: Mistype or misspell a git command? Immediately re-run the correct command. You can use -1 to 1000 to wait a full second before the command is re-run.

 * `git cherry-pick [hash]`: As long as the commit has been fetched somewhere, you can cherry pick that code in your own branch without having to merge the entire thing.
 * `git rebase -i HEAD~4`: Interactive rebase allows you to pick and choose which commits you can pick, squash, reword, edit, or fixup

## permission

* `git config --get --local core.filemode`: to know the option
* `git config --local core.filemode false`: to set option


## resources
 * http://wesbos.com/git-hot-tips/

## a TODO
 * https://help.github.com/articles/changing-a-remote-s-url/
