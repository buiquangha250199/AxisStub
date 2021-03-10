'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var cors        = require('cors');

var apiRoutes         = require('./routes/api.js');
var fccTestingRoutes  = require('./routes/fcctesting.js');
var runner            = require('./test-runner');
var helmet = require('helmet');

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //USED FOR FCC TESTING PURPOSES ONLY!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet.noCache());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.route('/landing-page')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/landing-page.html');
  });

app.route('/login')
  .post(function (req, res) {
    
  res.json({status: "True", message: "Login successful"});
  });

const booleanArr = [true, false];
const publichedArr = [1, 1, 1, 1, 1, 2, 3, 4];
const statusIdArr = [2, 2, 2, 2, 2, 1, 3, 4];
const contractIdArr = [3453455, 42, 3453434, 5676787, 235823, 6456432, 3423423, 250299, 6499, 2222, 1111];
const contractNameArr = ["ggaw", "grgerg", " 4t34", "1242 Linh", "sdgvfb linh", "65475 linh", "HaBQ", "Phuong", "test"];

app.route('/api')
  .get(function (req, res) {
  
  let arr = [];
  let randomArrayLength = Math.floor(10 + Math.random() * 90)
  
  for (let i = 0; i <= randomArrayLength; i++) {
    const sactory_import = booleanArr[Math.floor(Math.random() * booleanArr.length)];
    const published = publichedArr[Math.floor(Math.random() * publichedArr.length)];
    const status_id = statusIdArr[Math.floor(Math.random() * statusIdArr.length)];
    const contract_id = contractIdArr[Math.floor(Math.random() * contractIdArr.length)];
    const contract_name = contractNameArr[Math.floor(Math.random() * contractNameArr.length)];
    
    arr.push({
  "sactory_import":sactory_import,
  "id": 10,
  "published": published,
  "contract_id": contract_id,
  "contract_name": contract_name,
  "parent_id": null,
  "origin_id": 1,
  "merchandise_id": 1,
  "merchandise_name": "商材A",
  "merchandise_category": "商材カテゴリA",
  "merchandise_code": "商材コードA",
  "status_id": status_id,
  "prev_status_id": null,
  "send_company_id": 1,
  "send_company_name": "Septeni Japan",
  "send_group_id": 1,
  "send_group_name": "クリエイティブ本部",
  "send_user_id": 1,
  "send_user_name": "ユーザーA",
  "send_user_email": "user_a@septeni.co.jp",
  "send_stakeholders": [{
      "id": 2,
      "name": "ユーザーB",
      "email": "user_b@septeni.co.jp"
    },
    {
      "id": 3,
      "name": "ユーザーC",
      "email": "user_c@septeni.co.jp"
    }
  ],
  "send_email_to": [
    "send_email_to_a@septeni.co.jp",
    "send_email_to_b@septeni.co.jp"
  ],
  "recieve_company_id": 2,
  "recieve_company_name": "Septeni Ad Creative",
  "recieve_group_id": 2,
  "recieve_group_name": "プロダクト部",
  "recieve_user_id": 4,
  "recieve_user_name": "ユーザーD",
  "recieve_user_email": "user_d@septeni-adcreative.co.jp",
  "recieve_stakeholders": [{
      "id": 5,
      "name": "ユーザーE",
      "email": "user_e@septeni-adcreative.co.jp"
    },
    {
      "id": 6,
      "name": "ユーザーF",
      "email": "user_f@septeni-adcreative.co.jp"
    }
  ],
  "recieve_email_to": [
    "recieve_email_to_a@septeni.co.jp",
    "recieve_email_to_b@septeni.co.jp"
  ],
  "project_name": "プロジェクトA",
  "type": "recieve",
  "description": "説明書き",
  "files": [{
      "name": "02_336x280_R_200826145458CFM25518.jpg",
      "url": "projects\/1715\/products\/3241\/customFields\/21\/jYxAE3tLSpqH1jw.jpg",
      "size": 81111
    },
    {
      "name": "ae5a9b6e34e5c3ad6f29124c098d448d.jpg",
      "url": "projects\/1715\/products\/3241\/customFields\/21\/sw1NVMGqrMcOoKa.jpg",
      "size": 29799
    }
  ],
  "payment_date": "2020-07-02",
  "estimate_date": "2020-05-11 20:47:00",
  "delivery_date": "2020-05-13 21:00:00",
  "billing_date": "2020-05-13",
  "order_date": "2020-05-11 20:47:00",
  "products_quantity": 3,
  "products_price": 0,
  "products_price_tax_included": "0",
  "author_id": 1,
  "author_name": "ユーザーA",
  "author_company_id": 1,
  "author_company_name": "Septeni Japan",
  "last_updated_user_id": 1,
  "last_updated_user_name": "ユーザーA",
  "created_at": "2020-05-11 11:52:41",
  "updated_at": "2020-05-11 11:52:41",
  "deleted_at": null,
  "project_custom_fileds": [{
      "id": 1,
      "name": "担当_ディレクター",
      "format": "input",
      "value": "佐藤",
      "order": 1
    },
    {
      "id": 2,
      "name": "初稿希望日",
      "format": "date",
      "value": "2020-05-27T15:00:00.000Z",
      "order": 2
    },
    {
      "id": 3,
      "name": "納品希望日時",
      "format": "datetime",
      "value": "2020-08-21T09:36:57.163Z",
      "order": 3
    }
  ],
  "products": [{
    "id": 1,
    "product_id": 10,
    "order": 1,
    "name": "静止画_バナー_新規_デザイン",
    "code": "コードA",
    "category_name": "カテゴリA",
    "remarks": "",
    "relation_code": "", //CT Slot id
    "quantity": 1,
    "price": 0,
    "currency_id": 1,
    "currency_name": "JPY",
    "tax_id": 1,
    "tax_name": "外税10%",
    "exchange_rate": 1,
    "total_price": 0,
    "total_price_tax": 0,
    "regulations": [{
      "id": 1,
      "value": "Facebook_静止画(1200x628 30MB)",
      "code": "",
      "category_name": "",

    }],
    "product_custom_fileds": [{
        "id": 4,
        "name": "素材_URL",
        "format": "textarea",
        "value": "素材",
        "order": 1
      },
      {
        "id": 5,
        "name": "素材_画像/動画_未購入分有無",
        "format": "radio",
        "value": "無し",
        "order": 2
      },
      {
        "id": 6,
        "name": "デバイス",
        "format": "checkbox",
        "value": ["SP", "PC"],
        "order": 3
      },
      {
        "id": 7,
        "name": "添付ファイル",
        "format": "file",
        "value": [{
          "name": "002-number-1.png",
          "url": "projects\/513\/products\/560\/customFields\/140\/kv5De3mr8rqv6qr.png",
          "size": 1975
        }],
        "order": 4
      },
      {
        "id": 8,
        "name": "カルーセル本数",
        "format": "number",
        "value": 4,
        "order": 5
      },
      {
        "id": 9,
        "name": "動画_音声_有無",
        "format": "select",
        "value": "有り", //single
        "order": 6
      },
      {
        "id": 10,
        "name": "キャスティング_タイプ",
        "format": "select",
        "value": ["モデル", "エキストラ"], //multiple
        "order": 7
      },
      {
        "id": 11,
        "name": "担当_種類",
        "format": "reference",
        "value": "撮影",
        "order": 8
      },
    ],
    "created_at": "2020-05-14 09:30:58",
    "updated_at": "2020-05-14 09:30:58"
  }]
})
  }
  
  res.json(arr);
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for unit/functional testing
