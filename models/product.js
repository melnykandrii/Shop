class Product {
    constructor(id, ownerId, title, imageUrl, description, price, isClothes, isElectronic, isBook, isHomeDeco, isOffice) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.isClothes = isClothes;
        this.isElectronic = isElectronic;
        this.isBook = isBook;
        this.isHomeDeco = isHomeDeco;
        this.isOffice = isOffice;

    }
}

export default Product;