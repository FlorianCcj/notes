# git hook

## Make post-commit hook thanks to template

Not succeed to work :'()

```bash
# configure git to follow template
git config --global init.templatedir '~/.git-templates'

# make needed files
mkdir -p ~/.git-templates/hooks
vi ~/.git-templates/hooks/post-commit

# --> add content of post-commit <--

# be sure it have good rights
chmod a+x ~/.git-templates/hooks/post-commit

# re init your repo
git init
```

## Make post-commit hook thanks to global directory

```bash
# configure git to follow core hookpath
git config --global core.hooksPath '~/.gitconfig/hooks'

# make needed files
mkdir ~/.gitconfig/hooks
vi ~/.gitconfig/hooks/pre-commit

# --> add content of pre-commit <--

# be sure it have good rights
chmod +x ~/.gitconfig/hooks/pre-commit
```

## Make local project hook

If project core.hooksPath is configure, global core.hooksPath will be ignore

```bash
# configure git to follow core hookpath
# during init project you need to tell everyone to make this command
git config core.hooksPath './hooks'

# make needed files
mkdir ./hooks
vi ./hooks/pre-commit

# --> add content of pre-commit <--

# be sure it have good rights
chmod +x ./hooks/pre-commit
```

## sources

* https://coderwall.com/p/jp7d5q/create-a-global-git-commit-hook
* https://delicious-insights.com/fr/articles/git-hooks/
