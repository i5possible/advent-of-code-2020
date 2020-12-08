#!/bin/sh

#define parameters which are passed in.
Day=$1

#define the template.
eval "echo \"$(cat  << EOF
const { readData } = require('./readfile');
const input = readData('day${Day}Input.txt');
const lines = input.split(//);
EOF)\"" > day${Day}.js

eval "echo \"$(cat << EOF
EOF)\"" > day${Day}Input.txt

