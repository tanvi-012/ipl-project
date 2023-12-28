from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
from flask_socketio import SocketIO
from pulp import *
import warnings
import pandas as pd
warnings.filterwarnings('always')
warnings.filterwarnings('ignore')

import json
from decimal import Decimal

from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

from pulp import *
import warnings
import pandas as pd

warnings.filterwarnings('always')
warnings.filterwarnings('ignore')

import json
from decimal import Decimal

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")


constraints_csk = ["hgi_csk", [2, 4], [0, 2], [1, 4], [0, 1], [0, 1], [0, 3], [1, 3], [0, 6], [0, 3140], [0, 2]]

# MySQL configuration
mysql_config = {
    'host': 'localhost',
    'user': 'harsh',
    'password': '7hH#541278',
    'database': 'IPL data',
}

# Function to create a MySQL connection
def create_connection():
    connection = mysql.connector.connect(**mysql_config)
    return connection

##################### SHOWING DIFFERENT CATEGORIES PLAYERS ON ADMIN PAGE ###################################

# Route to handle the SQL query with category parameter
@app.route('/execute_query', methods=['GET'])
def execute_query():
    try:
        connection = create_connection()
        cursor = connection.cursor(dictionary=True)

        # Get the player category from the query parameters
        category = request.args.get('category', 'Batsman')

        query_unsold = ""

        # Using an f-string in the query
        if category == "Batsman":
            query_unsold = f"SELECT Player_id,Name,Total_Runs,Overall_Avg as Average,Overall_Strike_rate as Strike_Rate FROM Player_Details where Batsman=1;"
        elif category == "Bowler":
            query_unsold = f"SELECT Player_id ,Name,Total_wick as Total_Wickets, bowling_average as Average,economy as Economy FROM Player_Details WHERE Bowler=1;"
        elif category == "All Rounder":
            query_unsold = f"SELECT Player_id,Name,Total_Runs,Overall_Avg as Batting_Average,Overall_Strike_rate as Batting_Strike_Rate,Total_wick as Total_Wickets,bowling_average as Bowling_Average,economy as Economy FROM Player_Details where Allrounder=1;"
        elif category == "Batsman(w/k)":
            query_unsold = f"SELECT Player_id,Name,Total_Runs, Overall_Avg as Average,Overall_Strike_rate as Strike_Rate FROM Player_Details WHERE wicket_keeper=1;"

        cursor.execute(query_unsold)
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

connection = create_connection()
cursor = connection.cursor(dictionary=True)

#################################### GETTING BASE PRICE OF EACH PLAYER FROM PLAYER ID #############################3

@app.route('/get_bid_amount', methods=['GET'])
def get_bid_amount():
    try:
        # Get player_id from the query parameters
        player_id = int(request.args.get('player_id', 162))

        # Establish a database connection
        connection = mysql.connector.connect(**mysql_config)

        # Create a cursor
        cursor = connection.cursor()

        # Use a parameterized query to fetch the bid amount for the specified player_id
        query = "SELECT min_price,max_price FROM Player_Details WHERE Player_id = %s"
        cursor.execute(query, (player_id,))

        # Fetch the result
        bid_amount = cursor.fetchone()

        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        if bid_amount is not None:
            return jsonify({"min bid_amount": bid_amount[0],
                            "max bid_amount": bid_amount[1]})
        else:
            return jsonify({"error": "Bid amount not found for the specified player_id"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

######################################## GETTING THE REMAINING PURSE FOR THE TEAM #################################

@app.route('/user/getpurse', methods=["GET"])
def user_getpurse_model():
    try:
        # Assuming the team information is in the JSON form in the request body
        request_data = request.json
        team_name = request_data.get('team')

        if not team_name:
            return jsonify({"error": "Team name not provided"}), 400

        # Establish a database connection
        connection = mysql.connector.connect(**mysql_config)

        # Create a cursor
        cursor = connection.cursor()

        query = "SELECT COALESCE(10000 - SUM(Price), 10000) AS remaining_purse FROM Retained_Players WHERE Team = %s GROUP BY Team"
        cursor.execute(query, (team_name,))
        result = cursor.fetchone()

        cursor.close()
        connection.close()

        if result:
            result_dict = {'remaining_purse': float(result[0])}
            return jsonify(result_dict)
        else:
            return jsonify({"error": "Remaining purse not found for the specified team"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

######################################### PUTTING PLAYER INFORMATION IN THE RETAINED TABLE ############################

@app.route('/player_data_post', methods=['POST'])
def handle_post_request():
    try:
        # Check if the request has JSON data
        if not request.json:
            return jsonify({'error': 'Invalid JSON format'}), 400

        # Get data from the request JSON
        data = request.json

        # Perform operations with the received data
        # ...
        cursor.execute("INSERT INTO Retained(`Player Name`, Team, Price) VALUES (%s, %s, %s)",
                       (data.get('name'), data.get('team'), data.get('price')))
        connection.commit()

        return jsonify({'success': 'Data added successfully'})

    except Exception as e:
        # Log the error for debugging purposes
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})

    finally:
        # Always close the cursor and connection
        if connection.is_connected():
            cursor.close()
            connection.close()


@socketio.on('running')
def handle_start(running):
    socketio.emit('running',running)
    print('Running:',running)

@socketio.on('category')
def set_category(category):
    socketio.emit('category',category)
    print('Category:',category)

@socketio.on('data')
def set_data(data):
    socketio.emit('data',data)
    print('Data:',data)

@socketio.on('index')
def set_data(index):
    socketio.emit('index',index)
    print('Index:',index)

if __name__ == '__main__':
    socketio.run(app,debug=True)
