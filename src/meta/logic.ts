import * as I from '../typings';

const logicNodeMeta: I.NodeCategoryMeta = {
  category: '布尔逻辑',
  nodes: [
    {
      type: I.NodeType.LOGICAL,
      name: 'and',
      label: '且运算',
      desc: '所有的输入均为真时，输出才为真。若没有任何输入，则输出真。',
      portGroups: [
        {
          extendable: true,
          defaultPairs: 2,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.BOOLEAN, desc: '输入若干个布尔值' },
          ]
        },
        {
          extendable: false,
          ports: [
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.BOOLEAN, desc: '输出布尔值' },
          ]
        }
      ]
    },

    {
      type: I.NodeType.LOGICAL,
      name: 'or',
      label: '或运算',
      desc: '至少有一个输入为真时，输出就为真。若没有任何输入，则输出假。',
      portGroups: [
        {
          extendable: true,
          defaultPairs: 2,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.BOOLEAN, desc: '输入若干个布尔值' },
          ]
        },
        {
          extendable: false,
          ports: [
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.BOOLEAN, desc: '输出布尔值' },
          ]
        }
      ]
    },

    {
      type: I.NodeType.LOGICAL,
      name: 'not',
      label: '非运算',
      desc: '输出与输入相反。',
      portGroups: [
        {
          extendable: false,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.BOOLEAN, desc: '输入布尔值' },
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.BOOLEAN, desc: '输出布尔值，其值与输入相反' },
          ]
        }
      ]
    },
    
    {
      type: I.NodeType.LOGICAL,
      name: 'eq',
      label: '相等',
      desc: '判断两个或多个值是否两两相等。',
      portGroups: [
        {
          extendable: true,
          defaultPairs: 2,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.ANY, desc: '输入值' },
          ]
        },
        {
          extendable: false,
          ports: [
            { name: 'strict', direction: I.PortDirection.IN, type: I.PortType.BOOLEAN, desc: '是否严格匹配（类型与值均相同）' },
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.BOOLEAN, desc: '输出值，表示输入是否两两相等' },
          ]
        }
      ]
    },

    {
      type: I.NodeType.LOGICAL,
      name: 'if',
      label: '判断',
      desc: '输入若干个值，依次判断一系列条件是否为真，输出与第一个真值条件所对应的值。',
      portGroups: [
        {
          extendable: true,
          defaultPairs: 2,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.ANY, desc: '一系列输入值' },
            { name: 'c', direction: I.PortDirection.IN, type: I.PortType.BOOLEAN, desc: '与输入值对应的一系列布尔条件' },
          ]
        },
        {
          extendable: false,
          ports: [
            { name: 'else', direction: I.PortDirection.IN, type: I.PortType.ANY, desc: '默认值，作为所有条件均不满足时的输出' },
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.ANY, desc: '输出值' },
          ]
        }
      ]
    },
    
    {
      type: I.NodeType.LOGICAL,
      name: 'empty',
      label: '判空',
      desc: '判断输入值是否为空值（空字符串、空数组或空对象）。',
      portGroups: [
        {
          extendable: false,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.ANY, desc: '输入值' },
          ]
        },
        {
          extendable: false,
          ports: [
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.ANY, desc: '输出值，表示是否为空' },
          ]
        }
      ]
    },
    
  ],
};

export default logicNodeMeta;