
import { DynamicDialogModel } from './DynamicDialogModel'

export class DynamicDialogOptions {
  public component!: string;
  public title!: string;
  public fontStyleTitle: string = 'headline';
  public textConfirm!: string;
  public textReject!: string;
  public componentModel!: DynamicDialogModel;
  public show: boolean = true;
}
