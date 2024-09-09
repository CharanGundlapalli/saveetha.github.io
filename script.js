document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("gDlQOyPV_bBBj0n6j");

    const calculateButton = document.getElementById('calculate');
    const sendReportButton = document.getElementById('sendReport');
    
    calculateButton.addEventListener('click', function () {
        const grades = [];
        const numCourses = 6;
        for (let i = 1; i <= numCourses; i++) {
            const courseGrade = document.getElementById('course' + i).value;
            if (courseGrade) {
                grades.push(courseGrade);
            }
        }

        const gradeCounts = { S: 0, A: 0, B: 0, C: 0, D: 0, F: 0 };
        grades.forEach(grade => {
            if (grade in gradeCounts) {
                gradeCounts[grade]++;
            }
        });

        const numPending = numCourses - grades.length;
        
        document.getElementById('numS').textContent = `Number of S Grades: ${gradeCounts.S}`;
        document.getElementById('numA').textContent = `Number of A Grades: ${gradeCounts.A}`;
        document.getElementById('numB').textContent = `Number of B Grades: ${gradeCounts.B}`;
        document.getElementById('numC').textContent = `Number of C Grades: ${gradeCounts.C}`;
        document.getElementById('numD').textContent = `Number of D Grades: ${gradeCounts.D}`;
        document.getElementById('numF').textContent = `Number of F Grades: ${gradeCounts.F}`;
        document.getElementById('numPending').textContent = `Number of Courses Pending: ${numPending}`;
    });

    sendReportButton.addEventListener('click', function () {
        const email = document.getElementById('email').value;
        if (!email) {
            alert("Please enter a valid email address.");
            return;
        }

        const numS = document.getElementById('numS').textContent.split(': ')[1];
        const numA = document.getElementById('numA').textContent.split(': ')[1];
        const numB = document.getElementById('numB').textContent.split(': ')[1];
        const numC = document.getElementById('numC').textContent.split(': ')[1];
        const numD = document.getElementById('numD').textContent.split(': ')[1];
        const numF = document.getElementById('numF').textContent.split(': ')[1];
        const numPending = document.getElementById('numPending').textContent.split(': ')[1];

        const templateParams = {
            email: email,
            num_s: numS,
            num_a: numA,
            num_b: numB,
            num_c: numC,
            num_d: numD,
            num_f: numF,
            num_pending: numPending
        };

        emailjs.send('service_iqwjsup', 'template_z09yrka', templateParams)
            .then(function(response) {
                alert('Email sent successfully!');
            }, function(error) {
                alert('Failed to send email. Please try again.');
            });
    });
});
