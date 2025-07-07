#!/bin/bash

# Script để chạy toàn bộ các service backend
# Sử dụng: ./start-backend-services.sh

echo "🚀 Bắt đầu khởi động các service backend..."

# Kiểm tra xem MongoDB có đang chạy không
echo "📋 Kiểm tra MongoDB..."
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB đang chạy"
else
    echo "⚠️  MongoDB không được tìm thấy. Vui lòng đảm bảo MongoDB đang chạy."
    echo "   Bạn có thể chạy: mongod"
fi

# Tạo thư mục logs nếu chưa có
if [ ! -d "logs" ]; then
    mkdir logs
    echo "📁 Đã tạo thư mục logs"
fi

# Hàm để chạy service
start_service() {
    local service_name=$1
    local service_path=$2
    local port=$3
    
    echo "🔄 Khởi động $service_name trên port $port..."
    
    # Kiểm tra xem service đã chạy chưa
    if pgrep -f "node.*$service_path" > /dev/null; then
        echo "⚠️  $service_name đã đang chạy. Vui lòng dừng trước khi chạy lại."
        return
    fi
    
    # Chạy service trong background
    cd "$service_path"
    nohup node service.js > "../../logs/$service_name.log" 2> "../../logs/$service_name-error.log" &
    local pid=$!
    cd - > /dev/null
    
    # Đợi một chút để service khởi động
    sleep 3
    
    # Kiểm tra xem service có chạy thành công không
    if curl -s "http://localhost:$port" > /dev/null 2>&1; then
        echo "✅ $service_name đã khởi động thành công trên port $port (PID: $pid)"
    else
        echo "⚠️  Không thể kiểm tra $service_name trên port $port"
        echo "   Kiểm tra logs tại: logs/$service_name.log"
    fi
}

# Khởi động các service
echo ""
echo "📦 Cài đặt dependencies cho các service..."

# User Project Service (Port 5000)
echo "📦 Cài đặt dependencies cho user-project-service..."
cd back_end/user-project-service
npm install
cd ../..
start_service "user-project-service" "back_end/user-project-service" "5000"

# About Service (Port 5001)
echo "📦 Cài đặt dependencies cho about-service..."
cd back_end/about-service
npm install
cd ../..
start_service "about-service" "back_end/about-service" "5001"

# Resume Service (Port 5002)
echo "📦 Cài đặt dependencies cho resume-service..."
cd back_end/resume-service
npm install
cd ../..
start_service "resume-service" "back_end/resume-service" "5002"

echo ""
echo "🎉 Hoàn thành! Các service backend đã được khởi động:"
echo "   • User Project Service: http://localhost:5000"
echo "   • About Service: http://localhost:5001"
echo "   • Resume Service: http://localhost:5002"
echo ""
echo "📋 Logs được lưu trong thư mục 'logs/'"
echo "🛑 Để dừng tất cả services, chạy: ./stop-backend-services.sh" 