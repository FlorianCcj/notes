Git Flow

- Commit
  - each one work without next one
  - commit message need to be clear
  - follow conventionnal commit
  - one commit need to concerne one functionnality
- branch
  - branch master: for release
  - branch develop: to test feature before delivery
  - prefix branch name: hotfix, bugfix, feature
  - master and develop only can be edit thanks to PR
  - merge without creating merge commit
  - rebase from source branch before merge to check conflict
  - on PR follow conventionnal comment

Release process

- Create changelog from commit message
- list feature and bugfix in a release note
- merge in master
- add a new tag for versionning
- Artefact
  - for each PR, generate artefact with -<commit id>-snapshot
  - on main, generate artefact with -<commit id>-snapshot
  - on merge to master, generate artefact with -<tag>-RC ???
  - on tag, generate artefact with -<tag>

Tests

- For each PR test
  - artefact building
  - launch artefact test
  - deployment
  - deployed service
