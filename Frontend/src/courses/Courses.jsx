// import React from "react";
// import Navbar from "../components/Navbar";
// import Course from "../components/Course";
// import Footer from "../components/Footer";
// function Courses() {
//   return (
//     <>
//       <Navbar />
//       <div className=" min-h-screen">
//         <Course />
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Courses;
import React, { useEffect, useState } from "react";

function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/book`) // use env variable
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch courses");
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading courses...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg">{course.title}</h2>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Course;
