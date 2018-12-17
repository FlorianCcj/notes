#!/bin/bash
# to rsync 0 */2 * * * rsync -az --exclude-from '/home/florianccj/Document/exclude-list.txt' /home/florianccj/Document /media/removable/SD\ Card/

rsync -az --exclude-from '/home/florianccj/Document/exclude-list.txt' /home/florianccj/Document /media/removable/SD\ Card/
