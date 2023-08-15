package com.faizal.studentsystem.controller;

import com.faizal.studentsystem.Model.Student;
import com.faizal.studentsystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public String add(@RequestBody Student student){
        studentService.saveStudent(student);
        return "New Student Added!";
    }

    @GetMapping("/getAll")
    public List<Student> getAllStudent(){
        return studentService.getAllStudents();
    }

    @GetMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Optional<UUID> id){
        if(id.isEmpty()){
            return "Invalid id provided!!";
        }else{
            studentService.deleteStudentById(id.get());
            return "Student with ID "+ id.get() +" hac been deleted!!";
        }
    }

    @PutMapping("/update/{id}")
    public String updateStudent(@PathVariable UUID id, @RequestBody Student updateStudent){
        studentService.updateStudentById(id, updateStudent);
        return "Record Updated!!";
    }
}
