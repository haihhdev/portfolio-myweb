# Script để dừng toàn bộ các service backend
# Sử dụng: .\stop-backend-services.ps1

Write-Host "🛑 Bắt đầu dừng các service backend..." -ForegroundColor Red

# Tìm và dừng tất cả các process Node.js
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue

if ($nodeProcesses) {
    Write-Host "📋 Tìm thấy $($nodeProcesses.Count) process Node.js đang chạy" -ForegroundColor Yellow
    
    foreach ($process in $nodeProcesses) {
        try {
            Write-Host "🔄 Đang dừng process Node.js (PID: $($process.Id))..." -ForegroundColor Cyan
            Stop-Process -Id $process.Id -Force
            Write-Host "✅ Đã dừng process Node.js (PID: $($process.Id))" -ForegroundColor Green
        } catch {
            Write-Host "❌ Không thể dừng process Node.js (PID: $($process.Id))" -ForegroundColor Red
        }
    }
} else {
    Write-Host "ℹ️  Không tìm thấy process Node.js nào đang chạy" -ForegroundColor Yellow
}

# Kiểm tra xem còn process nào không
Start-Sleep -Seconds 2
$remainingProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue

if ($remainingProcesses) {
    Write-Host "⚠️  Vẫn còn $($remainingProcesses.Count) process Node.js đang chạy" -ForegroundColor Yellow
    Write-Host "   Bạn có thể cần dừng thủ công hoặc khởi động lại máy tính" -ForegroundColor Cyan
} else {
    Write-Host "✅ Tất cả các service backend đã được dừng thành công!" -ForegroundColor Green
}

Write-Host "`n📋 Để khởi động lại các service, chạy: .\start-backend-services.ps1" -ForegroundColor Cyan 