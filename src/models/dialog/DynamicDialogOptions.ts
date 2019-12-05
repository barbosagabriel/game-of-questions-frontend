
import { ModelDynamicDialog } from './ModelDynamicDialog'

export class DynamicDialogOptions {
  public component!: string;
  public title!: string;
  public fontStyleTitle: string = 'headline';
  public textConfirm!: string;
  public textReject!: string;
  public componentModel!: ModelDynamicDialog;
  public show: boolean = true;
}
