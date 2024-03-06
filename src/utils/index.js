module.exports = {
  multipleMongooseObject(data) {
    return data.map((item) => item.toObject());
  },
  mongooseObject(mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
  formatCurrencyNumber(number) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  },
};
