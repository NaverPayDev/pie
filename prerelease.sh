workspace_name=$1
workspace_path=$2


if [ -z "$workspace_name" ] || [ -z "$workspace_path" ]; then
  echo "워크스페이스 이름과 경로가 필요합니다."
  exit 1
fi

cd "$workspace_path" || exit 1

LATEST=$(npm view "$workspace_name"@beta version)

# 버전 업데이트
if [[ $LATEST == *"-beta."* ]]; then
    # 이미 beta 버전이 존재하는 경우
    BASE_VERSION=$(echo $LATEST | cut -d'-' -f1)
    BETA_VERSION=$(echo $LATEST | cut -d'.' -f4)
    NEW_BETA=$((BETA_VERSION + 1))
    NEW_VERSION="${BASE_VERSION}-beta.${NEW_BETA}"
    npm version $NEW_VERSION --no-git-tag-version
else
    # 일반 버전인 경우 새로운 beta 버전 생성
    npm version premajor --preid=beta --no-git-tag-version
fi

NEW_VERSION=$(npm pkg get version | sed 's/"//g')

# 버전 비교 및 출력
echo "Latest prerelease version: $LATEST"
echo "New version: $NEW_VERSION"


# npm publish 실행
pnpm publish --tag beta --filter "$workspace_name" --no-git-checks

# package.json 복원
git checkout -- package.json

# GitHub Release 생성
gh release create $workspace_name@$NEW_VERSION --prerelease --title "$workspace_name@$NEW_VERSION" --notes "This is a pre-release version of $workspace_name." --target $(git rev-parse --abbrev-ref HEAD)

echo "$workspace_name is successfully published and created GitHub release: $NEW_VERSION"