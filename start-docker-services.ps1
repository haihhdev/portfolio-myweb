# Script để chạy toàn bộ các service bằng Docker Compose
# Sử dụng: .\start-docker-services.ps1

Write-Host "🐳 Bắt đầu khởi động các service bằng Docker Compose..." -ForegroundColor Green

# Kiểm tra xem Docker có đang chạy không
Write-Host "📋 Kiểm tra Docker..." -ForegroundColor Yellow
try {
    docker version | Out-Null
    Write-Host "✅ Docker đang chạy" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker không được tìm thấy hoặc không chạy" -ForegroundColor Red
    Write-Host "   Vui lòng khởi động Docker Desktop trước" -ForegroundColor Cyan
    exit 1
}

# Kiểm tra xem docker-compose.yml có tồn tại không
if (!(Test-Path "docker-compose.yml")) {
    Write-Host "❌ Không tìm thấy file docker-compose.yml" -ForegroundColor Red
    exit 1
}

# Dừng các container cũ nếu có
Write-Host "🛑 Dừng các container cũ..." -ForegroundColor Yellow
docker-compose down

# Build và khởi động các service
Write-Host "🔨 Building và khởi động các service..." -ForegroundColor Cyan
docker-compose up --build -d

# Đợi một chút để các service khởi động
Write-Host "⏳ Đợi các service khởi động..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Kiểm tra trạng thái các container
Write-Host "📋 Kiểm tra trạng thái các container..." -ForegroundColor Cyan
docker-compose ps

# Kiểm tra logs
Write-Host "📋 Kiểm tra logs..." -ForegroundColor Cyan
Write-Host "`n📋 Để xem logs của tất cả services:" -ForegroundColor White
Write-Host "   docker-compose logs -f" -ForegroundColor Cyan
Write-Host "`n📋 Để xem logs của service cụ thể:" -ForegroundColor White
Write-Host "   docker-compose logs -f user-project-service" -ForegroundColor Cyan
Write-Host "   docker-compose logs -f about-service" -ForegroundColor Cyan
Write-Host "   docker-compose logs -f resume-service" -ForegroundColor Cyan
Write-Host "   docker-compose logs -f frontend" -ForegroundColor Cyan

Write-Host "`n🎉 Hoàn thành! Các service đã được khởi động:" -ForegroundColor Green
Write-Host "   • User Project Service: http://localhost:5000" -ForegroundColor White
Write-Host "   • About Service: http://localhost:5001" -ForegroundColor White
Write-Host "   • Resume Service: http://localhost:5002" -ForegroundColor White
Write-Host "   • Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "`n🛑 Để dừng tất cả services, chạy: .\stop-docker-services.ps1" -ForegroundColor Cyan 