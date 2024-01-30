import React from "react";

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ parts }) => {
  return (
    <div>
      <p>
        {parts.name} {parts.exercises}
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  const partSection = parts.map((element) => {
    return <Part key={element.id} parts={element} />;
  });

  return <div>{partSection}</div>;
};

const Total = ({ parts }) => {
  const exerciseAmount = parts.reduce((s, p) => s + p.exercises, 0);

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>Total of {exerciseAmount} exercises</p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
