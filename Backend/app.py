from bottle import run,Bottle,response,request
import json
import psycopg2
from psycopg2 import sql
import os
import urllib.parse as up

app =  Bottle()
#docker build -t python-backend .
#docker run -d -p 8080:8080 python-backend

DATABASE_URL = "postgres://synpzcnn:QU4qOAt00kS54tZk7XO2lXSrq76GDFha@tai.db.elephantsql.com/synpzcnn"

def connectDB():
    try:
        # Connect to your ElephantSQL database
        up.uses_netloc.append("postgres")
        conn = psycopg2.connect(
            database="synpzcnn",
            user="synpzcnn",
            password="QU4qOAt00kS54tZk7XO2lXSrq76GDFha",
            host="tai.db.elephantsql.com",
            port="5432"
        )
        print("Connected successfully")
        return conn
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL:", error)
        
def castToProduct(product):
    item = {
    "id" : product[0],
    "name" : product[1],
    "description" : product[2],
    "price" : float(product[3]),
    "stock" : product[4],
    "photo" : product[5],
    }
    return item 
    
def select_productsDB():
    try:
        # Connect to your ElephantSQL database
        conn = connectDB()

        # Create a cursor object
        cur = conn.cursor()

        # Define your SQL query
        query = sql.SQL("SELECT * FROM products")

        # Execute the query
        cur.execute(query)

        # Fetch all rows
        rows = cur.fetchall()

        # Print or process the rows as needed
        res = [ castToProduct(row) for row in rows]

        # Close the cursor and connection
        cur.close()
        conn.close()
        
        return res

    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL:", error)

    finally:
        if conn:
            cur.close()
            conn.close()

def castToUser(userDB):
    user = {
    "name" : userDB[1],
    "email" : userDB[2],
    "address" : userDB[3],
    "type" : userDB[4],
    "password" : userDB[5],
    }
    return user 

def select_userDB(email, password):
    conn = connectDB()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM \"user\" WHERE email = %s AND password = %s", (email, password))
    userDB = cursor.fetchone()
    user = False
    if type(userDB)== tuple:
        print(userDB)
        user = castToUser(userDB)
    cursor.close()
    conn.close()
    return user

def add_userDB(user_name, user_email, user_address, user_type, user_password):
    try:
        status = True
        conn = connectDB()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO "user" (name, email, address, type, password)
            VALUES (%s, %s, %s, %s, %s)
        """, (user_name, user_email, user_address, user_type, user_password))
        conn.commit()
        print("User added successfully.")
    except (Exception, psycopg2.Error) as error:
        print("Error adding user to PostgreSQL:", error)
        status = False
    finally:
        if conn:
            cursor.close()
            conn.close()
        return status

def update_user_addressDB(user_email, new_address):
    try:
        status = True
        conn = connectDB()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE "user"
            SET address = %s
            WHERE email = %s
        """, (new_address, user_email))
        conn.commit()
        print("User address updated successfully.")
    except (Exception, psycopg2.Error) as error:
        print("Error updating user address in PostgreSQL:", error)
        status = False
    finally:
        if conn:
            cursor.close()
            conn.close()
        return status

def add_productDB(name, description, price, stock, photo):
    try:
        status = True
        conn = connectDB()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO products (name, description, price, stock, photo)
            VALUES (%s, %s, %s, %s, %s)
        """, (name, description, price, stock, photo))
        conn.commit()
        print("Product added successfully.")
    except (Exception, psycopg2.Error) as error:
        print("Error adding product to PostgreSQL:", error)
        status = False
    finally:
        if conn:
            cursor.close()
            conn.close()
        return status

def remove_productDB(product_id):
    try:
        status = True
        conn = connectDB()
        cursor = conn.cursor()
        cursor.execute("""
            DELETE FROM products
            WHERE id = %s
        """, (product_id,))
        conn.commit()
        print("Product removed successfully.")
    except (Exception, psycopg2.Error) as error:
        print("Error removing product from PostgreSQL:", error)
        status = False
    finally:
        if conn:
            cursor.close()
            conn.close()
        return status

def edit_productDB(product_id, name, description, price, stock, photo):
    try:
        status = True
        conn = connectDB()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE products
            SET name = %s, description = %s, price = %s, stock = %s, photo = %s
            WHERE id = %s
        """, (name, description, price, stock, photo, product_id))
        conn.commit()
        print("Product edited successfully.")
    except (Exception, psycopg2.Error) as error:
        print("Error editing product in PostgreSQL:", error)
        status = False
    finally:
        if conn:
            cursor.close()
            conn.close()
        return status

def add_historyDB(date, total, user_name, address, user_email, items):
    try:
        status = True
        conn = connectDB()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO history (date, total, user_name, address, user_email, items)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (date, total, user_name, address, user_email, json.dumps(items)))
        conn.commit()
        print("History entry added successfully.")
    except (Exception, psycopg2.Error) as error:
        print("Error adding history entry to PostgreSQL:", error)
        status = False
    finally:
        if conn:
            cursor.close()
            conn.close()
        return status

def castToHistory(history):
    item = {
    "id" : history[0],
    "date" : history[1],
    "total" : float(history[2]),
    "user_name" : history[3],
    "address" : history[4],
    "items" : eval(history[6]),
    }
    return item

def get_history_by_user_emailDB(user_email):
    try:
        conn = connectDB()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT * FROM history
            WHERE user_email = %s
        """, (user_email,))
        # Fetch all rows
        rows = cursor.fetchall()

        # Print or process the rows as needed
        res = [ castToHistory(row) for row in rows]

        # Close the cursor and connection
        cursor.close()
        conn.close()
        
        return res
    except (Exception, psycopg2.Error) as error:
        print("Error retrieving history entries from PostgreSQL:", error)
        return None
    finally:
        if conn:
            cursor.close()
            conn.close()

@app.route('/login', method='POST')
def login():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # Get user and password from the request body
    email = request.forms.get('user')
    password = request.forms.get('password')
    user = select_userDB(email,password)
    if user:
        response.status = 200
        return user

    else:
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

    if add_userDB(name,email,address,1,password):
        response.status = 200
        return {'Status' : "Valid", "Message" : "User created successfully"}

    else:
        response.status = 500
        return {'Status' : "Invalid", "Message" : "User already exists"}

@app.route('/update-user', method='POST')
def updateUser():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # Get user and password from the request body
    email = request.forms.get('user')
    address = request.forms.get('address')
    if update_user_addressDB(email,address):
        response.status = 200
        return {'Status' : "Valid", "Message" : "User updated successfully"}
    else:
        response.status = 404
        return {'Status' : "Invalid", "Message" : "User not found"}

@app.route('/addProduct', method='POST')
def addProduct():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # Get user and password from the request body
    name = request.forms.get('name')
    description = request.forms.get('description')
    price = request.forms.get('price')
    stock = request.forms.get('stock')
    photo = request.forms.get('photo')

    if add_productDB(name,description,price,stock,photo):
        response.status = 200
        return {'Status' : "Valid", "Message" : "Product added successfully"}
    else:
        response.status = 500
        return {'Status' : "Invalid", "Message" : "An error has occurred"}

@app.route('/removeProduct', method='POST')
def removeProduct():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # Get user and password from the request body
    id = int(request.forms.get('id'))

    if remove_productDB(id):
        response.status = 200
        return {'Status' : "Valid", "Message" : "Product removed successfully"}
    else:
        response.status = 500
        return {'Status' : "Invalid", "Message" : "An error has occurred"}

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

    if edit_productDB(id,name,description,price,stock,photo):
        response.status = 200
        return {'Status' : "Valid", "Message" : "Product removed successfully"}
    else:
        response.status = 500
        return {'Status' : "Invalid", "Message" : "An error has occurred"}

@app.route('/products')
def get_products():
    response.headers['Access-Control-Allow-Origin'] = '*'
    return json.dumps(select_productsDB())

@app.route('/history',method='POST')
def get_history():
    response.headers['Access-Control-Allow-Origin'] = '*'
    email = request.forms.get('user')
    return json.dumps(get_history_by_user_emailDB(email))

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

    if add_historyDB(date,total,name,address,email,items):
        response.status = 200
        return {'Status' : "Valid", "Message" : "Shopping successful"}
    else:
        response.status = 500
        return {'Status' : "Invalid", "Message" : "An error has occurred"}

#run(app, host='192.168.0.113', port=8080)
run(app,host='0.0.0.0', port=8080)
