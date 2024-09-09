const subjects = [
  { code: 'BTA01', name: 'Biology and Environmental Science for Engineers' },
  { code: 'CSA02', name: 'C Programming' },
  { code: 'CSA03', name: 'Data Structure' },
  { code: 'CSA04', name: 'Operating Systems' },
  { code: 'CSA05', name: 'Database Management Systems' },
  { code: 'CSA06', name: 'Design and Analysis Algorithm' },
  { code: 'CSA07', name: 'Computer Networks' },
  { code: 'CSA08', name: 'Python Programming' },
  { code: 'CSA09', name: 'Programming in Java' },
  { code: 'CSA10', name: 'Software Engineering' },
  { code: 'CSA11', name: 'Object Oriented Analysis and Design' },
  { code: 'CSA12', name: 'Computer Architecture' },
  { code: 'CSA13', name: 'Theory of Computation' },
  { code: 'CSA14', name: 'Compiler Design' },
  { code: 'CSA15', name: 'Cloud Computing and Big Data Analytics' },
  { code: 'CSA16', name: 'Data Warehouse and Data Mining' },
  { code: 'CSA17', name: 'Artificial Intelligence' },
  { code: 'CSA43', name: 'Internet Programming' },
  { code: 'CSA51', name: 'Cryptography and Network Security' },
  { code: 'DSA01', name: 'Object Oriented Programming with C++' },
  { code: 'ECA10', name: 'Microprocessors and Microcontrollers' },
  { code: 'ECA47', name: 'Principles of Digital System Design' },
  { code: 'UBA01', name: 'Engineering Mathematics - I' },
  { code: 'UBA04', name: 'Discrete Mathematics' },
  { code: 'UBA09', name: 'Probability and Statistics' },
  { code: 'UBA28', name: 'Professional Ethics and Legal Practices' },
  { code: 'UBA48', name: 'Engineering Physics' },
  { code: 'UBA49', name: 'Engineering Chemistry' },
];

function populateSubjects() {
  const subjectsList = document.getElementById('subjects-list');
  subjects.forEach(subject => {
    const select = document.createElement('select');
    select.id = subject-${subject.code};
    select.innerHTML = 
      <option value="Not Completed">Not Completed</option>
      <option value="S">S</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
      <option value="E">E</option>
      <option value="F">F</option>
    ;
    const label = document.createElement('label');
    label.htmlFor = subject-${subject.code};
    label.innerText = subject.name;
    subjectsList.appendChild(label);
    subjectsList.appendChild(select);
    subjectsList.appendChild(document.createElement('br'));
  });
}

function calculateSubjects() {
  const gradePoints = {
    'S': 10,
    'A': 9,
    'B': 8,
    'C': 7,
    'D': 6,
    'E': 5,
    'F': 0,
    'Not Completed': 0
  };
  let gradeCounts = {
    'S': 0,
    'A': 0,
    'B': 0,
    'C': 0,
    'D': 0,
    'E': 0,
    'F': 0,
    'Not Completed': 0
  };
  let totalPoints = 0;
  let completedCourses = 0;
  let failedCourses = 0;
  const remainingCourses = [];

  subjects.forEach(subject => {
    const select = document.getElementById(subject-${subject.code});
    const grade = select.value;
    if (grade === 'F') {
      failedCourses++;
    }
    if (grade === 'Not Completed') {
      remainingCourses.push(subject.name);
      gradeCounts['Not Completed']++;
    } else {
      gradeCounts[grade]++;
      totalPoints += gradePoints[grade];
      completedCourses++;
    }
  });

  const totalCourses = subjects.length;
  const pendingCourses = gradeCounts['Not Completed'];
  const cgpa = (completedCourses > 0) ? (totalPoints / completedCourses) : 0;

  document.getElementById('result').innerHTML = 
    <h2>Results:</h2>
    <p>Total No. of S Grades: ${gradeCounts['S']}</p>
    <p>Total No. of A Grades: ${gradeCounts['A']}</p>
    <p>Total No. of B Grades: ${gradeCounts['B']}</p>
    <p>Total No. of C Grades: ${gradeCounts['C']}</p>
    <p>Total No. of D Grades: ${gradeCounts['D']}</p>
    <p>Total No. of E Grades: ${gradeCounts['E']}</p>
    <p>Total No. of F Grades: ${gradeCounts['F']}</p>
    <p>Total No. of Courses Pending: ${pendingCourses}</p>
    <p>CGPA: ${cgpa.toFixed(2)}</p>
    <h3>Remaining Courses:</h3>
    <p>${remainingCourses.join('<br>')}</p>
  ;
}

function sendEmail() {
  const email = document.getElementById('email').value;
  const resultDiv = document.getElementById('result').innerHTML;

  if (!email) {
    alert("Please enter an email address");
    return;
  }

  const templateParams = {
    email: email,
    subject_results: resultDiv,
  };

  emailjs.send('service_iqwjsup', 'template_sg6p3q5', templateParams)
    .then(function(response) {
      alert('Email sent successfully');
    }, function(error) {
      alert('Failed to send email');
    });
}

function createCircles() {
  const numCircles = 30; // Adjust the number of circles
  const container = document.querySelector('.background-animations');
  for (let i = 0; i < numCircles; i++) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.width = ${Math.random() * 60 + 20}px; // Random size between 20px and 80px
    circle.style.height = circle.style.width; // Maintain aspect ratio
    circle.style.top = ${Math.random() * 100}vh; // Random vertical position
    circle.style.left = ${Math.random() * 100}vw; // Random horizontal position
    container.appendChild(circle);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  populateSubjects();
  createCircles(); // Create circles when DOM is loaded
});
