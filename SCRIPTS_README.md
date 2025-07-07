# 🚀 Scripts để chạy Backend Services

Tài liệu này hướng dẫn cách sử dụng các script để chạy toàn bộ các service backend của portfolio.

## 📋 Danh sách Scripts

### 🔧 Scripts cho Windows (PowerShell)

| Script                       | Mô tả                                         |
| ---------------------------- | --------------------------------------------- |
| `start-backend-services.ps1` | Khởi động tất cả backend services (Node.js)   |
| `stop-backend-services.ps1`  | Dừng tất cả backend services                  |
| `start-docker-services.ps1`  | Khởi động tất cả services bằng Docker Compose |
| `stop-docker-services.ps1`   | Dừng tất cả Docker services                   |

### 🐧 Scripts cho Linux/Mac (Bash)

| Script                      | Mô tả                                       |
| --------------------------- | ------------------------------------------- |
| `start-backend-services.sh` | Khởi động tất cả backend services (Node.js) |
| `stop-backend-services.sh`  | Dừng tất cả backend services                |

## 🚀 Cách sử dụng

### Phương pháp 1: Chạy trực tiếp (Node.js)

#### Windows:

```powershell
# Khởi động tất cả services
.\start-backend-services.ps1

# Dừng tất cả services
.\stop-backend-services.ps1
```

#### Linux/Mac:

```bash
# Cấp quyền thực thi cho scripts
chmod +x start-backend-services.sh
chmod +x stop-backend-services.sh

# Khởi động tất cả services
./start-backend-services.sh

# Dừng tất cả services
./stop-backend-services.sh
```

### Phương pháp 2: Chạy bằng Docker

#### Windows:

```powershell
# Khởi động tất cả services bằng Docker
.\start-docker-services.ps1

# Dừng tất cả Docker services
.\stop-docker-services.ps1
```

## 📊 Các Service được khởi động

| Service              | Port | URL                   | Mô tả                    |
| -------------------- | ---- | --------------------- | ------------------------ |
| User Project Service | 5000 | http://localhost:5000 | Quản lý user và projects |
| About Service        | 5001 | http://localhost:5001 | Quản lý thông tin about  |
| Resume Service       | 5002 | http://localhost:5002 | Quản lý resume           |
| Frontend             | 3000 | http://localhost:3000 | Next.js frontend         |

## 📋 Yêu cầu hệ thống

### Cho phương pháp Node.js:

- Node.js (version 14 trở lên)
- npm hoặc yarn
- MongoDB (đang chạy)

### Cho phương pháp Docker:

- Docker Desktop
- Docker Compose

## 📁 Cấu trúc logs

Khi chạy bằng Node.js, logs sẽ được lưu trong thư mục `logs/`:

```
logs/
├── user-project-service.log
├── user-project-service-error.log
├── about-service.log
├── about-service-error.log
├── resume-service.log
└── resume-service-error.log
```

## 🔍 Kiểm tra trạng thái

### Kiểm tra services đang chạy:

#### Windows:

```powershell
# Kiểm tra process Node.js
Get-Process -Name "node"

# Kiểm tra ports đang sử dụng
netstat -ano | findstr :5000
netstat -ano | findstr :5001
netstat -ano | findstr :5002
```

#### Linux/Mac:

```bash
# Kiểm tra process Node.js
ps aux | grep node

# Kiểm tra ports đang sử dụng
lsof -i :5000
lsof -i :5001
lsof -i :5002
```

### Kiểm tra Docker services:

```bash
# Kiểm tra trạng thái containers
docker-compose ps

# Xem logs của tất cả services
docker-compose logs -f

# Xem logs của service cụ thể
docker-compose logs -f user-project-service
```

## ⚠️ Lưu ý quan trọng

1. **MongoDB**: Đảm bảo MongoDB đang chạy trước khi khởi động các services
2. **Ports**: Các ports 5000, 5001, 5002, 3000 phải không được sử dụng bởi ứng dụng khác
3. **Environment Variables**: Các services cần biến môi trường `MONGO_URI` để kết nối database
4. **Dependencies**: Scripts sẽ tự động cài đặt dependencies cho mỗi service

## 🛠️ Troubleshooting

### Lỗi thường gặp:

1. **Port đã được sử dụng**:

   ```bash
   # Tìm process đang sử dụng port
   lsof -i :5000  # Linux/Mac
   netstat -ano | findstr :5000  # Windows
   ```

2. **MongoDB không kết nối được**:

   - Kiểm tra MongoDB có đang chạy không
   - Kiểm tra connection string trong environment variables

3. **Dependencies lỗi**:

   ```bash
   # Xóa node_modules và cài lại
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Docker không chạy**:
   - Khởi động Docker Desktop
   - Kiểm tra Docker service có đang chạy không

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:

1. Logs trong thư mục `logs/`
2. Console output khi chạy scripts
3. Trạng thái của MongoDB
4. Các ports có đang được sử dụng không
