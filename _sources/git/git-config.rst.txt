Git - gitconfig
###############
# ~/.gitconfig

.. code-block:: bash

	[push]
		default = simple
	[color]
		diff = auto
		status = auto
		branch = auto
		interactive = auto
		ui = true
		pager = true
	[color "branch"]
		current = yellow reverse
		local = green
		remote = red
	[color "diff"]
		meta = yellow bold
		frag = magenta bold
		old = red bold
		new = green bold
	[color "status"]
		added = green
		changed = yellow
		untracked = red
	[core]
		pager = less -FRSX
		whitespace = fix,-indent-with-non-tab,trailling-space,cr-at-eol
		autocrlf = input
	[alias]
		st = status
		ci = commit
		br = branch
		co = checkout
		df = diff
		dc = diff --cached
		lg = log -p
		ls = ls-files
		logg = log --graph --oneline --decorate
	[user]
		email = florianccj@gmail.com
		name = florianccj
