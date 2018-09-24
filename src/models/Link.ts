import * as I from '../typings';

let lastId = 0;

export default class Link implements I.Link {
  public id = lastId++;
  public selected = false;

  constructor(
    public from: I.Port,
    public to: I.Port,
  ) { }
}