// backend/Category.js
class Category {
  constructor(
    categoryId,
    categoryName,
    createdDate,
    createdUser,
    updatedDate,
    updatedUser,
    deleted
  ) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.createdDate = createdDate;
    this.createdUser = createdUser;
    this.updatedDate = updatedDate;
    this.updatedUser = updatedUser;
    this.deleted = deleted;
  }
}

module.exports = Category;
