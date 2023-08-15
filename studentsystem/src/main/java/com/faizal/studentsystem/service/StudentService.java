package com.faizal.studentsystem.service;

import com.faizal.studentsystem.Model.Student;

import java.util.List;
import java.util.UUID;

public interface StudentService {

    public Student saveStudent(Student student);
    public List<Student> getAllStudents();

    public void deleteStudentById(UUID id);

    public void updateStudentById(UUID id, Student updatedStudent);
}
