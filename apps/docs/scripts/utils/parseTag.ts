export function parseTag(tag: string) {
    const [packageScope] = tag.split('/')
    const [packageName, version] = tag.split('/')[1].split('@')

    return {
        name: `${packageScope}/${packageName}`,
        packageName,
        packageScope,
        version,
    }
}
