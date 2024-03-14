module.exports = {
  multipleMongooseObject(data) {
    return data.map((item) => item.toObject());
  },
  mongooseObject(mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
  formatCurrencyNumber(number) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(number);
  },
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },
};
