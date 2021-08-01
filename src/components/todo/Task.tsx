export class Task {
  status: boolean;
  name: string;
  id: number;

  constructor(status, name, id) {
    this.status = status;
    this.name = name;
    this.id = id;
  }
}
