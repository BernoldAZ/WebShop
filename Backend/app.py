from bottle import run,Bottle
import json
app =  Bottle()

@app.route('/')
def hello_world():
    return 'Hello, Jagoda!'


@app.route('/products')
def hello_world():
    products = [{
        "id" : 1,
        "Name" : "Nintendo Switch",
        "Description" : "New nintendo console",
        "Price" : 300,
        "Quantity" : 10
    },
                 {
        "id" : 2,
        "Name" : "PlayStation 5",
        "Description" : "New playstation console",
        "Price" : 500,
        "Quantity" : 5
    }]
    return json.dumps(products)

run(app, host='192.168.0.113', port=8080)
