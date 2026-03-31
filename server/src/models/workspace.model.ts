import mongoose, { Schema, Document, Model } from 'mongoose';
import { Workspace } from '../types';

export interface WorkspaceDocument extends Workspace, Document {}

const WorkspaceSchema: Schema = new Schema<WorkspaceDocument>({
  name: { type: String, required: true, trim: true },
  imageUrl: { type: String, default: '' },
}, { timestamps: true });

WorkspaceSchema.virtual('id').get(function(this: WorkspaceDocument) {
  return this._id.toString();
});

WorkspaceSchema.set('toJSON', { virtuals: true });
WorkspaceSchema.set('toObject', { virtuals: true });

export const WorkspaceModel: Model<WorkspaceDocument> = mongoose.models.Workspace || mongoose.model<WorkspaceDocument>('Workspace', WorkspaceSchema);

