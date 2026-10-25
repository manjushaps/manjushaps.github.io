const students = [
    { rollNo: "26CS001", name: "Student 1" },
    { rollNo: "26CS002", name: "Student 2" },
    { rollNo: "26CS003", name: "Student 3" },
    { rollNo: "26CS004", name: "Student 4" },
    { rollNo: "26CS005", name: "Student 5" }
];

let subjects = [
    { id: 1, name: "AI" },
    { id: 2, name: "DSA" }
];

let nextSubjectId = 3;

// Each student's values are stored by subject ID.
let excelMarks = {
    "26CS001": { 1: "85", 2: "78" },
    "26CS002": { 1: "92", 2: "88" },
    "26CS003": { 1: "", 2: "76" },
    "26CS004": { 1: "105", 2: "67" },
    "26CS005": { 1: "74", 2: "abc" }
};

const importedMarks = new Map();

const studentsBody = document.getElementById("students-body");
const marksHeader = document.getElementById("marks-header");
const marksBody = document.getElementById("marks-body");
const excelHeader = document.getElementById("excel-header");
const excelBody = document.getElementById("excel-body");

function renderStudents() {
    studentsBody.replaceChildren();

    students.forEach(student => {
        const row = document.createElement("tr");

        [student.rollNo, student.name].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        studentsBody.appendChild(row);
    });
}

function renderExcelSheet() {
    excelHeader.replaceChildren();
    excelBody.replaceChildren();

    const headerRow = document.createElement("tr");

    ["Roll No", "Name"].forEach(label => {
        const th = document.createElement("th");
        th.textContent = label;
        headerRow.appendChild(th);
    });

    subjects.forEach(subject => {
        const th = document.createElement("th");
        const input = document.createElement("input");

        input.type = "text";
        input.value = subject.name;
        input.setAttribute("aria-label", "Subject name");

        input.addEventListener("change", () => {
            subject.name = input.value.trim();
            renderMarksTable();
        });

        th.appendChild(input);
        headerRow.appendChild(th);
    });

    excelHeader.appendChild(headerRow);

    students.forEach(student => {
        const row = document.createElement("tr");

        [student.rollNo, student.name].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        subjects.forEach(subject => {
            const cell = document.createElement("td");
            const input = document.createElement("input");

            input.type = "text";
            input.inputMode = "decimal";
            input.value =
                excelMarks[student.rollNo]?.[subject.id] ?? "";

            input.setAttribute(
                "aria-label",
                `${student.name}, ${subject.name} marks`
            );

            input.addEventListener("input", () => {
                if (!excelMarks[student.rollNo]) {
                    excelMarks[student.rollNo] = {};
                }

                excelMarks[student.rollNo][subject.id] = input.value;
            });

            cell.appendChild(input);
            row.appendChild(cell);
        });

        excelBody.appendChild(row);
    });
}

function renderMarksTable() {
    marksHeader.replaceChildren();
    marksBody.replaceChildren();

    const headerRow = document.createElement("tr");

    ["Roll No", "Name", ...subjects.map(s => s.name)].forEach(label => {
        const th = document.createElement("th");
        th.textContent = label;
        headerRow.appendChild(th);
    });

    marksHeader.appendChild(headerRow);

    students.forEach(student => {
        const row = document.createElement("tr");

        [student.rollNo, student.name].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        subjects.forEach(subject => {
            const cell = document.createElement("td");
            const key = `${student.rollNo}|${subject.id}`;

            cell.textContent = importedMarks.has(key)
                ? importedMarks.get(key)
                : "0";

            row.appendChild(cell);
        });

        marksBody.appendChild(row);
    });
}

document.getElementById("add-subject-button")
    .addEventListener("click", () => {
        const subject = {
            id: nextSubjectId++,
            name: `Subject ${subjects.length + 1}`
        };

        subjects.push(subject);

        // New subject cells begin blank for every student.
        students.forEach(student => {
            excelMarks[student.rollNo] ??= {};
            excelMarks[student.rollNo][subject.id] = "";
        });

        renderExcelSheet();
        renderMarksTable();
    });

document.querySelectorAll(".tab-button[data-tab]")
    .forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".tab-button[data-tab]")
                .forEach(tab => {
                    tab.classList.toggle("active", tab === button);
                });

            const showStudents = button.dataset.tab === "students";

            document.getElementById("sheet-heading").textContent =
                showStudents ? "Students Sheet" : "Marks Sheet";

            document.getElementById("students-sheet")
                .classList.toggle("hidden", !showStudents);

            document.getElementById("marks-sheet")
                .classList.toggle("hidden", showStudents);

            document.querySelector(".excel-import-section")
                .classList.toggle("hidden", showStudents);
            
            document.querySelector(".demo-note")
                .classList.toggle("hidden", !showStudents);           
        });
    });

const resultModal = document.getElementById("result-modal");
const statusMessage = document.getElementById("status-message");

let pendingMarks = new Map();

function importExcelMarks() {
    pendingMarks = new Map();

    const counts = {
        total: students.length,
        valid: 0,
        invalid: 0,
        missing: 0,
        format: 0,
        notFound: 0,
        mismatch: 0,
        subjectsNotFound: 0
    };

    const detailsBody = document.getElementById("import-details-body");
    detailsBody.replaceChildren();

    students.forEach(student => {
        const studentResults = [];
        let studentIssues = 0;

        // Validate every subject for this student.
        subjects.forEach(subject => {
            const rawValue =
                excelMarks[student.rollNo]?.[subject.id] ?? "";
            const value = String(rawValue).trim();

            let status;
            let issue = "";
            let mark = null;

            if (!subject.name.trim()) {
                counts.subjectsNotFound++;
                studentIssues++;
                status = "Missing subject";
                issue = "Enter a subject name.";
            } else if (value === "") {
                counts.missing++;
                studentIssues++;
                status = "Missing";
                issue = "No mark was entered.";
            } else if (!Number.isFinite(Number(value))) {
                counts.format++;
                studentIssues++;
                status = "Invalid format";
                issue = "Enter a numeric mark.";
            } else {
                mark = Number(value);

                if (mark < 0 || mark > 100) {
                    counts.invalid++;
                    studentIssues++;
                    status = "Invalid marks";
                    issue = "Marks must be between 0 and 100.";
                } else {
                    counts.valid++;
                    status = "Valid";

                    pendingMarks.set(
                        `${student.rollNo}|${subject.id}`,
                        mark
                    );
                }
            }

            studentResults.push({
                subject: subject.name || "(Unnamed subject)",
                value,
                mark,
                status,
                issue
            });
        });

        // One main row per student, with an arrow for every student.
        const mainRow = document.createElement("tr");

        const arrowCell = document.createElement("td");
        const arrowButton = document.createElement("button");

        arrowButton.type = "button";
        arrowButton.className = "expand-button";
        arrowButton.textContent = "▸";
        arrowButton.setAttribute(
            "aria-label",
            `Show subject details for ${student.rollNo}`
        );
        arrowCell.appendChild(arrowButton);
        mainRow.appendChild(arrowCell);

        [student.rollNo, student.name, "", "",
        studentIssues === 0 ? "Valid" : `${studentIssues} issue(s)`
        ].forEach((value, index) => {
            const cell = document.createElement("td");
            cell.textContent = value;

            if (index === 4) {
                cell.className = studentIssues === 0
                    ? "status-valid"
                    : "status-issue";
            }

            mainRow.appendChild(cell);
        });

        detailsBody.appendChild(mainRow);

        // Subject details are hidden until the student's arrow is clicked.
        const detailRows = [];

        studentResults.forEach(result => {
            const detailRow = document.createElement("tr");
            detailRow.className = "issue-details hidden";

            // Keep the details aligned under Subject, Marks and Status.
            ["", "", result.subject, result.value, result.status].forEach(
                (value, index) => {
                    const cell = document.createElement("td");
                    cell.textContent = value;

                    if (index === 4) {
                        cell.className = result.status === "Valid"
                            ? "status-valid"
                            : "status-issue";
                    }

                    detailRow.appendChild(cell);
                }
            );

            detailsBody.appendChild(detailRow);
            detailRows.push(detailRow);
        });

        arrowButton.addEventListener("click", () => {
            const shouldExpand = detailRows.length > 0 &&
                detailRows[0].classList.contains("hidden");

            detailRows.forEach(row => {
                row.classList.toggle("hidden", !shouldExpand);
            });

            arrowButton.textContent = shouldExpand ? "▾" : "▸";
        });
    });

    const countIds = {
        total: "count-total",
        valid: "count-valid",
        invalid: "count-invalid",
        missing: "count-missing",
        format: "count-format",
        notFound: "count-not-found",
        mismatch: "count-mismatch",
        subjectsNotFound: "count-subjects-not-found"
    };

    Object.entries(countIds).forEach(([key, id]) => {
        document.getElementById(id).textContent = counts[key];
    });

    resultModal.classList.remove("hidden");
}

// Open the review popup; do not import into the Marks table yet.
document.getElementById("import-button")
    .addEventListener("click", importExcelMarks);


/* Save valid marks only after confirmation. */
document.getElementById("confirm-import")
    .addEventListener("click", () => {
        const validCount = pendingMarks.size;

        importedMarks.clear();

        pendingMarks.forEach((mark, key) => {
            importedMarks.set(key, mark);
        });

        renderMarksTable();
        resultModal.classList.add("hidden");

        document.querySelector('.tab-button[data-tab="marks"]').click();

        statusMessage.textContent =
            `Import completed: ${validCount} valid mark(s) imported. Missing and invalid marks remain 0.`;

        // Remove any previous timer before starting a new one.
        clearTimeout(window.importStatusTimer);

        window.importStatusTimer = setTimeout(() => {
            statusMessage.textContent = "";
        }, 5000);
    });


// Cancel closes the popup without importing the pending marks.
document.getElementById("cancel-import")
    .addEventListener("click", () => {
        pendingMarks.clear();
        resultModal.classList.add("hidden");
    });



renderStudents();
renderExcelSheet();
renderMarksTable();
