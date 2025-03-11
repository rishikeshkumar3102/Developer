type Reminder = {
    id: string;
    title: string;
    description?: string;
    date: Date;
    completed: boolean;
};

class ReminderDatabase {
    private reminders: Map<string, Reminder> = new Map();

    createReminder(id: string, title: string, date: Date, description?: string): void {
        if (this.reminders.has(id)) {
            throw new Error('Reminder with this ID already exists');
        }
        this.reminders.set(id, { id, title, date, description, completed: false });
    }

    exists(id: string): boolean {
        return this.reminders.has(id);
    }

    markReminderAsCompleted(id: string): void {
        const reminder = this.reminders.get(id);
        if (!reminder) throw new Error("Reminder not found");
        reminder.completed = true;
    }

    unmarkReminderAsCompleted(id: string): void {
        const reminder = this.reminders.get(id);
        if (!reminder) throw new Error("Reminder not found");
        reminder.completed = false;
    }

    getAllReminders(): Reminder[] {
        return Array.from(this.reminders.values());
    }

    getReminder(id: string): Reminder | null {
        return this.reminders.get(id) || null;
    }

    getAllRemindersMarkedAsCompleted(): Reminder[] {
        return Array.from(this.reminders.values()).filter(r => r.completed);
    }

    getAllRemindersNotMarkedAsCompleted(): Reminder[] {
        return Array.from(this.reminders.values()).filter(r => !r.completed);
    }

    getAllRemindersDueByToday(): Reminder[] {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return Array.from(this.reminders.values()).filter(r => r.date <= today);
    }

    updateReminder(id: string, title?: string, date?: Date, description?: string): boolean {
        if (!this.reminders.has(id)) {
            return false;
        }
        const existingReminder = this.reminders.get(id)!;
        this.reminders.set(id, {
            ...existingReminder,
            title: title ?? existingReminder.title,
            date: date ?? existingReminder.date,
            description: description ?? existingReminder.description
        });
        return true;
    }

    removeReminder(id: string): boolean {
        return this.reminders.delete(id);
    }
}

// Example usage
const reminderDB = new ReminderDatabase();
reminderDB.createReminder("1", "Doctor Appointment", new Date("2025-03-15"), "Visit Dr. Smith at 10 AM");
console.log(reminderDB.getAllReminders());
reminderDB.markReminderAsCompleted("1");