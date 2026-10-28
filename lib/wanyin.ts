export const wanyinReleasesApi = 'https://wanyin.watch.nxtcorex.cn/releases.json'

export interface WanyinRelease {
  version: string
  versionCode: number
  url: string
}

interface ReleasesPayload {
  wear?: {
    releases?: {
      version: string
      versionCode: number
      channels?: { kind: string; url: string }[]
    }[]
  }
}

export function pickDirectWearReleases(payload: ReleasesPayload): WanyinRelease[] {
  return (payload.wear?.releases ?? [])
    .map((release) => ({
      version: release.version,
      versionCode: release.versionCode,
      url: release.channels?.find((channel) => channel.kind === 'direct')?.url ?? '',
    }))
    .filter((release) => release.url !== '')
}

export async function fetchWanyinReleases(): Promise<WanyinRelease[]> {
  try {
    const res = await fetch(wanyinReleasesApi)
    return pickDirectWearReleases(await res.json())
  } catch (error) {
    console.error('Failed to fetch wanyin releases:', error)
    return []
  }
}
