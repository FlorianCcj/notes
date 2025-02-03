# Git - plumbing

https://github.com/pluralsight/git-internals-pdf
git-internals rendered: https://github.com/pluralsight/git-internals-pdf/raw/master/drafts/peepcode-git.pdf

## Savez-vous vraiment comment fonctionne git ? (Sébastien LECACHEUR)

https://www.youtube.com/watch?v=uA2WZCQP4EI

### Intro

porcelain command: command that you use everyday (add, commit, push, pull, branch, switch, merge, rebase, ...)
plumbing command: low level command (hash-object, cat-file, count-object, show-refs, ...)

Git onion:

- Distributed Revision Control System
- Revision Control System
- Simple Content Tracker
- ~Simple~ Stupid Content Tracker (`man git`)
- Persistant Map

[Git] What are the two type of git command ? % Porcelain and Plumbing, everday command, and low level command

### Browse object

Everything is object mapped to Hash SHA-1 (20 byte)

get hash of a content: `echo "Language" | git hash-object --stdin`
get hash of a content and save it in git db: `echo "Language" | git hash-object --stdin -w`
-> saved in `.git/objects`
-> saved in binary format

show the type of binary format: `git cat-file -t <ref name>`
show the content of binary format: `git cat-file -p <ref name>`

When you do the cat-file in a commit we obtain: `tree`, `parent`, `author`, `commiter`, `commit message`
Git objects: `commits`, `trees`, `blobs`, `annotated tags`

[Git] How to create a git hash and how to save it in git db ? % echo "Language" | git hash-object --stdin -w <br/> # the -w permit to save in git db
[Git] Where all git object are stored ? % in `.git/objects`
[Git] How to see git object type ? content ? % with the command `git cat-file -p <ref name>` change `-p` by `-t` to show the type
[Git] What content a `commit` object % `tree`, `parent`, `author`, `commiter`, `commit message`
[Git] What content a type of object exist in git % `commits`, `trees`, `blobs`, `annotated tags`

### Files organization

Count object in your git db: `git count-objects`
Branch are stored if `.git/refs/heads`
Current branch is in `.git/HEAD`
Sometime during a merge it make a fast-forward, it means there is no modification in view to the last commit so git will not create a new one but only target the commit

tag are stored in `.git/refs/tags`
tag are only a new line in a commit, if add an annotation it will create a new commit with the tag and as parent the commit you wanted to tag, if you tag without annotation it only add the tag on the commit

When something is not used 2 possibility: if there is no parent or branch, it will be cleaned, if it is a part of the history but not use, it will be packed

remote branch are stored in `.git/refs/remotes`
to check the difference between local and remote branch: `git show-ref <branch name>`

[Git] How TODO
TODO
