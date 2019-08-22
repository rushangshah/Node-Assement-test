import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
    userId: Schema.Types.ObjectId,
    description: Schema.Types.String,
    completed: Schema.Types.Boolean,
  });

const TodoModel = model('Todo', todoSchema);

export default TodoModel;