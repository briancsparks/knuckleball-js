#!/bin/bash -e

script_dir="$( cd "$(dirname "$( readlink -f "${BASH_SOURCE[0]}" )" )" && pwd )"
case `uname` in
  *CYGWIN*|*MINGW*|*MSYS*) script_dir=`cygpath -w ${script_dir}`
esac

errcho() { echo "$@" 1>&2; }
die() { errcho "$@"; exit 1; }

