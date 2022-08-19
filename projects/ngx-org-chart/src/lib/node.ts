export interface INode {
  name: string;
  cssClass: string | string[];
  image: string | undefined;
  title: string | null;
  childs: INode[] | undefined;
}

export class Node implements INode {
  name: string;
  cssClass: string | string[] = '';
  image: string | undefined;
  title: string | null;
  childs: Node[] | undefined;
  parent?: Node;

  constructor(structure: string[], parent?: Node) {
    this.parent = parent;
    const [name, ...reports] = structure;
    this.name = name.split('(')[0].trim();
    const titleMatch = name.match(/\(([^)]+)\)/);
    this.title = titleMatch && titleMatch[1].trim();

    this.childs = reports
      .map((r) => r.substring(1))
      .reduce((previous, current) => {
        if (!current.startsWith(' ')) {
          previous.push([]);
        }

        previous[previous.length - 1].push(current);
        return previous;
      }, [] as string[][])
      .map((r) => new Node(r, this));
  }
}
