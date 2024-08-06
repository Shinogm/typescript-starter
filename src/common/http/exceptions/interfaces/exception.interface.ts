import { ResponseAction } from '../../responses/action.response';
import { ResponseType } from '../../responses/type.response';

export interface IException {
  /**
   * Error type
   */
  type: ResponseType;

  /**
   * Service action
   */
  action: ResponseAction;

  /**
   * Error code
   */
  code: string;

  /**
   * Error message
   */
  message: string;

  /**
   * Error details
   */
  diagnosticInformation?: string;

  /**
   * Errored parameters
   */
  parameters?: IParameter[];
}

export interface IParameter {
  key: string;
  message: string;
}
