from bottle import run,Bottle,response,request
import json
app =  Bottle()

history= [
  {'id' : 1,  'date' : "5/11/2024", 'total' : 1500, 'user_name' : 'Test', 'address' : 'Test Address', 
  'items' : [
    {
        "id": 1,
        "name": "Nintendo Switch",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 3,
        "name": "Computer",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 7,
        "name": "Mario Kart",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 6,
        "name": "FIFA24",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 5,
        "name": "Xbox one",
        "quantity": 1,
        "price": 300
    }
]},
{'id' : 2,  'date' : "5/11/2024", 'total' : 3500, 'user_name' : 'Test', 'address' : 'Test Address', 
  'items' : [
    {
        "id": 1,
        "name": "Nintendo Switch",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 3,
        "name": "Computer",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 7,
        "name": "Mario Kart",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 6,
        "name": "FIFA24",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 5,
        "name": "Xbox one",
        "quantity": 1,
        "price": 300
    }
]}
]

users = [
    {
    'name' : "user",
    'email' : "u@u",
    'password' : 'user',
    'address': "here",
    'type' : 1
    },
    {
    'name' : "admin",
    'email' : "a@a",
    'password' : 'admin',
    'address': "here",
    'type' : 0
    }
]

products = [{
        "id" : 1,
        "name" : "Nintendo Switch",
        "description" : "New nintendo console",
        "price" : 300,
        "stock" : 10,
        "photo" : "https://www.proshop.at/Images/915x900/2791820_8522d794875c.jpg"
    },
                 {
        "id" : 2,
        "name" : "PlayStation 5",
        "description" : "New playstation console",
        "price" : 500,
        "stock" : 5,
        "photo" : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Nintendo-3DS-AquaOpen.png/1200px-Nintendo-3DS-AquaOpen.png"
    },
    {
        "id" : 1,
        "name" : "Nintendo Switch",
        "description" : "New nintendo console",
        "price" : 300,
        "stock" : 10,
        "photo" : "https://www.proshop.at/Images/915x900/2791820_8522d794875c.jpg"
    },
                 {
        "id" : 2,
        "name" : "PlayStation 5",
        "description" : "New playstation console",
        "price" : 500,
        "stock" : 5,
        "photo" : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Nintendo-3DS-AquaOpen.png/1200px-Nintendo-3DS-AquaOpen.png"
    },
    {
        "id" : 1,
        "name" : "Nintendo Switch",
        "description" : "New nintendo console",
        "price" : 300,
        "stock" : 10,
        "photo" : "https://www.proshop.at/Images/915x900/2791820_8522d794875c.jpg"
    },
                 {
        "id" : 2,
        "name" : "PlayStation 5",
        "description" : "New playstation console",
        "price" : 500,
        "stock" : 5,
        "photo" : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Nintendo-3DS-AquaOpen.png/1200px-Nintendo-3DS-AquaOpen.png"
    }
]

@app.route('/login', method='POST')
def login():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # Get user and password from the request body
    email = request.forms.get('user')
    password = request.forms.get('password')

    userExists = False
    for user in users:
        if user['email'] == email and user['password'] == password:
            # If login is successful, set a session cookie or return a token
            # For simplicity, let's just return a success message
            userExists = True
            response.status = 200
            return user

    if not userExists:
        # If login fails, return a 401 Unauthorized response
        response.status = 401
        return {'name' : "",'email' : "",'password' : '','address': "",'type' : -1 }
    
@app.route('/register', method='POST')
def register():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # Get user and password from the request body
    email = request.forms.get('user')
    password = request.forms.get('password')
    name = request.forms.get('name')
    address = request.forms.get('address')

    userExists = False
    for user in users:
        if user['email'] == email:
            userExists = True
            response.status = 500
            return {'Status' : "Invalid", "Message" : "User already exists"}

    if not userExists:
        users.append({
            'name' : name,
            'email' : email,
            'password' : password,
            'address': address,
            'type' : 1
        })
        response.status = 200
        return {'Status' : "Valid", "Message" : "User created successfully"}

@app.route('/update-user', method='POST')
def updateUser():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # Get user and password from the request body
    email = request.forms.get('user')
    address = request.forms.get('address')

    for user in users:
        if user['email'] == email:
            user['address'] = address
            response.status = 200
            return {'Status' : "Valid", "Message" : "User updated successfully"}


@app.route('/addProduct', method='POST')
def addProduct():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # Get user and password from the request body
    name = request.forms.get('name')
    description = request.forms.get('description')
    price = request.forms.get('price')
    stock = request.forms.get('stock')
    photo = request.forms.get('photo')

    products.append(
        {
        "id" : len(products)+1,
        "name" : name,
        "description" : description,
        "price" : int(price),
        "stock" : int(stock),
        "photo" : photo
    }
    )
    response.status = 200
    return {'Status' : "Valid", "Message" : "Product added successfully"}

@app.route('/removeProduct', method='POST')
def removeProduct():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # Get user and password from the request body
    id = int(request.forms.get('id'))

    products.pop(id-1 )
    response.status = 200
    return {'Status' : "Valid", "Message" : "Product removed successfully"}

@app.route('/editProduct', method='POST')
def editProduct():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # Get user and password from the request body
    id = int(request.forms.get('id'))
    name = request.forms.get('name')
    description = request.forms.get('description')
    price = request.forms.get('price')
    stock = request.forms.get('stock')
    photo = request.forms.get('photo')

    for product in products:
        if product["id"] == id:
            product['name'] = name
            product['description'] = description
            product['price'] = int(price)
            product['stock'] = int(stock)
            product['photo'] = photo
    response.status = 200
    return {'Status' : "Valid", "Message" : "Product edited successfully"}

@app.route('/products')
def get_products():
    response.headers['Access-Control-Allow-Origin'] = '*'
    return json.dumps(products)

@app.route('/history')
def get_history():
    response.headers['Access-Control-Allow-Origin'] = '*'
    return json.dumps(history)

@app.route('/addhistory', method='POST')
def addhistory():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # Get user and password from the request body
    name = request.forms.get('user_name')
    date = request.forms.get('date')
    email = request.forms.get('email')
    total = int(request.forms.get('total'))
    address = request.forms.get('address')
    items = list(eval(request.forms.get('items')))


    history.append(
        {
        'id' : len(history)+1,  
        'date' : date, 
        'total' : total, 
        'user_name' : name, 
        'address' : address, 
        'items' : items
    }
    )
    response.status = 200
    return {'Status' : "Valid", "Message" : "Shopping list added successfully"}

#run(app, host='192.168.0.113', port=8080)
run(app,host='localhost', port=8080)
