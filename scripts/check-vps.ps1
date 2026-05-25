param(
  [string]$ConnectInfoPath = "C:\work\ai-product-build-lab\connect_info.txt"
)

$ErrorActionPreference = "Stop"

function Get-VpsSshArgs {
  param([string]$Path)

  if (-not (Test-Path -LiteralPath $Path)) {
    throw "Connect info file was not found."
  }

  $info = Get-Content -Raw -LiteralPath $Path
  $ip = ([regex]::Match($info, "(?<!\d)(?:\d{1,3}\.){3}\d{1,3}(?!\d)")).Value
  $portMatch = [regex]::Match($info, "(?im)(?:port)\D+(\d{2,5})")
  $port = if ($portMatch.Success) { $portMatch.Groups[1].Value } else { "22" }
  $keyMatch = [regex]::Match($info, "([A-Za-z]:\\[^\r\n`"`']+)")
  $keyPath = if ($keyMatch.Success) { $keyMatch.Groups[1].Value.Trim() } else { $null }

  $userAt = [regex]::Match($info, "([A-Za-z0-9_.-]+)@(?:\d{1,3}\.){3}\d{1,3}")
  $user = if ($userAt.Success) {
    $userAt.Groups[1].Value
  } else {
    $userLine = [regex]::Match($info, "(?im)(?:user|username|login)\D+([A-Za-z0-9_.-]+)")
    if ($userLine.Success) { $userLine.Groups[1].Value } else { $null }
  }

  if (-not $ip) { throw "Could not parse VPS host." }
  if (-not $user) { throw "Could not parse SSH user." }

  $argsList = @(
    "-o", "BatchMode=yes",
    "-o", "ConnectTimeout=10",
    "-o", "StrictHostKeyChecking=accept-new",
    "-p", $port
  )
  if ($keyPath) {
    $argsList += @("-i", $keyPath)
  }
  $argsList += "$user@$ip"

  return $argsList
}

$remoteCommand = @'
set -e
cd /opt/ai-business/apps/ai-product-build-lab
echo "--- git"
git status --short --branch
git rev-parse --short HEAD
echo "--- docker"
docker compose ps
echo "--- web"
curl -fsS -I http://127.0.0.1/ | head -5
'@

$sshArgs = Get-VpsSshArgs -Path $ConnectInfoPath
& ssh @sshArgs $remoteCommand
