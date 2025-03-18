// src/components/Recommendations.js
import React, { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';

const Recommendations = ({ recommendations }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (Array.isArray(recommendations) && recommendations.length > 0) {
      const exerciseTypes = recommendations.map(exercise => exercise?.type || 'Unknown');
      const exerciseDurations = recommendations.map(exercise => exercise?.duration || 0);

      const typeCounts = exerciseTypes.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        pieChart: {
          labels: Object.keys(typeCounts),
          datasets: [{
            data: Object.values(typeCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        },
        barChart: {
          labels: recommendations.map((_, index) => `Exercise ${index + 1}`),
          datasets: [{
            label: 'Duration (mins)',
            data: exerciseDurations,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        }
      });
    }
  }, [recommendations]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Fitness Recommendations', 10, 10);

    if (Array.isArray(recommendations) && recommendations.length > 0) {
      recommendations.forEach((exercise, index) => {
        doc.text(
          `Exercise ${index + 1}: ${exercise?.name || 'Unknown'} - ${exercise?.type || 'Unknown'} - ${exercise?.duration || 0} mins`,
          10,
          20 + (index * 10)
        );
      });
    } else {
      doc.text('No recommendations available.', 10, 20);
    }

    doc.save('recommendations.pdf');
  };

  return (
    <div>
      <h2>Recommended Exercises</h2>
      {Array.isArray(recommendations) && recommendations.length > 0 ? (
        <ul>
          {recommendations.map((exercise, index) => (
            <li key={index}>
              {exercise?.name || 'Unknown'} - {exercise?.type || 'Unknown'} - {exercise?.duration || 0} mins
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available.</p>
      )}

      {chartData && (
        <>
          <h3>Exercise Type Distribution</h3>
          <Pie data={chartData.pieChart} />
          <h3>Exercise Durations</h3>
          <Bar data={chartData.barChart} />
        </>
      )}

      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default Recommendations;
