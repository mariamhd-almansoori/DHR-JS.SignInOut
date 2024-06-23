function showForm(formType) {
    document.getElementById('selection').classList.add('hidden');
    if (formType === 'attendance') {
        document.getElementById('attendanceForm').classList.remove('hidden');
    } else if (formType === 'departure') {
        document.getElementById('departureForm').classList.remove('hidden');
    }
}

function showPrograms(qualification) {
    const programs = {
        'less_than_high_school': ['برنامج ر', 'برنامج ت', 'برنامج ع'],
        'high_school': ['برنامج د', 'برنامج م', 'برنامج و', 'برنامج ر', 'برنامج ت', 'برنامج ع'],
        'certificate_of_completion': ['برنامج ر', 'برنامج ت', 'برنامج ع'],
        'diploma': ['برنامج أ', 'برنامج ب', 'برنامج ج', 'برنامج ر', 'برنامج ت', 'برنامج ع'],
        'bachelor': ['برنامج أ', 'برنامج ب', 'برنامج ج', 'برنامج ر', 'برنامج ت', 'برنامج ع'],
        'master': ['برنامج أ', 'برنامج ب', 'برنامج ج', 'برنامج ر', 'برنامج ت', 'برنامج ع']
    };

    const programSelect = document.getElementById('program');
    programSelect.innerHTML = ''; // Clear previous options

    if (qualification in programs) {
        programs[qualification].forEach(program => {
            const option = document.createElement('option');
            option.value = program;
            option.textContent = program;
            programSelect.appendChild(option);
        });
        document.getElementById('programs').classList.remove('hidden');
    } else {
        document.getElementById('programs').classList.add('hidden');
    }
}

function submitForm(type) {
    const form = type === 'attendance' ? document.getElementById('attendanceForm') : document.getElementById('departureForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data.type = type;

    fetch('https://script.google.com/macros/s/AKfycbxhGUgfkGs_d65xd9wKFcyclwbFeQe8kr562rgqCHMlVYO5TynADBvz6Vuh1f0O0IS1/exec', {  // استبدل 'your-web-app-url' بالرابط الذي حصلت عليه من نشر Google Apps Script
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(response => {
        alert('تم التسجيل بنجاح');
        form.reset();
        // إعادة إظهار الاختيارات وإخفاء النموذج
        document.getElementById('selection').classList.remove('hidden');
        form.classList.add('hidden');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('حدث خطأ أثناء التسجيل');
    });
}
