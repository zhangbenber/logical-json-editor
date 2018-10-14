import * as I from '../typings';

const mathNodeMeta: I.NodeCategoryMeta = {
  category: '数学运算',
  nodes: [
    {
      type: I.NodeType.LOGICAL,
      name: 'add',
      desc: '加法运算，对所有的输入进行求和。',
      portGroups: [
        {
          extendable: true,
          defaultPairs: 2,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.NUMBER, desc: '输入若干个数值。' },
          ]
        },
        {
          extendable: false,
          ports: [
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.NUMBER, desc: '输出总和。' },
          ]
        }
      ]
    },

    {
      type: I.NodeType.LOGICAL,
      name: 'sub',
      desc: '减法运算，求两个输入之间的差值。',
      portGroups: [
        {
          extendable: false,
          ports: [
            { name: 'a', direction: I.PortDirection.IN, type: I.PortType.NUMBER, desc: '被减数。' },
            { name: 'b', direction: I.PortDirection.IN, type: I.PortType.NUMBER, desc: '减数。' },
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.NUMBER, desc: '输出差值。' },
          ]
        }
      ]
    },

    {
      type: I.NodeType.LOGICAL,
      name: 'mul',
      desc: '乘法运算，对所有的输入进行累乘求积。',
      portGroups: [
        {
          extendable: true,
          defaultPairs: 2,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.NUMBER, desc: '输入若干个数值。' },
          ]
        },
        {
          extendable: false,
          ports: [
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.NUMBER, desc: '输出乘积。' },
          ]
        }
      ]
    },

    {
      type: I.NodeType.LOGICAL,
      name: 'div',
      desc: '除法运算，求两个输入之间的比值。',
      portGroups: [
        {
          extendable: false,
          ports: [
            { name: 'a', direction: I.PortDirection.IN, type: I.PortType.NUMBER, desc: '分子。' },
            { name: 'b', direction: I.PortDirection.IN, type: I.PortType.NUMBER, desc: '分母。' },
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.NUMBER, desc: '输出比值。' },
          ]
        }
      ]
    },

    {
      type: I.NodeType.LOGICAL,
      name: 'cmp',
      desc: '判断多个值是否满足特定的大小关系。',
      portGroups: [
        {
          extendable: true,
          defaultPairs: 2,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.NUMBER, desc: '输入若干个数值。' },
          ]
        },
        {
          extendable: false,
          ports: [
            { name: 'opt', direction: I.PortDirection.IN, type: I.PortType.STRING, desc: '比较方法。' },
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.BOOLEAN, desc: '输出布尔值，表示大小关系是否成立。' },
          ]
        }
      ]
    },

  ],
};

export default mathNodeMeta;