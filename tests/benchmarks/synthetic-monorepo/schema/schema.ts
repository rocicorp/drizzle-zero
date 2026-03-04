import { pgTable, pgEnum, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["admin", "teacher", "student", "viewer"]);
export const statusEnum = pgEnum("status", ["active", "inactive", "pending", "archived"]);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: roleEnum("role").notNull().default("student"),
  status: statusEnum("status").notNull().default("active"),
  metadata: jsonb("metadata").$type<{
    preferences: { theme: "light" | "dark"; language: string };
    tags: string[];
  }>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const courses = pgTable("courses", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  instructorId: text("instructor_id").notNull(),
  published: boolean("published").notNull().default(false),
  settings: jsonb("settings").$type<{
    maxEnrollment: number;
    allowLateSubmissions: boolean;
    gradingPolicy: "points" | "percentage" | "pass_fail";
  }>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const enrollments = pgTable("enrollments", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  courseId: text("course_id").notNull(),
  enrolledAt: timestamp("enrolled_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  progress: integer("progress").notNull().default(0),
});

export const assignments = pgTable("assignments", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull(),
  title: text("title").notNull(),
  body: text("body"),
  dueAt: timestamp("due_at"),
  points: integer("points").notNull().default(100),
  rubric: jsonb("rubric").$type<{
    criteria: Array<{ name: string; weight: number; description: string }>;
  }>(),
});

export const submissions = pgTable("submissions", {
  id: text("id").primaryKey(),
  assignmentId: text("assignment_id").notNull(),
  userId: text("user_id").notNull(),
  content: text("content"),
  grade: integer("grade"),
  feedback: text("feedback"),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  gradedAt: timestamp("graded_at"),
});

export const usersRelations = relations(users, ({ many }) => ({
  enrollments: many(enrollments),
  submissions: many(submissions),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  enrollments: many(enrollments),
  assignments: many(assignments),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, { fields: [enrollments.userId], references: [users.id] }),
  course: one(courses, { fields: [enrollments.courseId], references: [courses.id] }),
}));

export const assignmentsRelations = relations(assignments, ({ one, many }) => ({
  course: one(courses, { fields: [assignments.courseId], references: [courses.id] }),
  submissions: many(submissions),
}));

export const submissionsRelations = relations(submissions, ({ one }) => ({
  assignment: one(assignments, { fields: [submissions.assignmentId], references: [assignments.id] }),
  user: one(users, { fields: [submissions.userId], references: [users.id] }),
}));
