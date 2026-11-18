const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

// Initial data
let registrations = [
    {
        id: 501,
        participantName: "Riya Sharma",
        eventName: "Tech Fest",
        department: "CSE",
        ticketCount: 2,
        paymentStatus: "Paid"
    },
    {
        id: 502,
        participantName: "Arjun Mehta",
        eventName: "Code Sprint",
        department: "IT",
        ticketCount: 1,
        paymentStatus: "Pending"
    },
    {
        id: 503,
        participantName: "Neha Verma",
        eventName: "Tech Fest",
        department: "ECE",
        ticketCount: 3,
        paymentStatus: "Paid"
    }
];


// 1. GET ALL REGISTRATIONS
app.get("/api/registrations", (req, res) => {
    res.status(200).json(registrations);
});


// 2. POST NEW REGISTRATION
app.post("/api/registrations", (req, res) => {

    const {
        participantName,
        eventName,
        department,
        ticketCount,
        paymentStatus
    } = req.body;

    // Validation
    if (
        !participantName ||
        !eventName ||
        !department ||
        ticketCount === undefined ||
        !paymentStatus
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (
        !Number.isInteger(ticketCount) ||
        ticketCount <= 0
    ) {
        return res.status(400).json({
            message: "ticketCount must be a positive integer"
        });
    }

    if (
        paymentStatus !== "Paid" &&
        paymentStatus !== "Pending"
    ) {
        return res.status(400).json({
            message: "paymentStatus must be Paid or Pending"
        });
    }

    const newId =
        registrations.length > 0
            ? Math.max(...registrations.map(r => r.id)) + 1
            : 501;

    const newRegistration = {
        id: newId,
        participantName,
        eventName,
        department,
        ticketCount,
        paymentStatus
    };

    registrations.push(newRegistration);

    res.status(201).json(newRegistration);
});


// 3. GET REGISTRATION BY ID
app.get("/api/registrations/:id", (req, res) => {

    const id = Number(req.params.id);

    const registration = registrations.find(
        r => r.id === id
    );

    if (!registration) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    res.status(200).json(registration);
});


// 4. PUT / UPDATE REGISTRATION
app.put("/api/registrations/:id", (req, res) => {

    const id = Number(req.params.id);

    const registration = registrations.find(
        r => r.id === id
    );

    if (!registration) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    const {
        participantName,
        eventName,
        department,
        ticketCount,
        paymentStatus
    } = req.body;

    // Validation
    if (
        !participantName ||
        !eventName ||
        !department ||
        ticketCount === undefined ||
        !paymentStatus
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (
        !Number.isInteger(ticketCount) ||
        ticketCount <= 0
    ) {
        return res.status(400).json({
            message: "ticketCount must be a positive integer"
        });
    }

    if (
        paymentStatus !== "Paid" &&
        paymentStatus !== "Pending"
    ) {
        return res.status(400).json({
            message: "paymentStatus must be Paid or Pending"
        });
    }

    registration.participantName = participantName;
    registration.eventName = eventName;
    registration.department = department;
    registration.ticketCount = ticketCount;
    registration.paymentStatus = paymentStatus;

    res.status(200).json(registration);
});


// 5. DELETE REGISTRATION
app.delete("/api/registrations/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = registrations.findIndex(
        r => r.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    registrations.splice(index, 1);

    res.status(200).json({
        message: "Registration deleted successfully"
    });
});


// 6. FILTER BY DEPARTMENT
app.get("/api/registrations/filter", (req, res) => {

    const department = req.query.department;

    const filtered = registrations.filter(
        r =>
            r.department.toLowerCase() ===
            department.toLowerCase()
    );

    res.status(200).json(filtered);
});


// 7. GET PENDING REGISTRATIONS
app.get("/api/registrations/pending", (req, res) => {

    const pending = registrations.filter(
        r => r.paymentStatus === "Pending"
    );

    res.status(200).json(pending);
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});