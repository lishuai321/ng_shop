import * as express from 'express'

const app = express();
var bodyParser = require('body-parser');

export class Comment {
    constructor(
        public id: number,
        public productId: number,
        public timestamp: string,
        public user: string,
        public rating: number,
        public content: string
    ) {}
}

export class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public desc: string,
        public img: string,
        public categories: Array<string>
    ) {}
}

const comments: Comment[] = [
    new Comment(1, 1, '2017-09-02 17:03:11', 'Derry', 3, '质量不错'),
    new Comment(2, 1, '2017-09-02 17:04:32', '斯琪', 5, '非常好'),
    new Comment(3, 1, '2017-09-02 17:05:16', '小天', 4, '很满意'),
    new Comment(4, 2, '2017-09-02 17:05:19', 'Derry', 2, '不太满意'),
    new Comment(5, 2, '2017-09-02 17:13:15', '小天', 5, '质量靠谱'),
    new Comment(6, 3, '2017-09-02 17:16:51', 'Derry', 1, '太差了'),
];

const products: Product[] = [
    new Product(1, '安卓高级开发', 6380, 4, 'Android大神之路', 'assets/goods/android.jpg', ['安卓', '高级']),
    new Product(2, 'C++实战', 4180, 1, '嵌入式小白的福音', 'assets/goods/c.jpg', ['C++', '实战']),
    new Product(3, 'JAVA高级开发', 5880, 5, '业内第一语言的深入', 'assets/goods/java.jpg', ['JAVA', '高级']),
    new Product(4, 'JAVAWEB零基础', 5880, 3, '从0到1，企业级前后台交互', 'assets/goods/javaweb.jpg', ['JAVA', 'WEB']),
    new Product(5, 'Python项目实战', 4080, 2, '解释型语言潮流', 'assets/goods/python.jpg', ['Python', '实战']),
    new Product(6, 'Web前端高级开发', 5400, 5, '最接近客户的你', 'assets/goods/web.jpg', ['WEB', '高级'])
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=> {
    res.send("Hello 动脑学院");
});

app.get('/mall/products', function(req, res) {
    res.json(products);
})

app.post('/mall/products', function(req, res) {
    let result = products;
    const params = req.body;

    if (params.title) {
        result = result.filter( product => product.title.indexOf(params.title) !== -1);
    }

    if (params.price && result.length > 0) {
        result = result.filter( product => product.price <= parseInt(params.price));
    }

    if (params.category !== '0' && result.length > 0) {
        result = result.filter( product => product.categories.indexOf(params.category) !== -1);
    }
    res.json(result);
})

app.post('/mall/getProductById', function(req, res) {
    res.json(products.find((product) => product.id == req.body.id ));
})

app.get('/mall/getCommentsByProductId/:id', function(req, res) {
    res.json(comments.filter((comment: Comment) => {
        return comment.productId == req.params.id;
    }));
})

const server = app.listen(8000, "localhost", ()=>{
    console.log("服务器已启动")
});