$domain='strangerthingsbyraviraj.com'
$end=(Get-Date).AddHours(2)
$log = Join-Path $PSScriptRoot 'domain-monitor.log'
"Monitor started for $domain at $((Get-Date).ToString('o'))" | Tee-Object -FilePath $log -Append
while ((Get-Date) -lt $end) {
  try {
    Resolve-DnsName -Name $domain -ErrorAction Stop | Out-Null
    $resp = Invoke-WebRequest -Uri ("https://{0}" -f $domain) -Method Head -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
    if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 400) {
      "$((Get-Date).ToString('o')) - LIVE: https://$domain responded with $($resp.StatusCode)" | Tee-Object -FilePath $log -Append
      break
    } else {
      "$((Get-Date).ToString('o')) - HTTP: $($resp.StatusCode)" | Tee-Object -FilePath $log -Append
    }
  } catch {
    "$((Get-Date).ToString('o')) - not live yet: $($_.Exception.Message)" | Tee-Object -FilePath $log -Append
  }
  Start-Sleep -Seconds 300
}
"Monitor finished at $((Get-Date).ToString('o'))" | Tee-Object -FilePath $log -Append
