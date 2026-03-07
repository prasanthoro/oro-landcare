import * as v from 'valibot';

enum Status{
    draft = 'draft',
    active = 'active',
    publish = 'publish',
    inactive = 'inactive',
    archived = 'archived'
}
  
export const UpdateMapStatusSchema = v.object({
    status: v.pipe(v.enum(Status), v.nonEmpty()),
});
  