package com.tracker.demo;

import com.tracker.demo.model.Expense;
import com.tracker.demo.service.ExpenseService; // Service import panniachu
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    @Autowired
    private ExpenseService service; // Repository-ku pathila Service use panrom

    @GetMapping
    public List<Expense> getAllExpenses() {
        return service.getAll();
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return service.save(expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        service.delete(id);
    }
}