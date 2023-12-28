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

# MySQL configuration
mysql_config = {
    'host': 'database-1.cr4mmkg8q4oy.ap-south-1.rds.amazonaws.com',
    'user': 'admin',
    'password': 'Awsrds2002',
    'database': 'IPL_DATA'
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
 
        query_unsold=""

 # Using an f-string in the query
        if category=="Batsman":
            query_unsold = f"SELECT Player_id,Name,Total_Runs,Overall_Avg as Average,Overall_Strike_rate as Strike_Rate FROM Player_Details where Batsman=1;"
        elif category=="Bowler":
            query_unsold = f"SELECT Player_id ,Name,Total_wick as Total_Wickets, bowling_average as Average,economy as Economy FROM Player_Details WHERE Bowler=1;"
        elif category=="All Rounder":
            query_unsold = f"SELECT Player_id,Name,Total_Runs,Overall_Avg as Batting_Average,Overall_Strike_rate as Batting_Strike_Rate,Total_wick as Total_Wickets,bowling_average as Bowling_Average,economy as Economy FROM Player_Details where Allrounder=1;"
        elif category=="Batsman(w/k)":
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
        player_id = int(request.args.get('player_id',162))

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
        cursor.execute("INSERT INTO Retained(`Player Name`, Team, Price) VALUES (%s, %s, %s)",(data.get('name'), data.get('team'), data.get('price')))

        # Commit changes to the database
        connection.commit()

        # Return a response (this is just an example)
        response_data = {'message': 'Data posted successfully'}
        return jsonify(response_data), 200

    except Exception as e:
        print('Error handling POST request:', str(e))
        # Handle errors and return an appropriate response
        return jsonify({'error': 'Internal Server Error'}), 500
 
 ###################################### DELETING THE PLAYER DATA FROM THE MAIN DATABASE ##################################
 
@app.route('/player_data_delete', methods=['DELETE'])
def handle_delete_request():
    try:
    # Get the player ID from the request parameters
        player_id = request.args.get('id')

        # Perform the delete operation in the database
        # Replace 'YourTable' with the actual name of your table
        # Replace 'player_id_column' with the actual column name for player ID
        # ...
        cursor.execute("DELETE FROM IPL WHERE PlayerId = %s", (player_id,))
        # Commit the changes to the database
        connection.commit()

    # Return a success message
        return jsonify({'message': 'Data deleted successfully'}), 200

    except Exception as e:
        print('Error handling DELETE request:', str(e))
        # Handle errors and return an appropriate response
        return jsonify({'error': 'Internal Server Error'}), 500
        
 
######################################## UPDATING THE CONSTRAINTS ##################################################### 
 
# @app.route('/update_constraints',methods=['POST'])
# def final_solver():
# try:
# # Check if the request has JSON data
# if not request.json:
# return jsonify({'error': 'Invalid JSON format'}), 400

# # Get data from the request JSON
# data = request.json
# player_name=data.get('player_name')
# price = data.get('price')
# team_sold=data.get('team_sold')
 
# if team_sold=="Chennai Super Kings":
# constraints_csk=update_constraints(player_name, price, constraints_csk)
 
# elif team_sold=="Mumbai Indians":
# constraints_mi=update_constraints(player_name, price, constraints_mi)
 
# elif team_sold=="Rajasthan Royals":
# constraints_rr=update_constraints(player_name, price, constraints_rr)

# elif team_sold=="Gujarat Titans":
# constraints_gt=update_constraints(player_name, price, constraints_gt)

# elif team_sold=="Royal Challengers Bangalore":
# constraints_rcb=update_constraints(player_name, price, constraints_rcb)

# elif team_sold=="Delhi Capitals":
# constraints_dc=update_constraints(player_name, price, constraints_dc)

# elif team_sold=="Lucknow Super Giants":
# constraints_lsg=update_constraints(player_name, price, constraints_lsg)

# elif team_sold=="Kolkata Knight Riders":
# constraints_kkr=update_constraints(player_name, price, constraints_kkr)
 
# elif team_sold=="Punjab Kings":
# constraints_pk=update_constraints(player_name, price, constraints_pk)
 
# elif team_sold=="Sunrisers Hyderabad":
# constraints_srh=update_constraints(player_name, price, constraints_srh)
 
# response_data = {'message': 'Data posted successfully'}
# return jsonify(response_data), 200
 
# except Exception as e:
# print('Error handling POST request:', str(e))
# # Handle errors and return an appropriate response
# return jsonify({'error': 'Internal Server Error'}), 500


def give_team(df,constraints):
    team=[]
    #variables
    min_batsmentobuy=constraints[1][0]
    max_batsmentobuy=constraints[1][1]
    min_bowlerstobuy=constraints[2][0]
    max_bowlerstobuy=constraints[2][1]
    min_artobuy=constraints[3][0]
    max_artobuy=constraints[3][1]
    min_spinnertobuy=constraints[4][0]
    max_spinnertobuy=constraints[4][1]
    min_pacertobuy=constraints[5][0]
    max_pacertobuy=constraints[5][1]
    min_foreigners=constraints[6][0]
    max_foreigners=constraints[6][1]
    min_wktobuy=constraints[7][0]
    max_wktobuy=constraints[7][1]
    min_playerstobuy=constraints[8][0]
    max_playerstobuy=constraints[8][1]
    min_budget=constraints[9][0]
    max_budget=constraints[9][1]
    min_hg=constraints[10][0]
    max_hg=constraints[10][1]
    prob = LpProblem('IPL', LpMaximize)
    players = list(df['Name'])
    #len(players)
    # Make Dictionaries of all columns
    costs = dict(zip(players,df['max_price']))
    bat_runs=dict(zip(players,df['Bat_runs']))
    bat_avg=dict(zip(players,df['Bat_avg']))
    bat_SR=dict(zip(players,df['Bat_SR']))
    bat_YN=dict(zip(players,df['Batsman']))
    spin_YN=dict(zip(players,df['Spinner']))
    pace_YN=dict(zip(players,df['Pacer']))
    bowl_wkts=dict(zip(players,df['Wkts_x']))
    bowl_avg=dict(zip(players,df['Bowl_avg']))
    bowl_eco=dict(zip(players,df['Bowl_eco']))
    bowl_YN=dict(zip(players,df['Bowler']))
    all_YN=dict(zip(players,df['Allrounder']))
    wk_YN=dict(zip(players,df['wicket_keeper']))
    foreign_YN = dict(zip(players,df['Foreigner']))
    home_ground = dict(zip(players,df[constraints[0]]))
    # objective function
    df['ob']=df['Bat_runs']+df['Bat_avg']+df['Bat_SR']+df['Bowl_eco']+df['Bowl_avg']+df['Wkts_x']
    fn=dict(zip(players,df['ob']))
    players_chosen = LpVariable.dicts("Chosen",players,0,1,cat='Integer')
    prob += lpSum([fn[i]*players_chosen[i] for i in players])
    prob += lpSum([costs[f] * players_chosen[f] for f in players]) >= min_budget, "costs_min"
    prob += lpSum([costs[f] * players_chosen[f] for f in players]) <= max_budget, "costs_max"
    prob += lpSum([players_chosen[f] for f in players]) >= min_playerstobuy, "team_min"
    prob += lpSum([players_chosen[f] for f in players]) <= max_playerstobuy, "team_max"
    prob += lpSum([bat_YN[f] * players_chosen[f] for f in players]) >= min_batsmentobuy, "bat_min"
    prob += lpSum([bat_YN[f] * players_chosen[f] for f in players]) <= max_batsmentobuy, "bat_max"
    prob += lpSum([bowl_YN[f] * players_chosen[f] for f in players]) >= min_bowlerstobuy, "bowl_min"
    prob += lpSum([bowl_YN[f] * players_chosen[f] for f in players]) <= max_bowlerstobuy, "bowl_max"
    prob += lpSum([all_YN[f] * players_chosen[f] for f in players]) >= min_artobuy, "ar_min"
    prob += lpSum([all_YN[f] * players_chosen[f] for f in players]) <= max_artobuy, "ar_max"
    prob += lpSum([wk_YN[f] * players_chosen[f] for f in players]) >= min_wktobuy, "wk_min"
    prob += lpSum([wk_YN[f] * players_chosen[f] for f in players]) <= max_wktobuy, "wk_max"
    prob += lpSum([spin_YN[f] * players_chosen[f] for f in players]) >= min_spinnertobuy, "spin_min"
    prob += lpSum([spin_YN[f] * players_chosen[f] for f in players]) <= max_spinnertobuy, "spin_max"
    prob += lpSum([pace_YN[f] * players_chosen[f] for f in players]) >= min_pacertobuy, "pace_min"
    prob += lpSum([pace_YN[f] * players_chosen[f] for f in players]) <= max_pacertobuy, "pace_max"
    prob += lpSum([foreign_YN[f] * players_chosen[f] for f in players]) >= min_foreigners, "foreign_min"
    prob += lpSum([foreign_YN[f] * players_chosen[f] for f in players]) <= max_foreigners, "foreign_max"
    prob += lpSum([home_ground[f] * players_chosen[f] for f in players]) >= min_hg, "home_ground_min"
    prob += lpSum([home_ground[f] * players_chosen[f] for f in players]) <= max_hg, "home_ground_max"
    prob.writeLP("TS.lp")
    prob.solve()
    #print("Status:", LpStatus[prob.status])
    count=0
    for v in prob.variables():
        if v.varValue>0 and v.name[0]=='C':
            team.append(v.name[7:])
    #print(team)
    #print(v.name, "=", v.varValue)
            count+=1
    #print(count)
    return team

# Function to solve LP problem and give team based on constraints
'''
0-hgi team string
1-Batsmen
2-Bowler
3-All rounder
4-Spinner
5-Pacer
6-Overseas
7-Wicket keeper
8-squad
9-Purse left
10-home ground
'''
#template ["hgi_team",[2,4],[0,2],[1,4],[0,1],[0,1],[0,3],[1,3],[0,6],[0,3140],[0,2]]
constraints_csk = ["hgi_csk",[2,4],[0,2],[1,4],[0,1],[0,1],[0,3],[1,3],[0,6],[0,3140],[0,2]]
constraints_dc = ["hgi_dc",[2,4],[1,3],[3,6],[0,2],[1,3],[1,5],[0,2],[2,9],[0,2895],[0,2]]
constraints_gt = ["hgi_gt",[1,3],[2,4],[1,4],[0,1],[1,3],[0,2],[0,2],[0,7],[0,2315],[0,2]]
constraints_kkr = ["hgi_kkr",[3,5],[5,7],[1,4],[0,1],[4,6],[0,4],[1,3],[5,12],[0,3270],[0,2]]
constraints_lsg = ["hgi_lsg",[1,3],[3,5],[0,2],[0,0],[1,3],[0,3],[0,0],[0,6],[0,1315],[0,2]]
constraints_mi = ["hgi_mi",[0,2],[3,5],[2,5],[0,3],[1,3],[0,3],[0,2],[1,8],[0,1575],[0,2]]
constraints_pk = ["hgi_pk",[1,3],[4,6],[0,3],[0,2],[1,3],[0,2],[0,1],[1,8],[0,2910],[0,2]]
constraints_rr = ["hgi_rr",[1,3],[1,3],[3,6],[0,2],[1,3],[0,3],[0,0],[1,8],[0,1450],[0,2]]
constraints_rcb = ["hgi_rcb",[1,3],[2,4],[1,4],[0,1],[1,3],[0,4],[0,2],[0,7],[0,4125],[0,2]]
constraints_srh = ["hgi_srh",[0,2],[2,4],[1,4],[0,0],[2,4],[0,3],[0,0],[0,6],[0,3640],[0,2]]


def update_constraints(player_name, price,constraints_team,selected,df2):
    if player_name in selected:
        if constraints_team[8][0]>0: constraints_team[8][0]-=1 # min_players_to_buy_constraint
        if constraints_team[8][1]>0: constraints_team[8][1]-=1 # max_players_to_buy_constraint
        if constraints_team[9][1]>0: constraints_team[9][1]-=price # max_budget_constraint
        search_row = df2[df2["Name"]==player_name]
        if int(search_row["Batsman"].values[0])==1:
            if constraints_team[1][0] > 0: constraints_team[1][0]-=1
            if constraints_team[1][1] > 0: constraints_team[1][1]-=1
        if int(search_row["Bowler"])==1:
            if constraints_team[2][0] > 0: constraints_team[2][0]-=1
            if constraints_team[2][1] > 0: constraints_team[2][1]-=1
        if int(search_row["Allrounder"])==1:
            if constraints_team[3][0] > 0: constraints_team[3][0]-=1
            if constraints_team[3][1] > 0: constraints_team[3][1]-=1
        if int(search_row["Spinner"])==1:
            if constraints_team[4][0] > 0: constraints_team[4][0]-=1
            if constraints_team[4][1] > 0: constraints_team[4][1]-=1
        if int(search_row["Pacer"])==1:
            if constraints_team[5][0] > 0: constraints_team[5][0]-=1
            if constraints_team[5][1] > 0: constraints_team[5][1]-=1
        if int(search_row["Foreigner"])==1:
            if constraints_team[6][0] > 0: constraints_team[6][0]-=1
            if constraints_team[6][1] > 0: constraints_team[6][1]-=1
        if int(search_row["wicket_keeper"])==1:
            if constraints_team[7][0] > 0: constraints_team[7][0]-=1
            if constraints_team[7][1] > 0: constraints_team[7][1]-=1
        if int(search_row[constraints_team[0]])==1:
            if constraints_team[10][0] > 0: constraints_team[10][0]-=1
            if constraints_team[10][1] > 0: constraints_team[10][1]-=1 
            return constraints_team
 


connection = create_connection()
cursor = connection.cursor(dictionary=True)
query="select * from Player_Details;"
cursor.execute(query)
table_rows=cursor.fetchall()
df = pd.DataFrame(table_rows)
df["Name"]=df["Name"].str.replace(' ','_')
 #print(df.head(7))
selected=give_team(df,constraints_csk)
print(selected)
 
@app.route('/update_constraints', methods=['POST'])
def final_solver():
    try:
        if not request.json:
            return jsonify({'error': 'Invalid JSON format'}), 400

        data = request.json
        player_name = data.get('player_name').replace(' ', '_')
        price = data.get('price')
        team_sold = data.get('team_sold')

        global constraints_csk, constraints_mi, constraints_rr, constraints_gt, constraints_rcb, constraints_dc, constraints_lsg, constraints_kkr, constraints_pk, constraints_srh, df, selected

        if team_sold == "Chennai Super Kings":
            constraints_csk = update_constraints(player_name, price, constraints_csk, selected, df)
            print(constraints_csk)
        elif team_sold == "Mumbai Indians":
            constraints_mi = update_constraints(player_name, price, constraints_mi, selected, df)
        elif team_sold == "Rajasthan Royals":
            constraints_rr = update_constraints(player_name, price, constraints_rr, selected, df)
        elif team_sold == "Gujarat Titans":
            constraints_gt = update_constraints(player_name, price, constraints_gt, selected, df)
        elif team_sold == "Royal Challengers Bangalore":
            constraints_rcb = update_constraints(player_name, price, constraints_rcb, selected, df)
        elif team_sold == "Delhi Capitals":
            constraints_dc = update_constraints(player_name, price, constraints_dc, selected, df)
        elif team_sold == "Lucknow Super Giants":
            constraints_lsg = update_constraints(player_name, price, constraints_lsg, selected, df)
        elif team_sold == "Kolkata Knight Riders":
            constraints_kkr = update_constraints(player_name, price, constraints_kkr, selected, df)
        elif team_sold == "Punjab Kings":
            constraints_pk = update_constraints(player_name, price, constraints_pk, selected, df)
        elif team_sold == "Sunrisers Hyderabad":
            constraints_srh = update_constraints(player_name, price, constraints_srh, selected, df)

        response_data = {'message': 'Data posted successfully'}
        return jsonify(response_data), 200

    except Exception as e:
        print('Error handling POST request:', str(e))
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/team/csk', methods=['GET'])
def team_query():
    global connection # Add global declaration to access the connection variable
    connection = None # Initialize connection variable outside the try block
    try:
        connection = create_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM Player_Details;"
        cursor.execute(query)
        table_rows = cursor.fetchall()
        df = pd.DataFrame(table_rows)
        selected = give_team(df, constraints_csk)
        return jsonify(selected)
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    finally:
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()
 
@app.route('/team/rcb', methods=['GET'])
def team_query1():
    global connection # Add global declaration to access the connection variable
    connection = None # Initialize connection variable outside the try block
    try:
        connection = create_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM Player_Details;"
        cursor.execute(query)
        table_rows = cursor.fetchall()
        df = pd.DataFrame(table_rows)
        selected = give_team(df, constraints_rcb)
        return jsonify(selected)
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    finally:
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()
 
@app.route('/team/dc', methods=['GET'])
def team_query2():
    global connection # Add global declaration to access the connection variable
    connection = None # Initialize connection variable outside the try block
    try:
        connection = create_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM Player_Details;"
        cursor.execute(query)
        table_rows = cursor.fetchall()
        df = pd.DataFrame(table_rows)
        selected = give_team(df, constraints_dc)
        return jsonify(selected)
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    finally:
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()
 
@app.route('/team/rr', methods=['GET'])
def team_query3():
    global connection # Add global declaration to access the connection variable
    connection = None # Initialize connection variable outside the try block
    try:
        connection = create_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM Player_Details;"
        cursor.execute(query)
        table_rows = cursor.fetchall()
        df = pd.DataFrame(table_rows)
        selected = give_team(df, constraints_rr)
        return jsonify(selected)
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    finally:
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/team/gt', methods=['GET'])
def team_query4():
    global connection # Add global declaration to access the connection variable
    connection = None # Initialize connection variable outside the try block
    try:
        connection = create_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM Player_Details;"
        cursor.execute(query)
        table_rows = cursor.fetchall()
        df = pd.DataFrame(table_rows)
        selected = give_team(df, constraints_gt)
        return jsonify(selected)
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    finally:
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()
    
@app.route('/team/lsg', methods=['GET'])
def team_query5():
    global connection # Add global declaration to access the connection variable
    connection = None # Initialize connection variable outside the try block
    try:
        connection = create_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM Player_Details;"
        cursor.execute(query)
        table_rows = cursor.fetchall()
        df = pd.DataFrame(table_rows)
        selected = give_team(df, constraints_lsg)
        return jsonify(selected)
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    finally:
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()
 
@app.route('/team/srh', methods=['GET'])
def team_query6():
    global connection # Add global declaration to access the connection variable
    connection = None # Initialize connection variable outside the try block
    try:
        connection = create_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM Player_Details;"
        cursor.execute(query)
        table_rows = cursor.fetchall()
        df = pd.DataFrame(table_rows)
        selected = give_team(df, constraints_srh)
        return jsonify(selected)
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    finally:
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()
 
@app.route('/team/pk', methods=['GET'])
def team_query7():
    global connection # Add global declaration to access the connection variable
    connection = None # Initialize connection variable outside the try block
    try:
        connection = create_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM Player_Details;"
        cursor.execute(query)
        table_rows = cursor.fetchall()
        df = pd.DataFrame(table_rows)
        selected = give_team(df, constraints_pk)
        return jsonify(selected)
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    finally:
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()
 
@app.route('/team/mi', methods=['GET'])
def team_query8():
    global connection # Add global declaration to access the connection variable
    connection = None # Initialize connection variable outside the try block
    try:
        connection = create_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM Player_Details;"
        cursor.execute(query)
        table_rows = cursor.fetchall()
        df = pd.DataFrame(table_rows)
        selected = give_team(df, constraints_mi)
        return jsonify(selected)
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    finally:
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()
 
@app.route('/team/kkr', methods=['GET'])
def team_query9():
    global connection # Add global declaration to access the connection variable
    connection = None # Initialize connection variable outside the try block
    try:
        connection = create_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM Player_Details;"
        cursor.execute(query)
        table_rows = cursor.fetchall()
        df = pd.DataFrame(table_rows)
        selected = give_team(df, constraints_kkr)
        return jsonify(selected)
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'})
    finally:
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()
    
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/user/selectedteam/csk', methods=["GET"])
def user_selectedteam_model():
    try:
        connection = create_connection() # Establish connection using create_connection()
        cursor = connection.cursor()
        query = "SELECT `Player Name` FROM Retained_Players WHERE Team = 'Chennai Super Kings'"
        cursor.execute(query)
        result = cursor.fetchall()
        return jsonify({'players': result})
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
 
@app.route('/user/selectedteam/dc', methods=["GET"])
def user_selectedteam_model1():
    try:
        connection = create_connection() # Establish connection using create_connection()
        cursor = connection.cursor()
        query = "SELECT `Player Name` FROM Retained_Players WHERE Team = 'Delhi Capitals'"
        cursor.execute(query)
        result = cursor.fetchall()
        return jsonify({'players': result})
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
 
@app.route('/user/selectedteam/gt', methods=["GET"])
def user_selectedteam_model166():
    try:
        connection = create_connection() # Establish connection using create_connection()
        cursor = connection.cursor()
        query = "SELECT `Player Name` FROM Retained_Players WHERE Team = 'Gujarat Titans'"
        cursor.execute(query)
        result = cursor.fetchall()
        return jsonify({'players': result})
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
 
@app.route('/user/selectedteam/kkr', methods=["GET"])
def user_selectedteam_model12():
    try:
        connection = create_connection() # Establish connection using create_connection()
        cursor = connection.cursor()
        query = "SELECT `Player Name` FROM Retained_Players WHERE Team = 'Kolkata Knight Riders'"
        cursor.execute(query)
        result = cursor.fetchall()
        return jsonify({'players': result})
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
 
@app.route('/user/selectedteam/lsg', methods=["GET"])
def user_selectedteam_model13():
    try:
        connection = create_connection() # Establish connection using create_connection()
        cursor = connection.cursor()
        query = "SELECT `Player Name` FROM Retained_Players WHERE Team = 'Lucknow Super Giants'"
        cursor.execute(query)
        result = cursor.fetchall()
        return jsonify({'players': result})
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
 
@app.route('/user/selectedteam/mi', methods=["GET"])
def user_selectedteam_model14():
    try:
        connection = create_connection() # Establish connection using create_connection()
        cursor = connection.cursor()
        query = "SELECT `Player Name` FROM Retained_Players WHERE Team = 'Mumbai Indians'"
        cursor.execute(query)
        result = cursor.fetchall()
        return jsonify({'players': result})
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/user/selectedteam/pk', methods=["GET"])
def user_selectedteam_model15():
    try:
        connection = create_connection() # Establish connection using create_connection()
        cursor = connection.cursor()
        query = "SELECT `Player Name` FROM Retained_Players WHERE Team = 'Punjab Kings'"
        cursor.execute(query)
        result = cursor.fetchall()
        return jsonify({'players': result})
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
 
@app.route('/user/selectedteam/rcb', methods=["GET"])
def user_selectedteam_model16():
    try:
        connection = create_connection() # Establish connection using create_connection()
        cursor = connection.cursor()
        query = "SELECT `Player Name` FROM Retained_Players WHERE Team = 'Royal Challengers Bangalore'"
        cursor.execute(query)
        result = cursor.fetchall()
        return jsonify({'players': result})
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
 
@app.route('/user/selectedteam/rr', methods=["GET"])
def user_selectedteam_model17():
    try:
        connection = create_connection() # Establish connection using create_connection()
        cursor = connection.cursor()
        query = "SELECT `Player Name` FROM Retained_Players WHERE Team = 'Rajasthan Royals'"
        cursor.execute(query)
        result = cursor.fetchall()
        return jsonify({'players': result})
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
 
@app.route('/user/selectedteam/srh', methods=["GET"])
def user_selectedteam_model18():
    try:
        connection = create_connection() # Establish connection using create_connection()
        cursor = connection.cursor()
        query = "SELECT `Player Name` FROM Retained_Players WHERE Team = 'Sunrisers Hyderabad'"
        cursor.execute(query)
        result = cursor.fetchall()
        return jsonify({'players': result})
    except mysql.connector.Error as e:
        print(f"MySQL Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500


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
