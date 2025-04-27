import React, {useState} from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { CSVLink } from 'react-csv';

function FeedbackDashboard({feedbacks}) {
    const [sortOrder, setSortOrder] = useState('newest');
    const [filterCategory, setFilterCategory] = useState('All');

    const sortAndFilteredFeedbacks = feedbacks
        .filter(fb=>filterCategory === "All" || fb.category === filterCategory)
        .sort((a,b) =>{
            if(sortOrder === "newest"){
                return new Date(b.createdAt) - new Date(a.createdAt);
            }else{
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
        });

        const totalFeedback = feedbacks.length;

        const categoryCount = feedbacks.reduce((acc,fb)=>{
          acc[fb.category] = (acc[fb.category] || 0) +1;
          return acc;
        }, {});

        const pieData = [
          { name: 'Suggestion', value: categoryCount['Suggestion'] || 0 },
          { name: 'Bug Report', value: categoryCount['Bug Report'] || 0 },
          { name: 'Feature Request', value: categoryCount['Feature Request'] || 0 }
        ];

        const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

        const userCount = feedbacks.reduce((acc, fb) => {
          acc[fb.email] = (acc[fb.email] || 0) + 1;
          return acc;
        }, {});

        const mostActiveUser = Object.keys(userCount).sort((a, b) => userCount[b] - userCount[a])[0];

        const latestFeedbackDate = feedbacks.length > 0
          ? new Date(Math.max(...feedbacks.map(fb => new Date(fb.createdAt)))).toLocaleString()
          : "No feedback yet";

  return (
    <div style={{overflowX: 'auto'}}>
      <h2>Feedback Dashboard</h2>

      <div style={analyticsContainer}>
        <div style={analyticsCard}>
          <h4>Total Feedbacks</h4>
          <p>{totalFeedback}</p>
        </div>

        <div style={analyticsCard}>
          <h4>Most Active User</h4>
          <p>{mostActiveUser || "N/A"}</p>
        </div>

        <div style={analyticsCard}>
          <h4>Latest Feedback</h4>
          <p>{latestFeedbackDate}</p>
        </div>

        {/* CSV Download */}
        <div style={analyticsCard}>
          <CSVLink data={feedbacks} filename={"feedbacks.csv"} style={csvButton}>
            Download CSV
          </CSVLink>
        </div>
      </div>

      {/* Pie Chart */}
      <div style={{ marginBottom: '30px', marginTop: '30px', textAlign: 'center' }}>
        <h3>Feedback Category Distribution</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={selectStyle}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={selectStyle}>
          <option value="All">All Categories</option>
          <option value="Suggestion">Suggestion</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Feature Request">Feature Request</option>
        </select>
      </div>

      {sortAndFilteredFeedbacks.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        <table style={tableStyle}>
          <thead style={{background: '#f2f2f2'}}>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Feedback</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {sortAndFilteredFeedbacks.map((fb) => (
              <tr key={fb._id}>
                <td style={tdStyle}>{fb.name}</td>
                <td style={tdStyle}>{fb.email}</td>
                <td style={tdStyle}>{fb.feedbackText}</td>
                <td style={tdStyle}>{fb.category}</td>
                <td style={tdStyle}>{new Date(fb.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const analyticsContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
  marginBottom: '20px'
};

const analyticsCard = {
  flex: '1 1 200px',
  padding: '15px',
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  borderRadius: '8px',
  textAlign: 'center'
};

const csvButton = {
  display: 'inline-block',
  marginTop: '10px',
  padding: '10px 15px',
  backgroundColor: '#4CAF50',
  color: 'white',
  borderRadius: '5px',
  textDecoration: 'none',
  fontSize: '16px'
};

const selectStyle = {
    marginRight: '10px',
    padding: '8px',
    fontSize: '16px',
    marginBottom: '10px'
  };
  
  const tableStyle = {
    width: '100%',
    minWidth: '600px',   // 🎯 Force horizontal scroll if screen smaller
    borderCollapse: 'collapse'
  };
  
  const thStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left'
  };
  
  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd'
  };

export default FeedbackDashboard;
