from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

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
