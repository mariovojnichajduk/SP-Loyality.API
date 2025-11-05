# Generate self-signed certificate for local development
$cert = New-SelfSignedCertificate -DnsName "localhost", "10.136.106.200" -CertStoreLocation "cert:\CurrentUser\My" -NotAfter (Get-Date).AddYears(1)

# Export certificate to PFX
$pwd = ConvertTo-SecureString -String "dev-password" -Force -AsPlainText
$pfxPath = Join-Path $PSScriptRoot "cert.pfx"
Export-PfxCertificate -Cert $cert -FilePath $pfxPath -Password $pwd

# Convert PFX to PEM format
$certPath = Join-Path $PSScriptRoot "cert.pem"
$keyPath = Join-Path $PSScriptRoot "key.pem"

# Export certificate (public key)
$certBytes = $cert.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Cert)
[System.IO.File]::WriteAllBytes($certPath, $certBytes)

Write-Host "Certificate generated successfully!"
Write-Host "PFX file: $pfxPath (password: dev-password)"
Write-Host "Certificate: $certPath"
Write-Host ""
Write-Host "Note: You'll need to use the PFX file with NestJS"
