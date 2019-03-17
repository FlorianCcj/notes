# git hook

## Make post-commit hook thanks to template

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

## sources

* https://coderwall.com/p/jp7d5q/create-a-global-git-commit-hook