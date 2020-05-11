#!/usr/bin/env bash

function list_daml_processes() {
  jps | grep daml-sdk.jar
}

function memory_usage_by_processes() {
  echo "DAML SDK processes:"
  list_daml_processes | awk -F" " '{print $1}' | xargs ps -o pid,rss,command,state -p
}

function total_memory_usage() {
  local total
  total=$(echo "scale=2 ; $(list_daml_processes | awk -F" " '{print $1}' | xargs ps -o rss= -p | paste -sd+ - | bc) / 1024 / 1024" | bc)
  echo "Total: $total GBs"
}

echo "___________________________"
echo "Memo analysis:"
echo "________________"
memory_usage_by_processes
echo "________________"
free -h | head -2
echo "________________"
ps -eo rss,%cpu,cmd --sort=-rss ww | head
echo "________________"
total_memory_usage