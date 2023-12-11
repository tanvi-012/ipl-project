# from flask import Flask, request, jsonify
# import mysql.connector

# app = Flask(__name__)

# # MySQL configuration
# mysql_config = {
#     'host': 'localhost',
#     'user': '',
#     'password': '',
#     'database': '',
# }

# # Function to create a MySQL connection
# def create_connection():
#     connection = mysql.connector.connect(**mysql_config)
#     return connection

# # Route to handle the SQL query
# @app.route('/execute-query', methods=['GET'])
# def execute_query():
#     try:
#         connection = create_connection()
#         cursor = connection.cursor(dictionary=True)

#         query = "SELECT PlayerID as ID , PlayerName as Name FROM IPL where Type = 'Batsman';"
#         cursor.execute(query)
#         data = cursor.fetchall()

#         return jsonify(data)

#     except Exception as e:
#         return jsonify({'error': str(e)})

#     finally:
#         if connection.is_connected():
#             cursor.close()
#             connection.close()
            


# if __name__ == '__main__':
#     app.run(debug=True)
    
    
    
    
from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MySQL configuration
mysql_config = {
    'host': 'localhost',
    'user': '',
    'password': '',
    'database': '',
}

# Function to create a MySQL connection
def create_connection():
    connection = mysql.connector.connect(**mysql_config)
    return connection

# Route to handle the SQL query with category parameter
@app.route('/execute-query', methods=['GET'])
def execute_query():
    try:
        connection = create_connection()
        cursor = connection.cursor(dictionary=True)

        # Get the player category from the query parameters
        category = request.args.get('category', 'Batsman')

        # Using an f-string in the query
        if category=="Batsman":
            query = f"SELECT PlayerID as Batsman_ID, PlayerName as Name,Average,StrikeRate as Strike_Rate FROM IPL WHERE Type like '%{category}';"
        elif category=="Bowler":
            query = f"SELECT PlayerID as Bowler_ID, PlayerName as Name,BowlingAverage as Average,BowlingStrikeRate as Strike_Rate  FROM IPL WHERE Type like '%{category}';"
        elif category=="All Rounder":
            query = f"SELECT PlayerID as All_Rounder_ID, PlayerName as Name,Average as Batting_Average,StrikeRate as Batting_Strike_Rate,BowlingAverage as Bowling_Average,BowlingStrikeRate as Bowling_Strike_Rate FROM IPL WHERE Type like '%{category}';"
        elif category=="Batsman(w/k)":
            query = f"SELECT PlayerID as Wicket_Keeper_ID,PlayerName as Name,Average,StrikeRate as Strike_Rate FROM IPL WHERE Type like '%{category}';"

        cursor.execute(query)
        data = cursor.fetchall()

        return jsonify(data)

    except mysql.connector.Error as e:
        # Log the error for debugging purposes
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})

    except Exception as e:
        # Log the general exception for debugging purposes
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})

    finally:
        # Always close the cursor and connection
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == '__main__':
    app.run(debug=True)
