import * as React from 'react';
import * as I from '../typings';

export class Graph extends React.Component<{
  graph: I.Graph,
  className: any,
}> {
  public render() {
    return (
      <div>
        <svg>
          <g></g>
        </svg>
      </div>
    );
  }
}