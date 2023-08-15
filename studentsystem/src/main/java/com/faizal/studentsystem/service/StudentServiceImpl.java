package com.faizal.studentsystem.service;

import com.faizal.studentsystem.Model.Student;
import com.faizal.studentsystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentRepository studentRepository;
    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public void deleteStudentById(UUID id) {
        studentRepository.deleteById(id);
    }

    @Override
    public void updateStudentById(UUID id, Student updatedStudent) {
        Optional<Student> optional = studentRepository.findById(id);

        if(optional.isEmpty()){
            return;
        }

        Student student = optional.get();

        student.setName(updatedStudent.getName());
        student.setAddress(updatedStudent.getAddress());

        studentRepository.save(student);
    }
}
