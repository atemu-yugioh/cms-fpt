import { SubjectAttributes } from "./../entities/subject.entities";
import { SubjectInstance } from "../entities/subject.entities";

export class SubjectService {
  createSubject = async (subject: SubjectAttributes) => {
    const newSubject = await SubjectInstance.create(subject);
    return newSubject.toJSON();
  };

  findById = async (id: string) => {
    const subject = await SubjectInstance.findByPk(id);
    return subject?.toJSON();
  };
}
