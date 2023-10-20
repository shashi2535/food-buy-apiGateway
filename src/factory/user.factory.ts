import { injectable } from 'tsyringe';

@injectable()
export class UserFactory {
  public checkHealth = `
    {
      checkHealth {
        message
        status
      }
    }
  `;
}
