"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var Comment = (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var Product = (function () {
    function Product(id, title, price, rating, desc, img, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.img = img;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var comments = [
    new Comment(1, 1, '2017-09-02 17:03:11', 'Derry', 3, '质量不错'),
    new Comment(2, 1, '2017-09-02 17:04:32', '斯琪', 5, '非常好'),
    new Comment(3, 1, '2017-09-02 17:05:16', '小天', 4, '很满意'),
    new Comment(4, 2, '2017-09-02 17:05:19', 'Derry', 2, '不太满意'),
    new Comment(5, 2, '2017-09-02 17:13:15', '小天', 5, '质量靠谱'),
    new Comment(6, 3, '2017-09-02 17:16:51', 'Derry', 1, '太差了'),
];
var products = [
    new Product(1, '安卓高级开发', 6380, 4, 'Android大神之路', 'assets/goods/android.jpg', ['安卓', '高级']),
    new Product(2, 'C++实战', 4180, 1, '嵌入式小白的福音', 'assets/goods/c.jpg', ['C++', '实战']),
    new Product(3, 'JAVA高级开发', 5880, 5, '业内第一语言的深入', 'assets/goods/java.jpg', ['JAVA', '高级']),
    new Product(4, 'JAVAWEB零基础', 5880, 3, '从0到1，企业级前后台交互', 'assets/goods/javaweb.jpg', ['JAVA', 'WEB']),
    new Product(5, 'Python项目实战', 4080, 2, '解释型语言潮流', 'assets/goods/python.jpg', ['Python', '实战']),
    new Product(6, 'Web前端高级开发', 5400, 5, '最接近客户的你', 'assets/goods/web.jpg', ['WEB', '高级'])
];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.send("Hello 动脑学院");
});
app.get('/mall/products', function (req, res) {
    res.json(products);
});
app.post('/mall/products', function (req, res) {
    var result = products;
    var params = req.body;
    if (params.title) {
        result = result.filter(function (product) { return product.title.indexOf(params.title) !== -1; });
    }
    if (params.price && result.length > 0) {
        result = result.filter(function (product) { return product.price <= parseInt(params.price); });
    }
    if (params.category !== '0' && result.length > 0) {
        result = result.filter(function (product) { return product.categories.indexOf(params.category) !== -1; });
    }
    res.json(result);
});
app.post('/mall/getProductById', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.body.id; }));
});
app.get('/mall/getCommentsByProductId/:id', function (req, res) {
    res.json(comments.filter(function (comment) {
        return comment.productId == req.params.id;
    }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("服务器已启动");
});
//# sourceMappingURL=mallService.js.map