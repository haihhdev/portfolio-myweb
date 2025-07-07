# Script để chạy toàn bộ các service backend
# Sử dụng: .\start-backend-services.ps1

Write-Host "🚀 Bắt đầu khởi động các service backend..." -ForegroundColor Green

# Kiểm tra xem MongoDB có đang chạy không
Write-Host "📋 Kiểm tra MongoDB..." -ForegroundColor Yellow
try {
    $mongoProcess = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
    if ($mongoProcess) {
        Write-Host "✅ MongoDB đang chạy" -ForegroundColor Green
    } else {
        Write-Host "⚠️  MongoDB không được tìm thấy. Vui lòng đảm bảo MongoDB đang chạy." -ForegroundColor Yellow
        Write-Host "   Bạn có thể chạy: mongod" -ForegroundColor Cyan
    }
} catch {
    Write-Host "⚠️  Không thể kiểm tra MongoDB" -ForegroundColor Yellow
}

# Tạo thư mục logs nếu chưa có
if (!(Test-Path "logs")) {
    New-Item -ItemType Directory -Name "logs"
    Write-Host "📁 Đã tạo thư mục logs" -ForegroundColor Green
}

# Hàm để chạy service
function Start-Service {
    param(
        [string]$ServiceName,
        [string]$ServicePath,
        [string]$Port
    )
    
    Write-Host "🔄 Khởi động $ServiceName trên port $Port..." -ForegroundColor Cyan
    
    # Kiểm tra xem service đã chạy chưa
    $existingProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -eq "node" }
    if ($existingProcess) {
        Write-Host "⚠️  Có process Node.js đang chạy. Vui lòng dừng trước khi chạy lại." -ForegroundColor Yellow
        return
    }
    
    # Chạy service trong background
    Start-Process -FilePath "node" -ArgumentList "service.js" -WorkingDirectory $ServicePath -WindowStyle Hidden -RedirectStandardOutput "logs/$ServiceName.log" -RedirectStandardError "logs/$ServiceName-error.log"
    
    # Đợi một chút để service khởi động
    Start-Sleep -Seconds 3
    
    # Kiểm tra xem service có chạy thành công không
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$Port" -TimeoutSec 5 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ $ServiceName đã khởi động thành công trên port $Port" -ForegroundColor Green
        } else {
            Write-Host "⚠️  $ServiceName có thể đã khởi động nhưng response không như mong đợi" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "⚠️  Không thể kiểm tra $ServiceName trên port $Port" -ForegroundColor Yellow
        Write-Host "   Kiểm tra logs tại: logs/$ServiceName.log" -ForegroundColor Cyan
    }
}

# Khởi động các service
Write-Host "`n📦 Cài đặt dependencies cho các service..." -ForegroundColor Yellow

# User Project Service (Port 5000)
Write-Host "📦 Cài đặt dependencies cho user-project-service..." -ForegroundColor Cyan
Set-Location "back_end/user-project-service"
npm install
Start-Service -ServiceName "user-project-service" -ServicePath "back_end/user-project-service" -Port "5000"
Set-Location "../../"

# About Service (Port 5001)
Write-Host "📦 Cài đặt dependencies cho about-service..." -ForegroundColor Cyan
Set-Location "back_end/about-service"
npm install
Start-Service -ServiceName "about-service" -ServicePath "back_end/about-service" -Port "5001"
Set-Location "../../"

# Resume Service (Port 5002)
Write-Host "📦 Cài đặt dependencies cho resume-service..." -ForegroundColor Cyan
Set-Location "back_end/resume-service"
npm install
Start-Service -ServiceName "resume-service" -ServicePath "back_end/resume-service" -Port "5002"
Set-Location "../../"

Write-Host "`n🎉 Hoàn thành! Các service backend đã được khởi động:" -ForegroundColor Green
Write-Host "   • User Project Service: http://localhost:5000" -ForegroundColor White
Write-Host "   • About Service: http://localhost:5001" -ForegroundColor White
Write-Host "   • Resume Service: http://localhost:5002" -ForegroundColor White
Write-Host "`n📋 Logs được lưu trong thư mục 'logs/'" -ForegroundColor Cyan
Write-Host "🛑 Để dừng tất cả services, chạy: .\stop-backend-services.ps1" -ForegroundColor Cyan 