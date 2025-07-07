# Script để dừng toàn bộ các service Docker
# Sử dụng: .\stop-docker-services.ps1

Write-Host "🛑 Bắt đầu dừng các service Docker..." -ForegroundColor Red

# Kiểm tra xem Docker có đang chạy không
Write-Host "📋 Kiểm tra Docker..." -ForegroundColor Yellow
try {
    docker version | Out-Null
    Write-Host "✅ Docker đang chạy" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker không được tìm thấy hoặc không chạy" -ForegroundColor Red
    exit 1
}

# Kiểm tra xem docker-compose.yml có tồn tại không
if (!(Test-Path "docker-compose.yml")) {
    Write-Host "❌ Không tìm thấy file docker-compose.yml" -ForegroundColor Red
    exit 1
}

# Dừng và xóa các container
Write-Host "🛑 Dừng và xóa các container..." -ForegroundColor Yellow
docker-compose down

# Xóa các image không sử dụng (tùy chọn)
Write-Host "🧹 Dọn dẹp các image không sử dụng..." -ForegroundColor Yellow
docker image prune -f

Write-Host "✅ Tất cả các service Docker đã được dừng thành công!" -ForegroundColor Green
Write-Host "`n📋 Để khởi động lại các service, chạy: .\start-docker-services.ps1" -ForegroundColor Cyan 