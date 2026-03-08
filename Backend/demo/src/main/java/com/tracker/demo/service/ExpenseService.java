package com.tracker.demo.service;

import com.tracker.demo.model.Expense;
import com.tracker.demo.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository repository;

    public List<Expense> getAll() { return repository.findAll(); }
    public Expense save(Expense expense) { return repository.save(expense); }
    public void delete(Long id) { repository.deleteById(id); }
}