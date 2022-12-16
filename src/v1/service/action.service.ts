import { ActionAttributes, ActionInstance } from "../entities/action.entities";

export class ActionService {
  createAction = async (action: ActionAttributes) => {
    const newAction = await ActionInstance.create(action);
    return newAction.toJSON();
  };

  findById = async (id: string) => {
    const action = await ActionInstance.findByPk(id);
    return action?.toJSON();
  };
}
