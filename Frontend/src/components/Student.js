import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@mui/material";

export default function Student() {
  const paperStyle = { 
    padding: "50px 20px", 
    width: 600, 
    margin: "20px auto"
};
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);
  const [btnState, setBtnState] = useState("add");
  const [id, setId] = useState("");

  const updateFormRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, [students]);

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    if (btnState === "add") {
      fetch("http://localhost:8080/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      }).then(() => {
        setName("");
        setAddress("");
        console.log("New Student Added");
      });
    }else if(btnState === "update"){
        fetch(`http://localhost:8080/student/update/${id}`,{
            method : "PUT",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(student)
        }).then(() => {
            setName("");
            setAddress("");
            setBtnState("add");
            console.log("Record Updated!!");
        });
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/student/delete/${id}`, { method: "GET" }).then(
      () => {
        console.log(`Student with ID ${id} hac been deleted!!`);

        // Update the state of students list
        setStudents(students.filter((student) => student.id !== id));
      }
    );
  };

  const handleUpdate = (student) => {
    setId(student.id);
    setName(student.name);
    setAddress(student.address);
    setBtnState("update");
    if (updateFormRef.current) {
      updateFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <Container>
      <Paper elevation={3} color="red" style={paperStyle}>
        <h1 style={{ color: "#1976d2" }}>Add Student</h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
          name="addForm"
        >
          <TextField
            ref={updateFormRef}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            id="outlined-basic"
            label="Student Address"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleClick}>
            {btnState}
          </Button>
        </Box>
      </Paper>

      <h1 style={{ color: "#1976d2" }}>Students</h1>

      <Paper elevation={3} style={paperStyle}>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={student.id}
          >
            <input type="hidden" id={student.id} />
            <br />
            Name : {student.name}
            <br />
            Address : {student.address}
            <br />
            <button
              style={{ backgroundColor: "#ff6f6f", color: "white" }}
              onClick={() => handleDelete(student.id)}
            >
              Delete
            </button>
            <br />
            <button
              style={{ backgroundColor: "#1976D2", color: "white" }}
              onClick={() => handleUpdate(student)}
            >
              Update
            </button>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
