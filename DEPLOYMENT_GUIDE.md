# Hướng Dẫn Deploy Portfolio Website

## 🚀 Deploy Backend lên Render

### Bước 1: Chuẩn bị MongoDB

1. Tạo MongoDB Atlas cluster (miễn phí)
2. Lấy connection string: `mongodb+srv://username:password@cluster.mongodb.net/database`
3. Lưu connection string này để sử dụng sau

### Bước 2: Deploy từng service lên Render

#### 2.1. Deploy User Project Service

1. Truy cập [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Cấu hình:

   - **Name**: `user-project-service`
   - **Root Directory**: `back_end/user-project-service`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Thêm Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `MONGO_URI`: `your_mongodb_connection_string`
   - `CORS_ORIGIN`: `https://your-frontend-domain.vercel.app`

#### 2.2. Deploy About Service

1. Tạo Web Service mới
2. Cấu hình:

   - **Name**: `about-service`
   - **Root Directory**: `back_end/about-service`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

3. Thêm Environment Variables (giống như trên)

#### 2.3. Deploy Resume Service

1. Tạo Web Service mới
2. Cấu hình:

   - **Name**: `resume-service`
   - **Root Directory**: `back_end/resume-service`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

3. Thêm Environment Variables (giống như trên)

### Bước 3: Lấy URLs của các services

Sau khi deploy xong, bạn sẽ có các URLs như:

- `https://user-project-service.onrender.com`
- `https://about-service.onrender.com`
- `https://resume-service.onrender.com`

## 🌐 Deploy Frontend lên Vercel

### Bước 1: Chuẩn bị repository

1. Đảm bảo code đã được push lên GitHub
2. Kiểm tra file `vercel.json` đã được tạo

### Bước 2: Deploy lên Vercel

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import GitHub repository
4. Cấu hình:
   - **Framework Preset**: Next.js
   - **Root Directory**: `front-end`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Bước 3: Cấu hình Environment Variables

Trong Vercel Dashboard, thêm các environment variables:

- `NEXT_PUBLIC_USER_PROJECT_API_URL`: `https://user-project-service.onrender.com`
- `NEXT_PUBLIC_ABOUT_API_URL`: `https://about-service.onrender.com`
- `NEXT_PUBLIC_RESUME_API_URL`: `https://resume-service.onrender.com`

### Bước 4: Deploy

1. Click "Deploy"
2. Vercel sẽ tự động build và deploy
3. Sau khi hoàn thành, bạn sẽ có URL như: `https://your-project.vercel.app`

## 🔄 Cập nhật CORS Origin

Sau khi có URL của frontend, cập nhật `CORS_ORIGIN` trong các backend services trên Render:

1. Vào từng service trong Render Dashboard
2. Vào tab "Environment"
3. Cập nhật `CORS_ORIGIN` thành URL của frontend Vercel
4. Redeploy service

## 📝 Lưu ý quan trọng

### Render Free Plan Limitations:

- Services sẽ sleep sau 15 phút không có traffic
- Có thể mất 30-60 giây để wake up
- Giới hạn 750 giờ/tháng

### Vercel Free Plan:

- Không giới hạn bandwidth
- Tự động deploy khi push code
- Custom domain support

### MongoDB Atlas:

- Free tier có 512MB storage
- 500 connections
- Shared clusters

## 🛠️ Troubleshooting

### Backend không kết nối được MongoDB:

- Kiểm tra connection string
- Đảm bảo IP whitelist (0.0.0.0/0 cho production)
- Kiểm tra username/password

### CORS errors:

- Kiểm tra `CORS_ORIGIN` environment variable
- Đảm bảo URL frontend chính xác
- Redeploy backend services

### Frontend không load được data:

- Kiểm tra environment variables trong Vercel
- Kiểm tra URLs của backend services
- Kiểm tra network tab trong browser dev tools

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Next.js Documentation](https://nextjs.org/docs)
