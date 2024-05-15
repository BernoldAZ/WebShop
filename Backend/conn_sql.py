import psycopg2
from psycopg2 import sql
import os
import urllib.parse as up

DATABASE_URL = "postgres://synpzcnn:QU4qOAt00kS54tZk7XO2lXSrq76GDFha@tai.db.elephantsql.com/synpzcnn"

def execute_select_query():
    try:
        # Connect to your ElephantSQL database
        up.uses_netloc.append("postgres")
        url = up.urlparse(os.environ["DATABASE_URL"])
        conn = psycopg2.connect(database=url.path[1:],
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port
        )

        # Create a cursor object
        cur = conn.cursor()

        # Define your SQL query
        query = sql.SQL("SELECT * FROM 'user'")

        # Execute the query
        cur.execute(query)

        # Fetch all rows
        rows = cur.fetchall()

        # Print or process the rows as needed
        for row in rows:
            print(row)

        # Close the cursor and connection
        cur.close()
        conn.close()

    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL:", error)

# Call the function to execute the select query
execute_select_query()
