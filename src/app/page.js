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
    <main className="min-h-screen bg-gray-50">
      {/* Stanford brand color header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#8C1515] z-10"/>
      
      <div className="max-w-xl mx-auto px-4 py-20 md:px-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-4xl font-bold text-[#8C1515]">Stanford GPA Calculator</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">Calculate your projected GPA based on Stanford&apos;s 4.3 scale</p>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Current GPA (optional)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.3"
                  className="w-full p-2 border rounded text-base"
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
                  className="w-full p-2 border rounded text-base"
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
                      className="flex-1 p-2 border rounded text-base"
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
                      className="w-16 p-2 border rounded text-base"
                      value={course.units}
                      onChange={(e) => updateCourse(index, 'units', e.target.value)}
                      placeholder="Units"
                    />
                    <button
                      onClick={() => removeCourse(index)}
                      className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={addCourse}
              className="w-full py-3 bg-[#8C1515] text-white rounded hover:bg-[#6F1111] transition-colors text-base"
            >
              Add Course
            </button>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-xl font-medium text-center">
                Projected GPA: {calculateGPA()}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Attribution */}
      <div className="fixed bottom-4 right-4 text-sm text-gray-600 z-10">
        Made by Ahmad Zafar
      </div>
    </main>
  );
}
