#!/bin/bash

# 워크스페이스 목록 가져오기
workspaces=$(pnpm ls -r --depth -1 --json | jq -r '.[] | select(.path | contains("/packages/")) | {name: .name, path: .path}')

# 선택 메뉴 표시
echo "워크스페이스를 선택하세요:"
select choice in $(echo "$workspaces" | jq -r '.name'); do
  if [ -n "$choice" ]; then
    workspace_name=$choice
    workspace_path=$(echo "$workspaces" | jq -r --arg CHOICE "$choice" '. | select(.name == $CHOICE) | .path')
    echo "선택된 워크스페이스: $workspace_name"
    echo "경로: $workspace_path"
    break
  else
    echo "유효한 선택이 아닙니다. 다시 선택해주세요."
  fi
done


# 선택된 워크스페이스에서 스크립트 실행
if [ -n "$workspace_name" ] && [ -n "$workspace_path" ]; then
    pnpm build --filter "$workspace_name"
    ./prerelease.sh "$workspace_name" "$workspace_path"
else
    echo "워크스페이스가 선택되지 않았습니다."
    exit 1
fi