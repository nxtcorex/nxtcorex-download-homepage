export interface WanyinRelease {
  version: string
  versionCode: number
  url: string
}

const releasesApi = 'https://wanyin.watch.nxtcorex.cn/releases.json'

interface ReleasesPayload {
  wear?: {
    releases?: {
      version: string
      versionCode: number
      channels?: { kind: string; url: string }[]
    }[]
  }
}

export async function fetchWanyinReleases(): Promise<WanyinRelease[]> {
  try {
    const res = await fetch(releasesApi)
    const data: ReleasesPayload = await res.json()

    return (data.wear?.releases ?? [])
      .map((release) => ({
        version: release.version,
        versionCode: release.versionCode,
        url: release.channels?.find((channel) => channel.kind === 'direct')?.url ?? '',
      }))
      .filter((release): release is WanyinRelease => release.url !== '')
  } catch (error) {
    console.error('Failed to fetch wanyin releases:', error)
    return []
  }
}
