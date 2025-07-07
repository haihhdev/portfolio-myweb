#!/bin/bash

# Script để dừng toàn bộ các service backend
# Sử dụng: ./stop-backend-services.sh

echo "🛑 Bắt đầu dừng các service backend..."

# Tìm và dừng tất cả các process Node.js
node_processes=$(pgrep -f "node.*service.js")

if [ ! -z "$node_processes" ]; then
    echo "📋 Tìm thấy các process Node.js đang chạy:"
    echo "$node_processes"
    
    for pid in $node_processes; do
        echo "🔄 Đang dừng process Node.js (PID: $pid)..."
        if kill -TERM "$pid" 2>/dev/null; then
            echo "✅ Đã dừng process Node.js (PID: $pid)"
        else
            echo "❌ Không thể dừng process Node.js (PID: $pid)"
        fi
    done
    
    # Đợi một chút để các process dừng
    sleep 2
    
    # Kiểm tra xem còn process nào không
    remaining_processes=$(pgrep -f "node.*service.js")
    if [ ! -z "$remaining_processes" ]; then
        echo "⚠️  Vẫn còn các process Node.js đang chạy:"
        echo "$remaining_processes"
        echo "   Đang force kill..."
        for pid in $remaining_processes; do
            kill -KILL "$pid" 2>/dev/null
        done
    fi
else
    echo "ℹ️  Không tìm thấy process Node.js nào đang chạy"
fi

# Kiểm tra cuối cùng
sleep 1
final_check=$(pgrep -f "node.*service.js")
if [ -z "$final_check" ]; then
    echo "✅ Tất cả các service backend đã được dừng thành công!"
else
    echo "⚠️  Vẫn còn $final_check process Node.js đang chạy"
    echo "   Bạn có thể cần dừng thủ công hoặc khởi động lại máy tính"
fi

echo ""
echo "📋 Để khởi động lại các service, chạy: ./start-backend-services.sh" 