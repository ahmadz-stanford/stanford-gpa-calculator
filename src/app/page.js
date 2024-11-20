'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [courses, setCourses] = useState([{ grade: 'A', units: 3 }]);
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
    setCourses([...courses, { grade: 'A', units: 3 }]);
  };

  const removeCourse = (index) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const updateCourse = (index, field, value) => {
    const newCourses = [...courses];
    if (field === 'units') {
      const numValue = parseInt(value) || 1;
      newCourses[index][field] = Math.min(Math.max(numValue, 1), 8);
    } else {
      newCourses[index][field] = value;
    }
    setCourses(newCourses);
  };

  if (!isClient) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Stanford brand color header */}
      <div className="sticky top-0 left-0 right-0 h-16 bg-[#8C1515] z-10 shadow-md"/>
      
      <div className="w-full max-w-xl mx-auto px-4 py-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-4xl font-bold text-[#8C1515] select-none">Stanford GPA Calculator</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base select-none">Calculate your projected GPA based on Stanford&apos;s 4.3 scale</p>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 select-none">Current GPA (optional)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min="0"
                  max="4.3"
                  className="w-full p-3 border rounded text-lg bg-white"
                  value={currentGPA}
                  onChange={(e) => setCurrentGPA(e.target.value)}
                  placeholder="Enter current GPA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 select-none">Total Units Completed</label>
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min="0"
                  className="w-full p-3 border rounded text-lg bg-white"
                  value={currentUnits}
                  onChange={(e) => setCurrentUnits(e.target.value)}
                  placeholder="Enter total units"
                />
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-medium mb-2 select-none">Planned Courses</h2>
              <div className="space-y-2">
                {courses.map((course, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <select
                      className="flex-1 p-3 border rounded text-lg bg-white"
                      value={course.grade}
                      onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                    >
                      {Object.keys(gradePoints).map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                    <select
                      className="w-24 p-3 border rounded text-lg bg-white"
                      value={course.units}
                      onChange={(e) => updateCourse(index, 'units', e.target.value)}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeCourse(index)}
                      className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded text-xl select-none"
                      aria-label="Remove course"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={addCourse}
              className="w-full py-3 bg-[#8C1515] text-white rounded hover:bg-[#6F1111] transition-colors text-lg font-medium select-none active:bg-[#5A0F0F]"
            >
              Add Course
            </button>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm">
              <div className="text-xl font-medium text-center select-none">
                Projected GPA: {calculateGPA()}
              </div>
            </div>
          </div>
        </div>
        
        {/* Attribution - moved inside the main container */}
        <div className="text-center mt-4 text-sm text-gray-600 select-none">
          Made by Ahmad Zafar
        </div>
      </div>
    </main>
  );
}
