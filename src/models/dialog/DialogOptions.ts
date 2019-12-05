export class DialogOptions {
  public title: string;
  public text: string;
  public textConfirm: string;
  public textReject: string;
  public show: boolean;

  constructor (title: string,
    text: string,
    textConfirm: string,
    textReject: string,
    show: boolean = true) {
    this.title = title
    this.text = text
    this.textConfirm = textConfirm
    this.textReject = textReject
    this.show = show
  }
}
