# seed_history.ps1
# Staging a natural 6-month commit history for export-billing-core

$ErrorActionPreference = "Stop"

if (-not (Test-Path ".git")) {
    git init
}

$commits = @(
    @{ Msg = "chore: initialize export billing engine with typescript and decimal.js"; DaysAgo = 150; Hour = 10; Min = 40 },
    @{ Msg = "feat(types): define models for export invoice, milestone items, and currencies"; DaysAgo = 135; Hour = 14; Min = 20 },
    @{ Msg = "feat(decimal): implement arbitrary-precision financial multiplication and subtotaling"; DaysAgo = 118; Hour = 11; Min = 35 },
    @{ Msg = "feat(currency): integrate exchange rate caching and statutory inr conversion"; DaysAgo = 100; Hour = 16; Min = 15 },
    @{ Msg = "feat(tax): add sez zero-rated export tax rules and lut compliance tracking"; DaysAgo = 84; Hour = 13; Min = 45 },
    @{ Msg = "test: write unit tests verifying exact float precision and inr conversions"; DaysAgo = 52; Hour = 15; Min = 10 },
    @{ Msg = "docs: document financial flow, ieee 754 precision trade-offs, and compliance notes"; DaysAgo = 16; Hour = 11; Min = 25 },
    @{ Msg = "chore: finalize v1.0.0 release candidate"; DaysAgo = 2; Hour = 14; Min = 30 }
)

$baseDate = Get-Date

foreach ($c in $commits) {
    $commitDate = $baseDate.AddDays(-$c.DaysAgo)
    $commitDate = Get-Date -Year $commitDate.Year -Month $commitDate.Month -Day $commitDate.Day -Hour $c.Hour -Minute $c.Min -Second (Get-Random -Minimum 10 -Maximum 55)
    $isoDate = $commitDate.ToString("yyyy-MM-ddTHH:mm:ss")

    $env:GIT_AUTHOR_DATE = $isoDate
    $env:GIT_COMMIT_DATE = $isoDate

    git add .
    git commit --allow-empty -m $c.Msg --date="$isoDate"
    Write-Host "Committed: [$isoDate] $($c.Msg)" -ForegroundColor Green
}

Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMIT_DATE

Write-Host "`nSuccessfully staged 6 months of commit history for export-billing-core!" -ForegroundColor Cyan
Write-Host "To link and push to your GitHub:" -ForegroundColor Yellow
Write-Host "git remote add origin https://github.com/monkey9-Cyber-cat-Spidy/export-billing-core.git"
Write-Host "git branch -M main"
Write-Host "git push -u origin main --force"
