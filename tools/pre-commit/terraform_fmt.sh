#!/bin/sh

set -e
EXIT_CODE=0
for fic in "$@"
do
  terraform fmt -check -diff "${fic}" || EXIT_CODE=$?
done
exit $EXIT_CODE
