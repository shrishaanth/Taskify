import mongoose, { Schema, Document, Model } from 'mongoose';

export interface TaskDocument extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: string;
  priority: string;
  projectId: mongoose.Types.ObjectId;
  assigneeId: mongoose.Types.ObjectId | null;
  dueDate: Date | null;
  position: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TASK_STATUSES = ['Backlog', 'Todo', 'In Progress', 'In Review', 'Done'];
const TASK_PRIORITIES = ['Low', 'Medium', 'High'];

const TaskSchema: Schema = new Schema<TaskDocument>({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  description: { type: String, trim: true, default: '' },
  status: { type: String, enum: TASK_STATUSES, default: 'Todo' },
  priority: { type: String, enum: TASK_PRIORITIES, default: 'Medium' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: [true, 'Project ID is required'], index: true },
  assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  dueDate: { type: Date, default: null },
  position: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

TaskSchema.virtual('id').get(function(this: TaskDocument) {
  return this._id.toString();
});
TaskSchema.set('toJSON', { virtuals: true });
TaskSchema.set('toObject', { virtuals: true });

TaskSchema.index({ projectId: 1, status: 1 });
TaskSchema.index({ assigneeId: 1 });

export const TaskModel: Model<TaskDocument> = mongoose.models.Task || mongoose.model<TaskDocument>('Task', TaskSchema);
