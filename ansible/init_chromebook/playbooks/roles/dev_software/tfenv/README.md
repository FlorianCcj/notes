# Tfenv

## Command

```bash
## install specific version
TFENV_AUTO_INSTALL=true
tfenv install
tfenv install 0.7.0
tfenv install latest
tfenv install latest:^0.8
tfenv install latest-allowed
tfenv install min-required

## use `.terraform-version` file
tfenv install

## If already install
tfenv use <version>

## Use version in `.terraform-version`
tfenv use

## Remove a version
tfenv uninstall 0.7.0

## List version
tfenv list
```

## .terraform-version

```hcl
terraform {
  required_version  = "<0.12.3, >= 0.10.0"
}
```

```hcl
0.6.16
```

## Upgrade tfenv

```bash
git --git-dir=~/.tfenv/.git pull
```
