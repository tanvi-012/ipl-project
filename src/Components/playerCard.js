import React from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody } from 'mdb-react-ui-kit';


const PlayerCard = ({ data, currentIndex, selectedCategory, isCardVisible,allPlayersFinished }) => {
  const getCategoryName = (category) => {
    if (category === "Batsman(w/k)") {
      return "Wicket Keeper";
    }
    return category;
  };

  const displayPlayerStats = () => {
    if (!data || data.length === 0 || currentIndex >= data.length) {
      return null;
    }

    const categoryKeyOrders = {
      Batsman: ["Player_id", "Name", "Average", "Strike_Rate"],
      Bowler: ["Player_id", "Name", "Average", "Economy"],
      'All Rounder': ["Player_id", 'Name', 'Batting_Average', 'Batting_Strike_Rate', 'Bowling_Average', 'Economy'],
      'Batsman(w/k)': ['Player_id', 'Name', 'Average', 'Strike_Rate']
      // Add other categories and their respective key orders as needed
    };
    const keyOrder = categoryKeyOrders[selectedCategory] || [];

    return keyOrder.map((key) => (
      <tr key={key}>
        <td style={{ color: 'blue', fontWeight: 'bold' }}>{key}</td>
        <td style={{ color: 'red', fontWeight: 'bold' }}>:</td>
        <td style={{ color: 'green' }}>{data[currentIndex][key]}</td>
      </tr>
    ));
  };

  return (
    <>
      {isCardVisible && (
        <MDBCard style={{ width: '400px', alignItems: 'center', margin: '0 auto' }}>
          <MDBCardHeader style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '0px' }}>
            {getCategoryName(selectedCategory)}
          </MDBCardHeader>
          <MDBCardBody style={{ padding:'7px' }}>
            <table>
              <tbody>
                {displayPlayerStats()}
              </tbody>
            </table>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
            </div>
          </MDBCardBody>
        </MDBCard>
      )}
      {allPlayersFinished && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', background: 'white', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
          <p>All players in the {getCategoryName(selectedCategory)} category have been displayed!</p>
        </div>
      )}
    </>
  );
};

export default PlayerCard;