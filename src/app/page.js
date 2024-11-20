'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [courses, setCourses] = useState([{ grade: 'A', units: 4 }]);
  const [currentGPA, setCurrentGPA] = useState('');
  const [currentUnits, setCurrentUnits] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const gradePoints = {
    'A+': 4.3, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'NP': 0.0
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalUnits = 0;

    courses.forEach(course => {
      const points = gradePoints[course.grade] * course.units;
      totalPoints += points;
      totalUnits += course.units;
    });

    if (currentGPA && currentUnits) {
      totalPoints += parseFloat(currentGPA) * parseFloat(currentUnits);
      totalUnits += parseFloat(currentUnits);
    }

    return totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : '0.00';
  };

  const addCourse = () => {
    setCourses([...courses, { grade: 'A', units: 4 }]);
  };

  const removeCourse = (index) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const updateCourse = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = field === 'units' ? parseInt(value) || 0 : value;
    setCourses(newCourses);
  };

  if (!isClient) {
    return null;
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50 relative">
      {/* Stanford brand color header */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-[#8C1515]"/>
      
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg relative mt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#8C1515]">Stanford GPA Calculator</h1>
          <p className="text-gray-600 mt-2">Calculate your projected GPA based on Stanford's 4.3 scale</p>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Current GPA (optional)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4.3"
                className="w-full p-2 border rounded"
                value={currentGPA}
                onChange={(e) => setCurrentGPA(e.target.value)}
                placeholder="Enter current GPA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Units Completed</label>
              <input
                type="number"
                min="0"
                className="w-full p-2 border rounded"
                value={currentUnits}
                onChange={(e) => setCurrentUnits(e.target.value)}
                placeholder="Enter total units"
              />
            </div>
          </div>

          <div>
            <h2 className="font-medium mb-2">Planned Courses</h2>
            <div className="space-y-2">
              {courses.map((course, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <select
                    className="p-2 border rounded flex-1"
                    value={course.grade}
                    onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                  >
                    {Object.keys(gradePoints).map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    className="p-2 border rounded w-20"
                    value={course.units}
                    onChange={(e) => updateCourse(index, 'units', e.target.value)}
                    placeholder="Units"
                  />
                  <button
                    onClick={() => removeCourse(index)}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={addCourse}
            className="w-full py-2 bg-[#8C1515] text-white rounded hover:bg-[#6F1111] transition-colors"
          >
            Add Course
          </button>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-xl font-medium text-center">
              Projected GPA: {calculateGPA()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Attribution */}
      <div className="fixed bottom-4 right-4 text-sm text-gray-600">
        Made by Ahmad Zafar, Stanford Class of 2027
      </div>
    </main>
  );
}
