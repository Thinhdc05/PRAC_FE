const products = [
  { id: 1, name: "MacBook Pro M3", category: "Electronics", price: 2000, inStock: true, rating: 4.8 },
  { id: 2, name: "Áo Thun Cotton", category: "Clothing", price: 25, inStock: true, rating: 4.2 },
  { id: 3, name: "Tai nghe Sony WH-1000XM5", category: "Electronics", price: 350, inStock: false, rating: 4.6 },
  { id: 4, name: "Bàn phím cơ Keychron", category: "Electronics", price: 120, inStock: true, rating: 4.5 },
  { id: 5, name: "Quần Jeans Levi's", category: "Clothing", price: 80, inStock: true, rating: 4.0 },
  { id: 6, name: "Nồi chiên không dầu", category: "Home & Kitchen", price: 150, inStock: true, rating: 4.7 },
  { id: 7, name: "Chuột Logitech MX Master 3S", category: "Electronics", price: 100, inStock: false, rating: 4.9 },
  { id: 8, name: "Máy pha cà phê Delonghi", category: "Home & Kitchen", price: 600, inStock: true, rating: 4.4 }
];

const filterProducts = products.filter(product => {
    return product.category === "Electronics" && product.price > 100 && product.inStock;
})
console.log(filterProducts);

const filterProducts2 = products.filter(({category, price, inStock})=>
     category === "Electronics" && price > 100 && inStock)

function myFilter(arr, callback){
    const result = []
    for(let i = 0; i < arr.length; i++){
        const product = arr[i]
        if(callback(product)){
            result.push(product)
        }
    }
    return result
}
const ketQuaTuChe = myFilter(products, (item) => {
    return item.category === "Electronics" && item.price > 100 && item.inStock;
});
console.log("Kết quả máy tự chế:", ketQuaTuChe);
Array.prototype.myFilter2 = function(callback){
    const result = []
    for(let i = 0; i < this.length; i++){
        const product = this[i]
        if(callback(product)){
            result.push(product)
        }
    }
    return result
}
const ketQuaTuChe2 = products.myFilter2((item) => {
    return item.category === "Electronics" && item.price > 100 && item.inStock;
});
console.log("Kết quả máy tự chế:", ketQuaTuChe);

const productsSale=products.map(item=>(
    {

        ...item,
        salePrice: item.price * 0.85,
        isHotDeal: item.rating >= 4.7
    }
));
console.log(productsSale)

const total=products.reduce((acc,item)=>{
    if(item.inStock){
        return acc+item.price
    }
    return acc
},0);
// const total = products.reduce((acc, item) => 
//     item.inStock ? acc + item.price : acc
// , 0);

console.log(total)

const groupedProducts = products.reduce((acc,item)=>{
if(!acc[item.category]){
    acc[item.category]=[]
}
acc[item.category].push(item)
return acc

},{})
console.log(groupedProducts)
const checkRating = products.every(item => item.rating >= 4)
console.log(checkRating)