import * as I from '../typings';

const logicNodeMeta: I.NodeCategoryMeta = {
  category: '布尔逻辑',
  nodes: [
    {
      type: I.NodeType.INPUT,
      name: 'and',
      desc: '且运算，即所有的输入均为真时，输出才为真。若没有任何输入，则输出真。',
      portGroups: [
        {
          extendable: true,
          defaultPairs: 2,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.BOOLEAN, desc: '输入若干个布尔值。' },
          ]
        },
        {
          extendable: false,
          ports: [
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.BOOLEAN, desc: '输出布尔值。' },
          ]
        }
      ]
    },

    {
      type: I.NodeType.INPUT,
      name: 'or',
      desc: '或运算，即至少有一个输入为真时，输出就为真。若没有任何输入，则输出假。',
      portGroups: [
        {
          extendable: true,
          defaultPairs: 2,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.BOOLEAN, desc: '输入若干个布尔值。' },
          ]
        },
        {
          extendable: false,
          ports: [
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.BOOLEAN, desc: '输出布尔值。' },
          ]
        }
      ]
    },

    {
      type: I.NodeType.INPUT,
      name: 'not',
      desc: '非运算，即输出与输入相反。',
      portGroups: [
        {
          extendable: false,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.BOOLEAN, desc: '输入布尔值。' },
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.BOOLEAN, desc: '输出布尔值，其值与输入相反。' },
          ]
        }
      ]
    },
  ],
};

export default logicNodeMeta;