import { drizzleZeroConfig } from "../../src";
import * as schema from "./schema";

export default drizzleZeroConfig(schema, {
  tables: {
    users: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      metadata: true,
      createdAt: true,
    },
    courses: {
      id: true,
      title: true,
      description: true,
      instructorId: true,
      published: true,
      settings: true,
      createdAt: true,
    },
    enrollments: {
      id: true,
      userId: true,
      courseId: true,
      enrolledAt: true,
      completedAt: true,
      progress: true,
    },
    assignments: {
      id: true,
      courseId: true,
      title: true,
      body: true,
      dueAt: true,
      points: true,
      rubric: true,
    },
    submissions: {
      id: true,
      assignmentId: true,
      userId: true,
      content: true,
      grade: true,
      feedback: true,
      submittedAt: true,
      gradedAt: true,
    },
  },
});
