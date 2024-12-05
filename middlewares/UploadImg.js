const multer = require("multer");
const path = require("path");

// Cấu hình Multer để lưu trữ ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img"); // Đường dẫn thư mục lưu trữ hình ảnh
  },
  filename: (req, file, cb) => {
    // Tạo tên tệp ngẫu nhiên và duy nhất
    const uniqueSuffix =
      Date.now() + "-" + crypto.randomBytes(4).toString("hex");
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Tên tệp độc nhất
  },
});
const upload = multer({ storage });
module.exports = { upload };
