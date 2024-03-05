// trung binh cac so chinh phuong
// tim so am lon nhat trong mang
// kiem tra so x co ton tai khong
// EX3
function checkNumberExist(arr, target) {
  if (!Array.isArray(arr) || arr.length === 0) return false;
  return arr.find((item) => item === target) ? true : false;
}
// EX2:
function findNegativeMax(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  let largest = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  return largest;
}
// Ex1
function calcNumber(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const arrFilter = arr.filter((item) => Math.sqrt(item) % 1 === 0);
  if (arrFilter.length === 0) return 0;
  const sum = arrFilter.reduce((sum, num) => sum + num, 0);
  const avg = sum / arrFilter.length;
  return avg;
}
module.exports = { checkNumberExist, findNegativeMax, calcNumber };
